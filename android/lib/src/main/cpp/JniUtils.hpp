#ifndef __JNI_UTILS_HPP__
#define __JNI_UTILS_HPP__

#include <map>
#include <memory>
#include <mutex>
#include <jni.h>

extern "C"
JNIEXPORT jint JNICALL
JNI_OnLoad(JavaVM *vm, void *reserved);

class JniUtils {
public:
//    using JniALayerEnv = std::unique_ptr<JNIEnv, std::function<void(JNIEnv*)>>;

//    static void Init(JavaVM *vm);
//
//    static JniALayerEnv GetJALayerEnv();

    static std::shared_ptr<_jobject> GetObjectSafely(JNIEnv* env, jclass jclass_instance, jmethodID constructor, ...);
    static std::shared_ptr<_jobject> GetObjectSafely(JNIEnv* env, bool value);
    static std::shared_ptr<_jobject> GetObjectSafely(JNIEnv* env, int32_t value);
//    static std::shared_ptr<_jobject> GetObjectSafely(JNIEnv* env, int64_t value);
    static std::shared_ptr<_jobject> GetObjectSafely(JNIEnv* env, double value);


    static std::shared_ptr<const char> GetStringSafely(JNIEnv* env, jstring str);
    static std::shared_ptr<_jstring> GetStringSafely(JNIEnv* env, const char* str, bool with_deleter = true);

    static std::shared_ptr<const char> CopyStringSafely(JNIEnv* env, jstring str);

    static std::shared_ptr<int8_t> GetByteArraySafely(JNIEnv* env, jbyteArray data);
    static std::shared_ptr<_jbyteArray> GetByteArraySafely(JNIEnv* env, int8_t data[], int len);

    static std::shared_ptr<int8_t> CopyByteArraySafely(JNIEnv* env, jbyteArray data);

    static std::shared_ptr<_jobject*> GetObjectArraySafely(JNIEnv* env, jobjectArray data);
    static std::shared_ptr<_jobjectArray> GetObjectArraySafely(JNIEnv* env, jobject data[], int len);


//    static void CacheJavaClass(JNIEnv* env, const char* class_name_list[], int size);
    static jclass GetJavaClass(JNIEnv* env, const char* class_name);

    static const char* JavaClassNameBoolean;
    static const char* JavaClassNameInteger;
//    static const char* JavaClassNameLong;
    static const char* JavaClassNameDouble;
    static const char* JavaClassNameString;
    static const char* JavaClassNameByteArray;
    static const char* JavaClassNameObject;

    static constexpr const char *TAG = "JSIJni";

private:
    static JavaVM* s_JVM;
    static std::map<const char*, jclass> s_JavaClassMap;

    explicit JniUtils() = delete;
    virtual ~JniUtils() = delete;
};

#endif /* __JNI_UTILS_HPP__ */

