#if __has_include(<React/RCTBridgeModule.h>)
#import <React/RCTBridgeModule.h>
#else
#import "RCTBridgeModule.h"
#endif
#import <Foundation/Foundation.h>

@interface RNElastosMainchain : NSObject <RCTBridgeModule>
+ (NSString *)getRootPath;
+ (void)copyFileFromPath:(NSString *)sourcePath toPath:(NSString *)toPath;

@end
