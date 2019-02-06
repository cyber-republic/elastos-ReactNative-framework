//
//  Util.m
//  ELASTOS_RN_FRAMEWORK
//
//  Created by jacky.li on 2018/9/19.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "Util.h"
#import <CommonCrypto/CommonHMAC.h>
#import<CommonCrypto/CommonDigest.h>

@implementation Util

+ (NSString *)SHA256WithString:(NSString *)srcString
{
  const char *cstr = [srcString cStringUsingEncoding:NSUTF8StringEncoding];
  
  NSData *data = [NSData dataWithBytes:cstr length:srcString.length];
  
  CC_SHA256_CTX sha256;
  CC_SHA256_Init(&sha256);
  
  CC_SHA256_Update(&sha256, [data bytes], [data length]);
  
  unsigned char digest[CC_SHA256_DIGEST_LENGTH];
  CC_SHA256_Final(digest, &sha256);
  
  NSMutableString * result = [NSMutableString stringWithCapacity:CC_SHA256_DIGEST_LENGTH * 2];
  
  for ( int i = 0 ; i < CC_SHA256_DIGEST_LENGTH ; i++)
  {
    [result appendFormat : @"%02x" , digest[i]];
  }
  return result;
}

+ (NSString *)SHA256WithData:(NSData *)data
{
  CC_SHA256_CTX sha256;
  CC_SHA256_Init(&sha256);
  
  CC_SHA256_Update(&sha256, [data bytes], [data length]);
  
  unsigned char digest[CC_SHA256_DIGEST_LENGTH];
  CC_SHA256_Final(digest, &sha256);
  
  NSMutableString * result = [NSMutableString stringWithCapacity:CC_SHA256_DIGEST_LENGTH * 2];
  
  for ( int i = 0 ; i < CC_SHA256_DIGEST_LENGTH ; i++)
  {
    [result appendFormat : @"%02x" , digest[i]];
  }
  return result;
}

+(void) saveData: (NSString *)key withData:(NSDictionary *) data{
  NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
  [defaults setObject:data forKey:key];
  [defaults synchronize];
}
+(NSDictionary *) getData: (NSString *)key{
  NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
  NSDictionary *rs = [defaults objectForKey:key];
  return rs;
}

@end
