
#import "testWallet.h"
#import <Foundation/Foundation.h>
#import <React/RCTLog.h>
#import "Elastos.Wallet.Utility.h"

@implementation testWallet
RCT_EXPORT_MODULE();

char* readMnemonicFile(const char* path)
{
  FILE* file = fopen(path, "r");
  if (!file) {
    return nullptr;
  }
  char* buf = (char*)malloc(1024 * 10);
  if (!buf) {
    fclose(file);
    return nullptr;
  }
  int count = 0;
  char c;
  
  while ( (c = fgetc(file)) != EOF) {
    buf[count++] = c;
  }
  
  buf[count] = '\0';
  fclose(file);
  
  return buf;
}

RCT_EXPORT_METHOD(testWalletIos: (RCTResponseSenderBlock)callback)
{
  NSLog(@"testing Wallet ios");
  
  const char* path = "/Users/abilican/Documents/projects/perso/elastos/Elastos.ORG.Wallet.Lib.C/src/Data/mnemonic_chinese.txt";
  char* words = readMnemonicFile(path);
  char* mnemonic = generateMnemonic("chinese", words);
  
  NSLog(@"Mnemonic IS : %s", mnemonic);
  
  void* seed;
  int seedLen = getSeedFromMnemonic(&seed, mnemonic, "chinese", words, "");
  char* privateKey = getSinglePrivateKey(seed, seedLen);
  char* publicKey = getSinglePublicKey(seed, seedLen);
  
  NSLog(@"PRIVATEKEY IS : %s", privateKey);
  NSLog(@"PUBLICKEY IS : %s", publicKey);
  
  NSString* mnemonicStr = [NSString stringWithUTF8String:mnemonic];
  NSString* publicKeyStr = [NSString stringWithUTF8String:publicKey];
  NSString* privateKeyStr = [NSString stringWithUTF8String:privateKey];
  callback(@[[NSNull null], mnemonicStr, publicKeyStr, privateKeyStr ]);
}
@end
