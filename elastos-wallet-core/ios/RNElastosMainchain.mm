#import "RNElastosMainchain.h"
#import <React/RCTLog.h>
#import <Foundation/Foundation.h>

#include <iostream>
#include <boost/scoped_ptr.hpp>
#include "MasterWalletManager.h"
#include "ISubWalletCallback.h"
#include "IMasterWallet.h"
#include "nlohmann/json.hpp"
#include <spdlog/logger.h>
#include <spdlog/spdlog.h>

@implementation RNElastosMainchain


RCT_EXPORT_MODULE()

static bool syncSucceed = false;
static std::shared_ptr<spdlog::logger> logger = spdlog::stdout_color_mt("sample");;

class SubWalletCallback: public Elastos::ElaWallet::ISubWalletCallback {
public:
    ~SubWalletCallback() {}
    SubWalletCallback() {}
    
    virtual void OnTransactionStatusChanged(
                                            const std::string &txid,const std::string &status,
                                            const nlohmann::json &desc,uint32_t confirms) {
        std::cout << "OnTransactionStatusChanged -> " << std::endl;
    }
    virtual void OnBlockSyncStarted() {
        std::cout << "OnBlockSyncStarted" << std::endl;
    }
    virtual void OnBlockHeightIncreased(uint32_t currentBlockHeight,
                                        int progress) {
        //        std::cout << "OnBlockHeightIncreased -> " << std::endl;
        NSLog(@"PROGRESS IS : %i", progress);
        if (currentBlockHeight >= progress) {
            syncSucceed = true;
        }
    }
    virtual void OnBlockSyncStopped() {
        std::cout << "OnBlockSyncStopped" << std::endl;
    }
    virtual void OnBalanceChanged(uint64_t balance) {
        std::cout << "OnBalanceChanged -> " << std::endl;
    }
};


// Functions required to load the /Data folder properly
+ (NSString *)getRootPath
{
    NSString *pathStr = [[NSBundle mainBundle] bundlePath];
    NSString *path = [NSString stringWithFormat:@"%@/Data", pathStr];
    
    NSString *toPathStr = [NSHomeDirectory() stringByAppendingPathComponent:@"Documents"];
    
    NSString *toPath = [toPathStr stringByAppendingString:@"/Data"];
    NSFileManager *fileManager = [[NSFileManager alloc] init];
    [fileManager createDirectoryAtPath:toPath withIntermediateDirectories:NO attributes:nil error:nil];
    [self copyFileFromPath:path toPath:toPath];
    
    return toPath;
}
+ (void)copyFileFromPath:(NSString *)sourcePath toPath:(NSString *)toPath
{
    NSFileManager *fileManager = [[NSFileManager alloc] init];
    NSError *error = nil;
    NSArray* array = [fileManager contentsOfDirectoryAtPath:sourcePath error:&error];
    if(error) {}
    for(int i = 0; i<[array count]; i++)
    {
        NSString *fullPath = [sourcePath stringByAppendingPathComponent:[array objectAtIndex:i]];
        NSString *fullToPath = [toPath stringByAppendingPathComponent:[array objectAtIndex:i]];
        
        BOOL isFolder = NO;
        BOOL isExist = [fileManager fileExistsAtPath:fullPath isDirectory:&isFolder];
        if (isExist)
        {
            NSError *err = nil;[[NSFileManager defaultManager] copyItemAtPath:fullPath toPath:fullToPath error:&err];
            if (isFolder){
                [self copyFileFromPath:fullPath toPath:fullToPath];
            }
        }
    }
}


RCT_EXPORT_METHOD(generateMnemonic: (RCTResponseSenderBlock)callback)
{
    
}



RCT_EXPORT_METHOD(importWalletWithMnemonic: (RCTResponseSenderBlock)callback)
{
    
    NSString *mRootPath = [RNElastosMainchain getRootPath];
    const char *rootPath = [mRootPath UTF8String];
    Elastos::ElaWallet::MasterWalletManager *manager = new Elastos::ElaWallet::MasterWalletManager(rootPath);
    
    static const std::string gMasterWalletID = "MasterWalletTest";
    
    // InitWallets()
    std::vector<Elastos::ElaWallet::IMasterWallet *> masterWallets = manager->GetAllMasterWallets();
    Elastos::ElaWallet::IMasterWallet *masterWallet = nullptr;
    masterWallet = manager->ImportWalletWithMnemonic(gMasterWalletID, "maximum farm someone leg music federal pyramid lounge scrap bomb skin mystery", "", "Ela-TestRN", false);
    masterWallets.push_back(masterWallet);
    
    masterWallet->CreateSubWallet("ELA");
    masterWallet->CreateSubWallet("IdChain");
    
    // adding callback to all subwallets
    for (size_t i = 0; i < masterWallets.size(); ++i) {
        std::vector<Elastos::ElaWallet::ISubWallet *> subWallets = masterWallets[i]->GetAllSubWallets();
        for (size_t j = 0; j < subWallets.size(); ++j) {
            subWallets[j]->AddCallback(new SubWalletCallback());
        }
    }
    
    
    while(1) {
        if (syncSucceed) {
            // GetBalance
            
            // GetSubWallet
            Elastos::ElaWallet::IMasterWallet *masterWallet = manager->GetWallet(gMasterWalletID);
            std::vector<Elastos::ElaWallet::ISubWallet *> subWallets = masterWallet->GetAllSubWallets();
            for (size_t i = 0; i < subWallets.size(); ++i) {
                if (subWallets[i]->GetChainId() == "ELA") {
                    uint64_t balance = subWallets[i]->GetBalance();
                    NSLog(@"BALANCE IS : %@", [NSNumber numberWithUnsignedLongLong:balance]);
                    nlohmann::json txSummary = subWallets[i]->GetAllTransaction(0, 500, "");
                    NSLog(@"ALLTX ---------> %s", txSummary["Transactions"].dump().c_str());
                    std::string publicAddress = subWallets[i]->CreateAddress();
                    callback(@[[NSNull null], @"success", @(publicAddress.c_str()), [NSNumber numberWithUnsignedLongLong:balance], @(txSummary["Transactions"].dump().c_str()) ]);
                }
            }
            sleep(10);
        } else {
            sleep(1);
        }
    }
}






RCT_EXPORT_METHOD(getLatestTx: (RCTResponseSenderBlock)callback)
{
    NSString *language = @"english";
    NSString *mRootPath = [RNElastosMainchain getRootPath];
    const char *rootPath = [mRootPath UTF8String];
    Elastos::ElaWallet::MasterWalletManager *manager = new Elastos::ElaWallet::MasterWalletManager(rootPath);
    
    Elastos::ElaWallet::IMasterWallet *masterWallet = manager->ImportWalletWithMnemonic("WalletID", "maximum farm someone leg music federal pyramid lounge scrap bomb skin mystery", "", "Ela-TestRN", false);
    std::string chainID = "ELA";
    Elastos::ElaWallet::ISubWallet *subWallet = masterWallet->CreateSubWallet(chainID, 10000);
    std::string publicAddress = subWallet->CreateAddress();
    uint64_t balance = subWallet->GetBalance();
    
    nlohmann::json j = subWallet->GetAllAddress(0, 3);
    
}




RCT_EXPORT_METHOD(createWallet: (RCTResponseSenderBlock)callback)
{
    NSString *mRootPath;
    mRootPath = [RNElastosMainchain getRootPath];
    const char *rootPath = [mRootPath UTF8String];
    
    try {
        // MasterWalletManager
        NSLog(@"Creating MasterWallet");
        Elastos::ElaWallet::MasterWalletManager *manager = new Elastos::ElaWallet::MasterWalletManager(rootPath);
        if (manager == nullptr) {
            // fail process
            NSLog(@"MasterWalletManager FAILED...");
        }
        try {
            std::vector<Elastos::ElaWallet::IMasterWallet *> masterWallets = manager->GetAllMasterWallets();
            if (masterWallets.size() == 0) {
                const std::string walletID = "HDWalletID";
                const std::string phrasePassword = "";
                const std::string payPassword = "Pay_Password~123^456";
                const bool singleAddress = false;
                try {
                    const std::string mnemonic = manager->GenerateMnemonic("english");
                    Elastos::ElaWallet::IMasterWallet *masterWallet = manager->CreateMasterWallet(walletID, mnemonic, phrasePassword, payPassword, singleAddress);
                    
                    std::string chainID = "ELA";
                    Elastos::ElaWallet::ISubWallet *subWallet = masterWallet->CreateSubWallet(chainID, 10000);
                    std::string publicAddress = subWallet->CreateAddress();
                    
                    callback(@[[NSNull null], @(mnemonic.c_str()), @(publicAddress.c_str()) ]);
                    
                } catch (const std::exception &e) {
                    NSLog(@"Mnemonic Exception : %s", e.what());
                }
            } else {
                for (size_t i = 0; i < masterWallets.size(); ++i) {
                    std::vector<Elastos::ElaWallet::ISubWallet *> subWallets = masterWallets[i]->GetAllSubWallets();
                }
            }
        } catch (const std::exception &e) {
            NSLog(@"IMasterWallet Exception : %s", e.what());
        }
    } catch (const std::exception &e) {
        NSLog(@"MasterWalletManager Exception : %s", e.what());
    }
}

@end



