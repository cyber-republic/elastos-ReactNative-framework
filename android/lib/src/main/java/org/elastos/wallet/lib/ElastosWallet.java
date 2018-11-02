package org.elastos.wallet.lib;

public final class ElastosWallet {
    private ElastosWallet() {}

    static {
        System.loadLibrary("Elastos.Wallet.Lib.Jni");
    }

    public static class Data {
        public byte[] buf;
    }

    /**
     * \~English
     * Get single address wallet public key.
     *
     * @param
     *      seed     [in] binary conent of seed.
     * @param
     *      seedLen  [in] the length of seed.
     *
     * @return
     *      the public key if succeeded, or nullptr if failed.
     */
    public static native String getSinglePublicKey(Data seed, int seedLen);

    /**
     * \~English
     * Get single address wallet private key.
     *
     * @param
     *      seed     [in] binary conent of seed.
     * @param
     *      seedLen  [in] the length of seed.
     *
     * @return
     *      the private key if succeeded, or nullptr if failed.
     */
    public static native String getSinglePrivateKey(Data seed, int seedLen);

    /**
     * \~English
     * Generate mnemonic.
     *
     * @param
     *      language     [in] language, such as english, chinese etc.
     * @param
     *      words        [in] the words, seperated by ' ', if the language is english, words is empty string.
     *
     * @return
     *      mnemonic if succeeded, or nullptr if failed.
     */
    public static native String generateMnemonic(String language, String words);

    /**
     * \~English
     * Get address from public key.
     *
     * @param
     *      publicKey     [in] the public key.
     *
     * @return
     *      the address if succeeded, or nullptr if failed.
     */
    public static native String getAddress(String publicKey);

    /**
     * \~English
     * Get seed from mnemonic.
     *
     * @param
     *      seed                [out] the seed content.
     * @param
     *      mnemonic            [in] mnemonic, seperated by ' '.
     * @param
     *      language            [in] language, such as english, chinese etc.
     * @param
     *      words               [in] the words, seperated by ' ', if the language is english, words is empty string.
     * @param
     *      mnemonicPassword    [in] mnemonic password, empty string or effctive password.
     *
     * @return
     *      the seed buffer length if succeeded, or 0 if failed.
     */
    public static native int getSeedFromMnemonic(Data seed, String mnemonic, String language, String words, String mnemonicPassword);

    /**
     * \~English
     * Sign data.
     *
     * @param
     *      privateKey          [in] the private key to sign the data.
     * @param
     *      data                [in] the data buffer.
     * @param
     *      len                 [in] length of data buffer.
     * @param
     *      signedData          [out] the signed data.
     *
     * @return
     *      the signed data length if succeeded, or 0 if failed.
     */
    public static native int sign(String privateKey, Data data, int len, Data signedData);

    /**
     * \~English
     * Verify data.
     *
     * @param
     *      publicKey           [in] the publik key to verify the data.
     * @param
     *      data                [in] the source data.
     * @param
     *      len                 [in] length of source data.
     * @param
     *      signedData          [in] the signed data.
     * @param
     *      signedLen           [in] the signed data length.
     *
     * @return
     *      true if verification passed, or false if failed.
     */
    public static native boolean verify(String publicKey, Data data, int len, Data signedData, int signedLen);
}
