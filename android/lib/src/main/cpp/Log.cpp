//
//  Log.cpp
//  Forge
//
//  Created by mengxk on 9/12/16.
//  Copyright © 2016 mengxk. All rights reserved.
//

#include "Log.hpp"

#include <iostream>

#if defined(__APPLE__)
#include <unistd.h>
#include <thread>
#include <pthread.h>
#define LOG_HEAD_FMT ("%c/%s(%u/%d): ")
#elif defined(__ANDROID__)
#include <android/log.h>
#endif

/***********************************************/
/***** static variables initialize *************/
/***********************************************/
enum Log::Level Log::m_logLevel = Log::Level::Verbose;
std::recursive_mutex Log::m_mutex {};
//const std::chrono::steady_clock::time_point Log::m_baseTime = std::chrono::steady_clock::now();

/***********************************************/
/***** static function implement ***************/
/***********************************************/
void Log::SetLevel(enum Level level)
{
  m_logLevel = level;
}

void Log::F(const char* tag, const char* format, ...)
{
  va_list ap;
  va_start(ap, format);
  log('F', tag, format, ap);
  va_end(ap);
}

void Log::E(const char* tag, const char* format, ...)
{
  va_list ap;
  va_start(ap, format);
  log('E', tag, format, ap);
  va_end(ap);
}

void Log::W(const char* tag, const char* format, ...)
{
  va_list ap;
  va_start(ap, format);
  log('W', tag, format, ap);
  va_end(ap);
}

void Log::I(const char* tag, const char* format, ...)
{
  if(m_logLevel < Level::Info) {
    return;
  }

  va_list ap;
  va_start(ap, format);
  log('I', tag, format, ap);
  va_end(ap);
}

void Log::D(const char* tag, const char* format, ...)
{
  if(m_logLevel < Level::Debug) {
    return;
  }

  va_list ap;
  va_start(ap, format);
  log('D', tag, format, ap);
  va_end(ap);
}

void Log::V(const char* tag, const char* format, ...)
{
  if(m_logLevel < Level::Verbose) {
    return;
  }

  va_list ap;
  va_start(ap, format);
  log('V', tag, format, ap);
  va_end(ap);
}

void Log::T(const char* tag, const char* function, int line, const char* format, ...)
{
  if(m_logLevel < Level::Trace) {
    return;
  }

  std::string new_fmt = "line:%d %s %s";
  char msg[1024] = { '\0' };

  if(format != nullptr) {
    va_list ap;
    va_start(ap, format);
    vsnprintf(msg, sizeof(msg) - 1, format, ap);
    va_end(ap);
  }

  log('T', tag, new_fmt.c_str(), line, function, msg);
}

uint64_t Log::Now() {
  return MilliNow();
}

uint64_t Log::MilliNow() {
  using namespace std::chrono;
  //return (duration_cast<milliseconds>(steady_clock::now() - m_baseTime)).count();
  return (duration_cast<milliseconds>(system_clock::now().time_since_epoch())).count();
}

uint64_t Log::MicroNow() {
  using namespace std::chrono;
//  return (duration_cast<microseconds>(steady_clock::now() - m_baseTime)).count();
  return (duration_cast<microseconds>(system_clock::now().time_since_epoch())).count();
}

uint64_t Log::NanoNow() {
  using namespace std::chrono;
//  return (duration_cast<nanoseconds>(steady_clock::now() - m_baseTime)).count();
  return (duration_cast<nanoseconds>(system_clock::now().time_since_epoch())).count();
}

/***********************************************/
/***** class public function implement  ********/
/***********************************************/


/***********************************************/
/***** class protected function implement  *****/
/***********************************************/


/***********************************************/
/***** class private function implement  *******/
/***********************************************/
inline void Log::log(const char head, const char* tag, const char* format, ...)
{
  va_list ap;
  va_start(ap, format);
  log(head, tag, format, ap);
  va_end(ap);
}

inline void Log::log(const char head, const char* tag, const char* format, va_list ap)
{
  //std::lock_guard<std::recursive_mutex> lg(m_mutex); // JSI是单线程的，所以不需要加锁。

#if defined(__APPLE__)
  mach_port_t tid = pthread_mach_thread_np(pthread_self());

  printf(LOG_HEAD_FMT, head, tag, getpid(), tid);
  vprintf(format, ap);
  printf("\n");
#elif defined(__ANDROID__)
  int prio = convPrio(head);
  __android_log_vprint(prio, tag, format, ap);
#endif
}

#if defined(__ANDROID__)
inline int Log::convPrio(const char head)
{
  int ret = ANDROID_LOG_UNKNOWN;

  switch (head) {
    case 'F':
      ret = ANDROID_LOG_FATAL;
      break;
    case 'E':
      ret = ANDROID_LOG_ERROR;
      break;
    case 'W':
      ret = ANDROID_LOG_WARN;
      break;
    case 'I':
      ret = ANDROID_LOG_INFO;
      break;
    case 'D':
      ret = ANDROID_LOG_DEBUG;
      break;
    case 'V':
      ret = ANDROID_LOG_VERBOSE;
      break;
    case 'T':
      ret = ANDROID_LOG_VERBOSE;
      break;
    default:
      ret = ANDROID_LOG_DEFAULT;
      break;
  }

  return ret;
}
#endif
