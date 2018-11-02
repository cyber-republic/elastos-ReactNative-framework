package org.elastos.wallet.lib;

public final class ElastosWalletDID {
    private ElastosWalletDID() {}

// Apis for DID
    /**
     * \~English
     * Get ID chain master public key.
     *
     * @param
     *      seed     [in] binary conent of seed.
     * @param
     *      seedLen  [in] the length of seed.
     *
     * @return
     *      the master public key if succeeded, or nullptr if failed.
     */
    public static native ElastosWallet.Data getIdChainMasterPublicKey(ElastosWallet.Data seed, int seedLen);

    /**
     * \~English
     * Generate ID chain sub private key.
     *
     * @param
     *      seed          [in] binary conent of seed.
     * @param
     *      seedLen       [in] the length of seed.
     * @param
     *      purpose       [in] the purpose.
     * @param
     *      index         [in] the index of the key.
     *
     * @return
     *      the sub private key if succeeded, or nullptr if failed.
     */
    public static native String generateIdChainSubPrivateKey(ElastosWallet.Data seed, int seedLen, int purpose, int index);

    /**
     * \~English
     * Generate ID chain sub public key.
     *
     * @param
     *      idMasterPublicKey          [in] the master public key of ID chain.
     * @param
     *      purpose                  [in] the purpose.
     * @param
     *      index                    [in] the index of the key.
     *
     * @return
     *      the sub public key if succeeded, or nullptr if failed.
     */
    public static native String generateIdChainSubPublicKey(ElastosWallet.Data idMasterPublicKey, int purpose, int index);

    /**
     * \~English
     * Generate DID from public key.
     *
     * @param
     *      idPublicKey          [in] the public key of ID chain.
     *
     * @return
     *      the DID if succeeded, or nullptr if failed.
     */
    public static native String getDid(String idPublicKey);
}
