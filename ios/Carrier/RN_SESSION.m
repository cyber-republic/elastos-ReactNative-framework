//
//  RN_SESSION.m
//  ELASTOS_RN_FRAMEWORK
//
//  Created by jacky.li on 2018/11/28.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "RN_SESSION.h"
#import <ElastosCarrier/ElastosCarrier.h>
#import <React/RCTLog.h>

#import "Carrier.h"
#import "FriendSessionStream.h"



@implementation RN_SESSION

- (instancetype)init{
  if(self = [super init]){
    //初始化
  }
  return self;
}
-(instancetype) initWithCarrier: (Carrier *) carrier{
  if(self = [super init]){
    [self setCarrier:carrier];
    [self setElaCarrier: [carrier getIntance]];
    
    NSError *error = nil;
    ELACarrierSessionManager *m = [ELACarrierSessionManager getInstance:self.elaCarrier usingHandler:
      ^(ELACarrier *_carrier, NSString *friendId, NSString *sdp){
//        RCTLog(@"[ onSessionRequest ] => %@, %@", friendId, sdp);
        
        FriendSessionStream *fss = [self getFriendSessionByFriendId:friendId];
        [fss setSdp:sdp];
      
        NSDictionary *param = @{
                                @"type" : @"onSessionRequest",
                                @"data" : @{
                                    @"sdp" : sdp,
                                    @"friendId" : friendId
                                }
                              };
        self.carrier.callback(self.elaCarrier, param);
      
    } error: &error];
    
    [self setElaSessionManager:m];
  }
  return self;
}

-(int) start: (NSString *)friendId
   streamType: (int)streamType
   streamMode: (int)streamMode
{
//  RCTLog(@"[ RN_SESSION.start ] => %@", friendId);
  
  FriendSessionStream *fss = [self addStreamByType:friendId streamType:streamType streamMode:streamMode];
  
  return fss.streamId;
}

-(FriendSessionStream *) addStreamByType: (NSString *)friendId
             streamType: (int)streamType
             streamMode: (int)streamMode
{
  FriendSessionStream *fss = [self getFriendSessionByFriendId:friendId];
  ELACarrierSession *session = fss.session;
  
  NSError *error = nil;
  ELACarrierStream *stream = [session addStreamWithType:(ELACarrierStreamType)streamType
                                                options:(ELACarrierStreamOptions)streamMode
                                               delegate:(id)self
                                                  error:&error];
  
  [fss setStream:stream];
  
  return fss;
}

-(FriendSessionStream *) getFriendSessionByFriendId: (NSString *)friendId
{
  FriendSessionStream *fss = [FriendSessionStream getInstanceByFriendId:friendId];
  if(!fss){
    fss = [[FriendSessionStream alloc] initWithFriendId:friendId];
    NSError *error = nil;
    ELACarrierSession *session = [self.elaSessionManager newSessionTo:friendId error:&error];
    [fss setSession:session];
    
    [FriendSessionStream putByFriendId:friendId data:fss];
  }
  return fss;
}

-(id) sessionRequest: (NSString *)friendId
{
  FriendSessionStream *fss = [FriendSessionStream getInstanceByFriendId:friendId];
  ELACarrierSession *_session = fss.session;
  
  NSError *error = nil;
  [_session sendInviteRequestWithResponseHandler:
   ^(ELACarrierSession *session, NSInteger status, NSString *reason, NSString *sdp) {
     RCTLog(@"Invite request response, stream state: %zd", status);
     
     if(status == 0){
       NSError *error = nil;
       if(![session startWithRemoteSdp:sdp error:&error]){
         RCTLog(@"Start session error: %@", error);
       }
     }
     else {
       RCTLog(@"Remote refused session invite: %d, sdp: %@", (int)status, reason);
     }
   } error:&error];
  
  return error;
}

-(id) sessionReplyRequest: (NSString *)friendId
                     status:(int)status
                     reason:(NSString *)reason
{
  FriendSessionStream *fss = [FriendSessionStream getInstanceByFriendId:friendId];
  NSError *error = nil;
  [fss.session replyInviteRequestWithStatus:(NSInteger)status reason:reason error:&error];
  
  [fss.session startWithRemoteSdp:fss.sdp error:&error];
  
  return error;
}

-(id) writeToStream: (ELACarrierStream *)stream
               data:(NSString *)data
{
  NSError *error = nil;
  NSNumber *rs = [stream writeData:[data dataUsingEncoding:NSUTF8StringEncoding] error:&error];
  if(error)
    return error;
  
  return rs;
}


#pragma mark - ELACarrierStreamDelegate
-(void) carrierStream:(ELACarrierStream *)stream
       stateDidChange:(enum ELACarrierStreamState)newState
{
  RCTLog(@"Stream state: %d", (int)newState);
  
  FriendSessionStream *fss = [FriendSessionStream getInstanceByStream:stream];
  [fss setState:newState];
  NSDictionary *param = @{
                          @"type" : @"onStateChanged",
                          @"data" : @{
                              @"state" : [NSNumber numberWithInt:newState],
                              @"friendId" : fss.id,
                              @"streamId" : [NSNumber numberWithInt:fss.streamId]
                              }
                          };
  self.carrier.callback(self.elaCarrier, param);
  
//  switch (newState) {
//    case ELACarrierStreamStateInitialized:
//
//      break;
//
//    case ELACarrierStreamStateConnected:
//
//      break;
//
//    case ELACarrierStreamStateDeactivated:
//    case ELACarrierStreamStateClosed:
//    case ELACarrierStreamStateError:
//
//      break;
//
//    default:
//      break;
//  }
}

@end


