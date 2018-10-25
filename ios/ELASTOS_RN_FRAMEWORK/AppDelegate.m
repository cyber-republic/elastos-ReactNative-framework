/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <React/RCTLog.h>

#import <JavaScriptCore/JavaScriptCore.h>


@implementation AppDelegate


RCTRootView *rootView;
NSDictionary *_launchOptions;

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  _launchOptions = launchOptions;
  
  [self loadMainView];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  return YES;
}

-(void) loadMainView{
  NSURL *jsCodeLocation;
  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
  
  
  rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                         moduleName:@"ELASTOS_RN_FRAMEWORK"
                                  initialProperties:nil
                                      launchOptions:_launchOptions];
  
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
}


-(void) reloadByUrl: (NSString *) url {
  NSURL *jsCodeLocation;
  jsCodeLocation = [NSURL URLWithString: url];
//  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"example" fallbackResource:nil];
  RCTRootView* view = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                         moduleName:@"ELASTOS_RN_FRAMEWORK"
                                  initialProperties:nil
                                      launchOptions:_launchOptions];
  
  UIButton *button = [[UIButton alloc]init];
  [button setTitle:@"close" forState:UIControlStateNormal];
  [button setTitleColor:[UIColor blackColor] forState:UIControlStateNormal];
  [button setBackgroundColor:[UIColor yellowColor]];

  button.frame = CGRectMake(self.window.bounds.size.width-120, 60, 60, 24);
  [button addTarget:self action:@selector(backToMain) forControlEvents:UIControlEventTouchUpInside];
  [view addSubview:button];
  

  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = view;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];

}

-(void) backToMain{
  [self loadMainView];
  
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
}



@end
