//
//  RN_SESSION.h
//  ELASTOS_RN_FRAMEWORK
//
//  Created by jacky.li on 2018/11/28.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <ElastosCarrier/ElastosCarrier.h>

#import "Carrier.h"

NS_ASSUME_NONNULL_BEGIN

@interface RN_SESSION : NSObject <ELACarrierStreamDelegate>

@property(assign) Carrier *carrier;
@property(assign) ELACarrier *elaCarrier;
@property(assign) ELACarrierSessionManager *elaSessionManager;


-(instancetype) initWithCarrier: (Carrier *) carrier;
-(int) start: (NSString *)friendId
                 streamType: (int)streamType
                 streamMode: (int)streamMode;
-(id) sessionRequest: (NSString *)friendId;
-(id) sessionReplyRequest: (NSString *)friendId
                     status:(int)status
                     reason:(NSString *)reason;
-(id) writeToStream: (ELACarrierStream *)stream
               data:(NSString *)data;

@end

NS_ASSUME_NONNULL_END
