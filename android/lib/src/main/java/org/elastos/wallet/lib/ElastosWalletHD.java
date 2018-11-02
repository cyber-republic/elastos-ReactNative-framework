package org.elastos.wallet.lib;

public final class ElastosWalletHD {
    private ElastosWalletHD() {}

    /**
     * \~English
     * Indicate the external chain.
     */
    public static final int EXTERNAL_CHAIN = 0;

    /**
     * \~English
     * Indicate the internal chain.
     */
    public static final int INTERNAL_CHAIN = 1;

    public static final int COIN_TYPE_ELA = 0;

    /**
     * \~English
     * Get master public key for HD wallet.
     *
     * @param
     *      seed     [in] binary conent of seed.
     * @param
     *      seedLen  [in] the length of seed.
     * @param
     *      coinType [in] coin type.
     *
     * @return
     *      the master public key if succeeded, or nullptr if failed.
     */
    public static native ElastosWallet.Data getMasterPublicKey(ElastosWallet.Data seed, int seedLen, int coinType);

    /**
     * \~English
     * Generate sub private key for HD wallet.
     *
     * @param
     *      seed          [in] binary conent of seed.
     * @param
     *      seedLen       [in] the length of seed.
     * @param
     *      coinType      [in] the coin type, for example COIN_TYPE_ELA.
     * @param
     *      chain         [in] the chain code, EXTERNAL_CHAIN or INTERNAL_CHAIN.
     * @param
     *      index         [in] the index of the key.
     *
     * @return
     *      the sub private key if succeeded, or nullptr if failed.
     */
    public static native String generateSubPrivateKey(ElastosWallet.Data seed, int seedLen, int coinType, int chain, int index);

    /**
     * \~English
     * Generate sub public key for HD wallet.
     *
     * @param
     *      masterPublicKey          [in] the master public key.
     * @param
     *      chain                    [in] the chain code, EXTERNAL_CHAIN or INTERNAL_CHAIN.
     * @param
     *      index                    [in] the index of the key.
     *
     * @return
     *      the sub public key if succeeded, or nullptr if failed.
     */
    public static native String generateSubPublicKey(ElastosWallet.Data masterPublicKey, int chain, int index);
}
