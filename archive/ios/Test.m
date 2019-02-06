//
//  Test.m
//  JSCoreTest
//
//  Created by jacky.li on 2018/8/14.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "Test.h"
#import "AppDelegate.h"

@implementation Test

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD (load:(NSString *)url ) {
  AppDelegate *app = (AppDelegate *)[[UIApplication  sharedApplication] delegate];
  [app reloadByUrl:url];
  
}

RCT_EXPORT_METHOD (back) {
  AppDelegate *app = (AppDelegate *)[[UIApplication  sharedApplication] delegate];
  [app backToMain];
}

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

@end
