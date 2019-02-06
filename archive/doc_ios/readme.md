## Change native code to disable HTTP
* override Libraries/React.xcodeproj/CxxBridge/RCTCxxBridge.mm with ./RCTCxxBridge.mm
* could add custom JS function under **initMyTest** method.
* override Libraries/ReactNetworking.xcodeproj/RCTNetworking.h with ./RCTNetworking.h
* override Libraries/ReactNetworking.xcodeproj/RCTNetworking.mm with ./RCTNetworking.mm
* force method **returnErrorData**.


