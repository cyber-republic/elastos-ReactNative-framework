#include "JniUtils.hpp"

#include <thread>
#include "Log.hpp"

#define ENSURE_RUNON_THREAD(expect_thread_id) { \
    std::thread::id curr_thread_id = std::this_thread::get_id(); \
    if(curr_thread_id != expect_thread_id) { \
        Log::F(Log::TAG, "%s running on incorrect thread!!!", __PRETTY_FUNCTION__); \
        throw std::runtime_error("Running on incorrect thread"); \
    } \
}

/* =========================================== */
/* === static variables initialize =========== */
/* =========================================== */
const char* JniUtils::JavaClassNameBoolean = "java/lang/Boolean";
const char* JniUtils::JavaClassNameInteger = "java/lang/Integer";
//const char* JniUtils::JavaClassNameLong = "java/lang/Long";
const char* JniUtils::JavaClassNameDouble = "java/lang/Double";
const char* JniUtils::JavaClassNameString = "java/lang/String";
const char* JniUtils::JavaClassNameByteArray = "[B";
const char* JniUtils::JavaClassNameObject = "java/lang/Object";

//JavaVM* JniUtils::s_JVM = nullptr;
std::map<const char*, jclass> JniUtils::s_JavaClassMap {};

/* =========================================== */
/* === static function implement ============= */
/* =========================================== */
//JNIEXPORT jint JNICALL JNI_OnLoad(JavaVM *vm, void *reserved) {
//    Log::I(JniUtils::TAG, "%s", __PRETTY_FUNCTION__);
//
//    jint version = JNI_VERSION_1_6;
//
//    JniUtils::Init(vm);
//
//    return version;
//}

//void JniUtils::Init(JavaVM *vm)
//{
//    s_JVM = vm;
//
//    JniALayerEnv jenv = GetJALayerEnv();
//
//    const char* class_name_list[] = {
//            JavaClassNameBoolean,
//            JavaClassNameInteger,
////            JavaClassNameLong,
//            JavaClassNameDouble,
//            JavaClassNameString,
//            JavaClassNameByteArray,
//            JavaClassNameObject,
//    };
//    int size = sizeof(class_name_list) / sizeof(*class_name_list);
//
//    CacheJavaClass(jenv.get(), class_name_list, size);
//}

//JniUtils::JniALayerEnv JniUtils::GetJALayerEnv()
//{
//    JniUtils::JniALayerEnv ret;
//    bool need_detach = false;
//    std::thread::id thread_id = std::this_thread::get_id();
//
//    JNIEnv* env;
//    jint res = s_JVM->GetEnv((void **) &env, JNI_VERSION_1_6);
//    if (res != JNI_OK) {
//        res = s_JVM->AttachCurrentThread(&env, nullptr);
////        Log::W(JniUtils::TAG, "AttachCurrentThread, env = %p", env);
//        if (res != JNI_OK) {
//            Log::E(JniUtils::TAG, "%s Failed to AttachCurrentThread, ErrorCode = %d", __PRETTY_FUNCTION__, res);
//            return ret;
//        }
//        need_detach = true;
//    }
//
//    auto deleter = [=](JNIEnv* env) -> void {
//        ENSURE_RUNON_THREAD(thread_id);
//        if (need_detach == true) {
////            Log::W(JniUtils::TAG, "DetachCurrentThread, env = %p", env);
//            s_JVM->DetachCurrentThread();
//        }
//    };
//
//    ret = std::unique_ptr<JNIEnv, std::function<void(JNIEnv*)>>(env, deleter);
//
//    return ret;
//}

std::shared_ptr<_jobject> JniUtils::GetObjectSafely(JNIEnv* env, jclass class_instance, jmethodID constructor, ...)
{
    std::shared_ptr<_jobject> ret;
    std::thread::id thread_id = std::this_thread::get_id();
    va_list args;

    if(class_instance == nullptr
    || constructor == nullptr) {
        return ret; // nullptr
    }

    va_start(args, constructor);
    auto creater = [=]() -> jobject {
        ENSURE_RUNON_THREAD(thread_id);
        jobject obj = env->NewObjectV(class_instance, constructor, args);
//        Log::D(JniUtils::TAG, "GetObjectSafely creater(), env=%p this=%p", env, obj);
        return obj;
    };
    va_end(args);

    auto deleter = [=](jobject ptr) -> void {
//        Log::D(JniUtils::TAG, "GetObjectSafely deleter(), env=%p this=%p", env, ptr);
        ENSURE_RUNON_THREAD(thread_id);
        env->DeleteLocalRef(ptr);
    };

    ret = std::shared_ptr<_jobject>(creater(), deleter);

    return ret;
}

std::shared_ptr<_jobject> JniUtils::GetObjectSafely(JNIEnv* env, bool value)
{
    jclass jclass_bool = GetJavaClass(env, JavaClassNameBoolean);
    jmethodID jmethod_bool  = env->GetMethodID(jclass_bool, "<init>", "(Z)V");

    return GetObjectSafely(env, jclass_bool, jmethod_bool, value);
}

std::shared_ptr<_jobject> JniUtils::GetObjectSafely(JNIEnv* env, int32_t value)
{
    jclass jclass_int = GetJavaClass(env, JavaClassNameInteger);
    jmethodID jmethod_int  = env->GetMethodID(jclass_int, "<init>", "(I)V");

    return GetObjectSafely(env, jclass_int, jmethod_int, value);
}

//std::shared_ptr<_jobject> JniUtils::GetObjectSafely(JNIEnv* env, int64_t value)
//{
//    jclass jclass_long = GetJavaClass(JavaClassNameLong);
//    jmethodID jmethod_long  = env->GetMethodID(jclass_long, "<init>", "(J)V");
//
//    return GetObjectSafely(env, jclass_long, jmethod_long, value);
//}

std::shared_ptr<_jobject> JniUtils::GetObjectSafely(JNIEnv* env, double value)
{
    jclass jclass_double = GetJavaClass(env, JavaClassNameDouble);
    jmethodID jmethod_double  = env->GetMethodID(jclass_double, "<init>", "(D)V");

    return GetObjectSafely(env, jclass_double, jmethod_double, value);
}

std::shared_ptr<const char> JniUtils::GetStringSafely(JNIEnv* env, jstring str)
{
    std::shared_ptr<const char> ret;
    std::thread::id thread_id = std::this_thread::get_id();

    if(str == nullptr) {
        return ret; // nullptr
    }

    auto creater = [=]() -> const char* {
        ENSURE_RUNON_THREAD(thread_id);
        const char* ptr = env->GetStringUTFChars(str, nullptr);
//        Log::D(JniUtils::TAG, "GetStringSafely creater(), env=%p this=%p", env, ptr);
        return ptr;
    };
    auto deleter = [=](const char* ptr) -> void {
//        Log::D(JniUtils::TAG, "GetStringSafely deleter(), env=%p this=%p", env, ptr);
        ENSURE_RUNON_THREAD(thread_id);
        env->ReleaseStringUTFChars(str, ptr);
    };

    ret = std::shared_ptr<const char>(creater(), deleter);

    return ret;
}

std::shared_ptr<_jstring> JniUtils::GetStringSafely(JNIEnv* env, const char* str, bool with_deleter) {
    std::shared_ptr<_jstring> ret;
    std::thread::id thread_id = std::this_thread::get_id();

    if (str == nullptr) {
        return ret; // nullptr
    }

    auto creater = [=]() -> jstring {
        ENSURE_RUNON_THREAD(thread_id);
        jstring ptr = env->NewStringUTF(str);
//        Log::D(JniUtils::TAG, "GetStringSafely creater(), env=%p this=%p", env, ptr);
        return ptr;
    };

    auto deleter = [=](jstring ptr) -> void {
        if (with_deleter == false) {
            return;
        }

//        Log::D(JniUtils::TAG, "GetStringSafely deleter(), env=%p this=%p", env, ptr);
        ENSURE_RUNON_THREAD(thread_id);
        env->DeleteLocalRef(ptr);
    };

    ret = std::shared_ptr<_jstring>(creater(), deleter);

    return ret;
}

std::shared_ptr<const char> JniUtils::CopyStringSafely(JNIEnv* env, jstring str)
{
    std::shared_ptr<const char> ret;

    if(str == nullptr) {
        return ret; // nullptr
    }

    auto creater = [=]() -> const char* {
        int data_size = env->GetStringLength(str);
        int data_utf8_size = env->GetStringUTFLength(str);
        char* ptr = new char[data_utf8_size + 1];
        env->GetStringUTFRegion(str, 0, data_size, ptr);
        ptr[data_utf8_size] = '\0';
//        Log::D(JniUtils::TAG, "CopyStringSafely creater(), env=%p this=%p", env, ptr);
        return ptr;
    };
    auto deleter = [=](const char* ptr) -> void {
//        Log::D(JniUtils::TAG, "CopyStringSafely deleter(), env=%p this=%p", env, ptr);
        delete[] ptr;
    };

    ret = std::shared_ptr<const char>(creater(), deleter);

    return ret;
}

std::shared_ptr<int8_t> JniUtils::GetByteArraySafely(JNIEnv* env, jbyteArray data)
{
    std::shared_ptr<int8_t> ret;
    std::thread::id thread_id = std::this_thread::get_id();

    if(data == nullptr) {
        return ret; // nullptr
    }


    auto creater = [=]() -> int8_t* {
        ENSURE_RUNON_THREAD(thread_id);
        jbyte* buf_ptr = env->GetByteArrayElements(data, nullptr);
//        Log::D(JniUtils::TAG, "GetByteArraySafely creater(), env=%p this=%p", env, buf_ptr);
        return buf_ptr;
    };
    auto deleter = [=](int8_t* ptr) -> void {
//        Log::D(JniUtils::TAG, "GetByteArraySafely deleter(), env=%p this=%p", env, ptr);
        ENSURE_RUNON_THREAD(thread_id);
        env->ReleaseByteArrayElements(data, ptr, JNI_ABORT);
    };

    ret = std::shared_ptr<int8_t>(creater(), deleter);

    return ret;
}

std::shared_ptr<_jbyteArray> JniUtils::GetByteArraySafely(JNIEnv* env, int8_t data[], int len)
{
    std::shared_ptr<_jbyteArray> ret;
    std::thread::id thread_id = std::this_thread::get_id();

    if(len <= 0) {
        return ret; // nullptr
    }

    auto creater = [=]() -> jbyteArray {
        ENSURE_RUNON_THREAD(thread_id);
        jbyteArray jdata = env->NewByteArray(len);
        env->SetByteArrayRegion(jdata, 0, len, data);
//        Log::D(JniUtils::TAG, "GetByteArraySafely creater(), env=%p this=%p", env, jdata);
        return jdata;
    };
    auto deleter = [=](jbyteArray ptr) -> void {
//        Log::D(JniUtils::TAG, "GetByteArraySafely deleter(), env=%p this=%p", env, ptr);
        ENSURE_RUNON_THREAD(thread_id);
        env->DeleteLocalRef(ptr);
    };

    ret = std::shared_ptr<_jbyteArray>(creater(), deleter);

    return ret;
}

std::shared_ptr<int8_t> JniUtils::CopyByteArraySafely(JNIEnv* env, jbyteArray data)
{
    std::shared_ptr<int8_t> ret;

    if(data == nullptr) {
        return ret; // nullptr
    }


    auto creater = [=]() -> int8_t* {
        int data_size = env->GetArrayLength(data);
        int8_t* ptr = new int8_t[data_size];
        env->GetByteArrayRegion(data, 0, data_size, ptr);
//        Log::D(JniUtils::TAG, "CopyByteArraySafely creater(), env=%p this=%p", env, ptr);
        return ptr;
    };
    auto deleter = [=](int8_t* ptr) -> void {
//        Log::D(JniUtils::TAG, "CopyByteArraySafely deleter(), env=%p this=%p", env, ptr);
        delete[] ptr;
    };

    ret = std::shared_ptr<int8_t>(creater(), deleter);

    return ret;
}

std::shared_ptr<_jobject*> JniUtils::GetObjectArraySafely(JNIEnv* env, jobjectArray data)
{
    std::shared_ptr<_jobject*> ret;
    std::thread::id thread_id = std::this_thread::get_id();

    if(data == nullptr) {
        return ret; // nullptr
    }

    int array_size = env->GetArrayLength(data);
    if(array_size <= 0) {
        return ret;
    }

    auto creater = [=]() -> jobject* {
        ENSURE_RUNON_THREAD(thread_id);
        jobject* array_ptr = new jobject[array_size] {nullptr};
        for(int idx = 0; idx < array_size; idx++) {
            array_ptr[idx] = env->GetObjectArrayElement(data, idx);
        }
//        Log::D(JniUtils::TAG, "GetObjectArraySafely creater(), env=%p this=%p", env, array_ptr);
        return array_ptr;
    };
    auto deleter = [=](jobject* array_ptr) -> void {
//        Log::D(JniUtils::TAG, "GetObjectArraySafely deleter(), env=%p this=%p", env, array_ptr);
        ENSURE_RUNON_THREAD(thread_id);
        if(array_ptr == nullptr) {
            return;
        }
        for(int idx = 0; idx < array_size; idx++) {
            env->DeleteLocalRef(array_ptr[idx]);
        }
        delete[] array_ptr;
    };

    ret = std::shared_ptr<_jobject*>(creater(), deleter);

    return ret;
}

std::shared_ptr<_jobjectArray> JniUtils::GetObjectArraySafely(JNIEnv* env, jobject data[], int len)
{
    std::shared_ptr<_jobjectArray> ret;
    std::thread::id thread_id = std::this_thread::get_id();

    if(data == nullptr
    || len <= 0) {
        return ret; // nullptr
    }

    auto creater = [=]() -> jobjectArray {
        ENSURE_RUNON_THREAD(thread_id);
        jclass jclass_obj = GetJavaClass(env, JavaClassNameObject);
        jobjectArray jdata = env->NewObjectArray(len, jclass_obj, nullptr);
        for(int idx = 0; idx < len; idx++) {
            env->SetObjectArrayElement(jdata, idx, data[idx]);
        }
//        Log::D(JniUtils::TAG, "GetObjectArraySafely creater(), env=%p this=%p", env, jdata);
        return jdata;
    };
    auto deleter = [=](jobjectArray ptr) -> void {
//        Log::D(JniUtils::TAG, "GetObjectArraySafely deleter(), env=%p this=%p", env, ptr);
        ENSURE_RUNON_THREAD(thread_id);
        if(ptr == nullptr) {
            return;
        }
        env->DeleteLocalRef(ptr);
    };

    ret = std::shared_ptr<_jobjectArray>(creater(), deleter);

    return ret;

}

//void JniUtils::CacheJavaClass(JNIEnv* env, const char* class_name_list[], int size)
//{
//    for(int idx = 0; idx < size; idx++) {
//        const char* class_name = class_name_list[idx];
//        if(s_JavaClassMap.find(class_name) != s_JavaClassMap.end()) {
//            Log::I(JniUtils::TAG, "%s [%s] is already cached", __PRETTY_FUNCTION__, class_name);
//            continue;
//        }
//
//        jclass clazz = env->FindClass(class_name);
//        if(clazz == nullptr) {
//            Log::I(JniUtils::TAG, "%s Failed to find class [%s]", __PRETTY_FUNCTION__, class_name);
//            continue;
//        }
//
//        s_JavaClassMap[class_name] = (jclass) env->NewGlobalRef(clazz);
//        env->DeleteLocalRef(clazz);
//    }
//}

jclass JniUtils::GetJavaClass(JNIEnv* env, const char* class_name)
{
    // CRASH if not found
    auto found = s_JavaClassMap.find(class_name);
    if(found == s_JavaClassMap.end()) {
        jclass clazz = env->FindClass(class_name);
        s_JavaClassMap[class_name] = (jclass) env->NewGlobalRef(clazz);
        env->DeleteLocalRef(clazz);
    }


    return s_JavaClassMap.at(class_name);
}

/* =========================================== */
/* === class public function implement  ====== */
/* =========================================== */


/* =========================================== */
/* === class protected function implement  === */
/* =========================================== */


/* =========================================== */
/* === class private function implement  ===== */
/* =========================================== */

