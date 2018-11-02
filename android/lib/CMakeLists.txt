cmake_minimum_required(VERSION 3.4.1)

add_library( Elastos.Wallet.Lib.Jni SHARED
             src/main/cpp/Log.cpp
             src/main/cpp/JniUtils.cpp
             src/main/cpp/ElastosWalletLibJni.cpp )

find_library( log-lib log )

target_link_libraries( Elastos.Wallet.Lib.Jni ${log-lib} )

include_directories ( Elastos.Wallet.Lib.Jni "${PROJECT_SOURCE_DIR}/src/main/jniLibs/include" )
target_link_libraries(Elastos.Wallet.Lib.Jni "${PROJECT_SOURCE_DIR}/src/main/jniLibs/armeabi-v7a/libElastos.Wallet.Utility.so" )
