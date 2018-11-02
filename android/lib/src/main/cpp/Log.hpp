#ifndef _JSI_LOG_HPP_
#define _JSI_LOG_HPP_

#include <cstdarg>
#include <mutex>
#include <chrono>

#if defined(LOGT_PRINT_ALL)
#define LOGT_OPAQUE_DEFAULT() Log::T("JSIOpaque", __PRETTY_FUNCTION__, __LINE__, nullptr)
#define LOGT_JSC(fmt, args...) Log::T("JSIJSC", __PRETTY_FUNCTION__, __LINE__, fmt, args)
#define LOGT_OPAQUE(fmt, args...) Log::T("JSIOpaque", __PRETTY_FUNCTION__, __LINE__, fmt, ##args)
#define LOGT_WORKER(fmt, args...) Log::T("JSIWorker", __PRETTY_FUNCTION__, __LINE__, fmt, ##args)
#define LOGT_EXTRA(fmt, args...) Log::T("JSIExtra", __PRETTY_FUNCTION__, __LINE__, fmt, ##args)
#else // defined(LOGT_PRINT_ALL)
#define LOGT_OPAQUE_DEFAULT()
#define LOGT_JSC(fmt, args...) Log::T("JSIJSC", __PRETTY_FUNCTION__, __LINE__, fmt, args)
#define LOGT_OPAQUE(fmt, args...)
#define LOGT_WORKER(fmt, args...)
#define LOGT_EXTRA(fmt, args...)
#endif // defined(LOGT_PRINT_ALL)

class Log {
public:
  /*** type define ***/
  enum Level {
    Warn = 0,
    Info,
    Debug,
    Verbose,
    Trace,
  };

  /*** static function and variable ***/
  static void SetLevel(enum Level level);
  static void F(const char* tag, const char* format, ...);
  static void E(const char* tag, const char* format, ...);
  static void W(const char* tag, const char* format, ...);
  static void I(const char* tag, const char* format, ...);
  static void D(const char* tag, const char* format, ...);
  static void V(const char* tag, const char* format, ...);
  static void T(const char* tag, const char* function, int line, const char* format, ...);
  static uint64_t Now();
  static uint64_t MilliNow();
  static uint64_t MicroNow();
  static uint64_t NanoNow();

  static constexpr const char *TAG = "JSI";

  /*** class function and variable ***/

private:
  /*** type define ***/

  /*** static function and variable ***/
  static inline void log(const char head, const char* tag, const char* format, ...);
  static inline void log(const char head, const char* tag, const char* format, va_list ap);

  static enum Level m_logLevel;
  static std::recursive_mutex m_mutex;
//  static const std::chrono::steady_clock::time_point m_baseTime;

#if defined(__ANDROID__)
  static inline int convPrio(const char head);
#endif

  /*** class function and variable ***/
  Log() { }
  virtual ~Log() = 0;
};

#endif /* _JSI_LOG_HPP_ */
