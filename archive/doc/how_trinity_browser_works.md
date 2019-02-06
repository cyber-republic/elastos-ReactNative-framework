## Current architecture of Trinity:
- Trinity IS the elastos virtual machine. Trinity’s apps run inside this elastos virtual machine. Trinity is mostly for web apps
- Trinity apps written using ionic framework. This way, the same dapp can run on android, ios, windows, linux, etc. The only thing is we need to develop trinity app for ios, windows, linux, etc
- The executable javascript code of DApp in Trinity runs in the sandbox process. They cannot access the system API. They run in the V8 virtual machine. They can only access the local device and the carrier running in the elastos runtime process through the cordova process for network access
- The wallet, carrier and DID are all CAR interfaces: a JS object in trinity. Some work in V8. If we want to expose more services, we have to write a corresponding CAR components such as token sidechain.
- The V8 engine was modified for Trinity. When you build a .car file, the lube tools generate metadata for the car component and metadata will be packaged in the .so file and we’re basically calling functions from this .so file from within javascript.
- The current solution is to replace the cordova browser and modify the V8 engine. The team is trying to complete reflection through the use of plugins without modifying the browser.

## Current architecture of building native apps in android/ios:
- Have to use C++ SDK for native apps
- Native apps can use elastos runtime modules but there’s no safe running environment as we have in trinity for obvious reasons. In other words, no elastos virtual machine
- Can use C++ SDK in swift, golang, python, etc. There’s a way to call C++ in golang, python so we would have to resort to that for now until we actually convert the C++ SDK into golang SDK or python SDK. If we do this, we’ll need to be continuously updating all the SDKs in parallel. More overhead but can be done
- JAR package of the C++ SDK will be provided for java developers for native android apps so it’s easier to write native mobile apps for android devices. Can use C++ SDK for ios devices

## Some notes on how CAR works in Trinity
- Write a CAR file that describes the specifications and save it as .car file. This file will have interfaces and classes definition and any other specification that can be called via the SDK
- “emake helloworld.car java” to generate appropriate C++ files along with appropriate java code. Doing this lets us write CAR implementations in Java language. This means we don’t have to write the implementation in C/C++ code. This is specially handy when providing support for RPC calls. Because RPC has to be called via C++ but the code can be executed in a java environment as well.
- Write implementations defined in CAR file in corresponding C/C++ files
- Make more updates to the java interfaces that is required
- Now, what we can do is call on a Java interface from java class. Using reflection, the appropriate C++ method is called from a Java program. This is how interoperability between different programming languages and C++ can happen. CAR acts as the bridge that contains all the metadata required and automatically generates native code on the fly
- The CAR components need to be implemented in C++ as CAR is a C++ development framework
- Javascript interfaces work the same way. Or any other programming language we may decide to use in the future
- Currently, most recent release of RT is available for android_arm_32, android_arm_64, mac_arm_64, mac_x86_64 and linux_86_64. This means that all the available CAR interfaces that are available like hellocardemo, DID, wallet, carrier can only be called in these platforms
- If we’re to use wallet, did, carrier in an android native app, we would have to use the release for android: Example of these files are libElastos.HelloCarDemo.so, libElastos.DID.so, libelacarrier.so. This is also how we’re able to call RPC interfaces using program specific interfaces that are available
- If we’re to make this available for react native framework, we need to make sure to write the plugins to talk to both android and ios platforms
- The developer document for “How to call CAR from javascript” is not yet complete(Even in chinese so it’s hard to come up with a thorough process for react native framework)
- The chinese team is also trying to currently complete the reflection through plugins without modifying the browser. Currently, the reflection is done by modifying the V8 engine 
