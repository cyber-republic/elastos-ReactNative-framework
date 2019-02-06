package org.elastos.mainchain.reactnative;

import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

import com.elastos.spvcore.*;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class RNElastosMainchainModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;
    private static final String TAG = "WalletPlugin";

    public String rootPath;

    public MasterWalletManager walletManager;
    public IMasterWallet masterWallet;
    public ISubWallet subWallet;
    public String language;
    public String mnemonic;
    public String masterWalletId;
    public String phrasePassword;
    public String payPassword;
    public boolean singleAddress;
    public long feePerKb;

    public RNElastosMainchainModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;

        rootPath = reactContext.getFilesDir().getParent();
        ElastosWalletUtils.InitConfig(reactContext, rootPath);
        walletManager = new MasterWalletManager(rootPath);
        mnemonic = "";
        language = "english";
        masterWalletId = "masterWalletId";
        phrasePassword = "";
        payPassword = "elastos2018";
        singleAddress = false;
        feePerKb = 10000; //SELA

//        masterWallet = walletManager.ImportWalletWithMnemonic(masterWalletId, mnemonic, phrasePassword, payPassword, singleAddress);
//        String chainID = "ELA";
//        subWallet = masterWallet.CreateSubWallet(chainID, feePerKb);
//        subWallet.AddCallback(new ISubWalletCallback() {
//            @Override public void OnTransactionStatusChanged(String txId, String status, String desc, int confirms) {
//                Log.e("Wallet Info", "txId: " + txId + " status: " + status + " desc: " + desc + " confirms: " + String.valueOf(confirms));
//            }
//            @Override public void OnBlockSyncStarted() {
//                Log.e("Wallet Info", "BlockSyncStarted");
//            }
//
//            @Override public void OnBlockHeightIncreased(int currentBlockHeight, int progress) {
//                Log.e("Wallet Info", "currentBlockHeight: " + String.valueOf(currentBlockHeight) + " progress: " + String.valueOf(progress));
//            }
//            @Override public void OnBlockSyncStopped() {
//                Log.e("Wallet Info", "BlockSyncStopped");
//            }
//
//            @Override
//            public void OnBalanceChanged(long l) {
//                Log.e("Wallet Info", "BalanceChanged: " + String.valueOf(l));
//            }
//        });
    }

    @Override
    public String getName() {
        return "RNElastosMainchain";
    }

    @ReactMethod
    public void generateMnemonic(Callback callback) {
        String newMnemonic = walletManager.GenerateMnemonic(language);
        callback.invoke(null, newMnemonic);
    }

    @ReactMethod
    public void importWalletWithMnemonic(String importMnemonic, Callback callback) {
        masterWallet = walletManager.ImportWalletWithMnemonic(masterWalletId, importMnemonic, phrasePassword, payPassword, singleAddress);
        String chainID = "ELA";
        subWallet = masterWallet.CreateSubWallet(chainID, feePerKb);
        callback.invoke(null, "success");
    }

    @ReactMethod
    public void createWallet(String newMnemonic, Callback callback) {
        masterWallet = walletManager.CreateMasterWallet(masterWalletId, newMnemonic, phrasePassword, payPassword, singleAddress);
        String chainID = "ELA";
        subWallet = masterWallet.CreateSubWallet(chainID, feePerKb);
        callback.invoke(null, "success");
    }

    @ReactMethod
    public void getPublicAddress(Callback callback) {
        String publicAddress = subWallet.CreateAddress();
        callback.invoke(null, publicAddress);
    }

    @ReactMethod
    public void getBalance(Callback callback) {
        long balance = subWallet.GetBalance();
        callback.invoke(null, String.valueOf(balance));
    }

    @ReactMethod
    public void getTransactionHistory(Callback callback) throws JSONException {
        int count = 5;
        JSONArray transactionHistory = new JSONArray();
        for (int i = 0; count != 0 ; i++){
            String address = new JSONObject(subWallet.GetAllAddress(i,1)).getJSONArray("Addresses").get(0).toString();
            try {
                JSONObject transaction = new JSONObject(subWallet.GetAllTransaction(0, 5, address));
                if (transaction.isNull("Transactions")) break;
                JSONArray transactionField = transaction.getJSONArray("Transactions");
                int length = transactionField.length();
                if (length == 0) break;
                for (int j = 0; j < length && count != 0 ; j++) {
                    JSONObject transactionSummary = transactionField.getJSONObject(j).getJSONObject("Summary");
                    transactionHistory.put(transactionSummary);
                    count--;
                }
            } catch (Throwable t) {
                Log.e("My App", "Could not parse malformed JSON");
            }
        }
        callback.invoke(null, transactionHistory.toString());
    }

    @ReactMethod
    public void sendToAddress(String amount, String toAddress, Callback callback) {
        String rawTransaction = subWallet.CreateTransaction("", toAddress, Long.parseLong(amount), "from Mobile Wallet", "remark");
        long fee = subWallet.CalculateTransactionFee(rawTransaction, feePerKb);
        rawTransaction = subWallet.UpdateTransactionFee(rawTransaction, fee);
        rawTransaction = subWallet.SignTransaction(rawTransaction, payPassword);
        String transactionId = subWallet.PublishTransaction(rawTransaction);

        callback.invoke(null, transactionId);
    }
}