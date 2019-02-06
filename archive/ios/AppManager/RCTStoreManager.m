//
//  RCTStoreManager.m
//  ELASTOS_RN_FRAMEWORK
//
//  Created by jacky.li on 2018/9/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "RCTStoreManager.h"
#import "Util.h"

@interface RCTStoreManager () {
  NSString *  _rootPath;
  
}
@end



@implementation RCTStoreManager

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

RCT_EXPORT_MODULE();

- (id)init {
  self = [super init];
  if (self) {
    // get the root path of the Document Directory
    // NSCacheDirectory is also good to use
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
    _rootPath = [paths objectAtIndex:0];

  }
  return self;
}



#pragma mark - storing management methods

// store a data into a file in a specific sub directory
//RCT_EXPORT_METHOD(storeData:(id)content intoFile:(NSString *)filename inDirectory:(NSString *)directory callback:(RCTResponseSenderBlock)callback) {
//
//  BOOL result = [self storeDataIntoLocalFilesystem:content intoFile:filename inDirectory:directory];
//  callback(@[@(result)]);
//}




// store a data into a file in a specific sub directory
- (BOOL)storeDataIntoLocalFilesystem:(id)content intoFile:(NSString *)filename inDirectory:(NSString *)directory {
  
  
  NSString *fullPath = [_rootPath stringByAppendingPathComponent:directory];
  
  if (![[NSFileManager defaultManager] fileExistsAtPath:fullPath])
    [[NSFileManager defaultManager] createDirectoryAtPath:fullPath withIntermediateDirectories:YES attributes:nil error:nil];
  
  fullPath = [self getFullPath:directory storedFilename:filename];
  
//  BOOL result = [NSKeyedArchiver archiveRootObject:content toFile:fullPath];
  
//  NSString *rs = [[NSString alloc] initWithData:content encoding:NSUTF8StringEncoding];
  
  
  BOOL result = [ content writeToFile:fullPath atomically:YES];
  
  if (result)
    NSLog(@"Successfully saved %@", fullPath);
  else
    NSLog(@"ERROR: can't save %@", fullPath);
  
  
  return result;
  
}



- (NSMutableArray*) retrieveFilesFromDir:(NSString *)directory {
  
  
  
  NSString *fullPath = [_rootPath stringByAppendingPathComponent:directory];
  NSURL *url = [NSURL URLWithString:fullPath];
  
  NSFileManager *fm = [[NSFileManager alloc] init];
  NSDirectoryEnumerator *dirEnumerator = [fm enumeratorAtURL:url
                                  includingPropertiesForKeys:@[ NSURLNameKey, NSURLIsDirectoryKey ]
                                                     options:NSDirectoryEnumerationSkipsHiddenFiles | NSDirectoryEnumerationSkipsSubdirectoryDescendants
                                                errorHandler:nil];
  
  NSMutableArray *fileList = [NSMutableArray array];
  
  for (NSURL *theURL in dirEnumerator) {
    NSNumber *isDirectory;
    [theURL getResourceValue:&isDirectory forKey:NSURLIsDirectoryKey error:NULL];
    if (![isDirectory boolValue]) {
      [fileList addObject: [ theURL absoluteString ]];
    }
  }
  
  
  return fileList;
}


- (NSString*) getFullPath:(NSString *)directory storedFilename:(NSString *)filename {
  
  NSString *fullPath = [ [_rootPath stringByAppendingPathComponent:directory] stringByAppendingString: [@"/" stringByAppendingString:filename] ];
  
  return fullPath;
}






// remove a file in a specific sub directory
- (BOOL)removeFile:(NSString *)filename inDirectory:(NSString *)directory {
  
  
  NSString *fullPath = [_rootPath stringByAppendingPathComponent:directory];
  
  if (![[NSFileManager defaultManager] fileExistsAtPath:fullPath]) {
    return NO;
  }
  
  fullPath = [fullPath stringByAppendingPathComponent:filename];
  
  NSError *error = [NSError new];
  
  if ([[NSFileManager defaultManager] removeItemAtPath:fullPath error:&error]){
    NSLog(@"Successfully removed %@", fullPath);
    return YES;
    
  }else{
    NSLog(@"ERROR: can't remove %@ : %@",fullPath, [error localizedDescription]);
    return NO;
  }
  
  return NO;
}

// get the data stored into a file
- (id)loadObjectFromFile:(NSString *)filename inDirectory:(NSString *)directory {
  
  NSString *fullPath = [_rootPath stringByAppendingPathComponent:directory];
  if (![[NSFileManager defaultManager] fileExistsAtPath:fullPath])
    return nil;
  
  fullPath = [self getFullPath:directory storedFilename:filename];
  return [NSKeyedUnarchiver unarchiveObjectWithFile:fullPath];
}


@end
