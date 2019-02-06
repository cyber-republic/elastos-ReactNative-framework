//
//  RCTAssetManager.m
//  ELASTOS_RN_FRAMEWORK
//
//  Created by jacky.li on 2018/9/15.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "RCTAssetManager.h"
#import "AFURLSessionManager.h"
#import "AFHTTPRequestOperation.h"
#import "RCTStoreManager.h"
#import "Util.h"

@implementation RCTAssetManager

RCT_EXPORT_MODULE();
RCT_EXPORT_METHOD(downloadResourceFromUrl:(NSString *)name andUrl:(NSURL *)url andStoreInto:(NSString *) cacheDirectory
                  onSuccesfull:(RCTResponseSenderBlock)successCallback onFailure:(RCTResponseSenderBlock)errorCallback)
{
  
  NSURLRequest *request = [NSURLRequest requestWithURL:url];
  
  AFHTTPRequestOperation *op = [[AFHTTPRequestOperation alloc] initWithRequest:request];
  op.responseSerializer = [AFHTTPResponseSerializer serializer];

  
//  [op setDownloadProgressBlock:^(NSUInteger bytesRead, long long totalBytesRead, long long totalBytesExpectedToRead) {
//    NSLog(@"is download: %f, %f, %f", (float)totalBytesRead, (float)totalBytesExpectedToRead, (float)totalBytesRead/totalBytesExpectedToRead);
//  }];
  
  //On Succesfull
  [ op setCompletionBlockWithSuccess:^(AFHTTPRequestOperation *operation, id responseObject) {
    
    
    RCTStoreManager* storeManager = [ [RCTStoreManager alloc] init];
    NSString *stringURL = [ url absoluteString];
    NSString *fileName = [ stringURL lastPathComponent ];
    
    BOOL isStored = [ storeManager storeDataIntoLocalFilesystem:responseObject intoFile:fileName inDirectory:cacheDirectory ];
    NSString *fullPath = [storeManager getFullPath:cacheDirectory storedFilename:fileName];
    NSString *hash = [Util SHA256WithData:responseObject];
    NSDictionary *dic = @{
                          @"path" : fullPath,
                          @"hash" : hash,
                          @"name" : name,
                          @"version" : @"1.0.0"
                          };
    [Util saveData:fileName withData:dic];
    
    successCallback(@[dic]);
    
    // On Failure
  } failure:^(AFHTTPRequestOperation *operation, NSError *error) {
    errorCallback(@[[error localizedDescription]]);
  }];
  
//  [[NSOperationQueue mainQueue] addOperation:op];
  [op start];
  
}


RCT_EXPORT_METHOD(listResourcesInCache:(NSString *) cacheDirectory
                  onSuccesfull:(RCTResponseSenderBlock)successCallback onFailure:(RCTResponseSenderBlock)errorCallback)
{
  
  RCTStoreManager* manager = [ [RCTStoreManager alloc] init];
  NSMutableArray* filenames = [ manager retrieveFilesFromDir:cacheDirectory ];
  
  NSMutableArray *rs = [[NSMutableArray alloc] init];
  
  long count = filenames.count;
  for( int i=0; i<count; i++){
    NSString *url = [filenames objectAtIndex:i];
    NSString *name = [url lastPathComponent];
    
    
    NSDictionary *dic = [Util getData:name];
    NSMutableDictionary *dic_cp = [NSMutableDictionary dictionary];
    [dic_cp setDictionary:dic];
    
    [rs addObject:dic_cp];
  }

  successCallback(@[rs]);
}


RCT_EXPORT_METHOD(deleteResourceInCache:(NSString *) resourceFilename cacheDirectory: (NSString *) directory
                  onSuccesfull:(RCTResponseSenderBlock)successCallback )
{
  
  RCTStoreManager* manager = [ [RCTStoreManager alloc] init];
  BOOL deleted =[ manager removeFile:resourceFilename inDirectory:directory];
  
  successCallback(@[@(deleted)]);
  
  
}

@end
