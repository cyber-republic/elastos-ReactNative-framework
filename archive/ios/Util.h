//
//  Util.h
//  ELASTOS_RN_FRAMEWORK
//
//  Created by jacky.li on 2018/9/19.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface Util : NSObject

+ (NSString *)SHA256WithData:(NSData *)data;
+ (NSString *)SHA256WithString:(NSString *)srcString;

+(void) saveData: (NSString *)key withData:(NSDictionary *) data;
+(NSDictionary *) getData: (NSString *)key;

@end
