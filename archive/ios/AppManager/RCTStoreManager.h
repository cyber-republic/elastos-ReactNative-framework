//
//  RCTStoreManager.h
//  ELASTOS_RN_FRAMEWORK
//
//  Created by jacky.li on 2018/9/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import <React/RCTBridge.h>

@interface RCTStoreManager : NSObject <RCTBridgeModule>

- (BOOL)storeDataIntoLocalFilesystem:(id)content intoFile:(NSString *)filename inDirectory:(NSString *)directory;

- (NSMutableArray*) retrieveFilesFromDir:(NSString *)directory;

- (NSString*) getFullPath:(NSString *)directory storedFilename:(NSString *)filename;

- (BOOL)removeFile:(NSString *)filename inDirectory:(NSString *)directory;


@end
