package org.elastos.wallet.lib;

public final class ElastosWalletSign {
    private ElastosWalletSign() {}

    /**
     * \~English
     * Generate raw transaction data, sign transaction and serialize.
     *
     * @param
     *      transaction          [in] the transaction data in json string.
     *
     * @return
     *      the raw transaction data if succeeded, or nullptr if failed.
     */
    public static native String generateRawTransaction(String transaction);


// Apis for multi sign
    /**
     * \~English
     * Get the multi sign address.
     *
     * @param
     *      publicKeys          [in] public key array of signers.
     * @param
     *      length              [in] the length of public key array.
     * @param
     *      requiredSignCount   [in] the require sign count.
     *
     * @return
     *      the address of multi sign if succeeded, or nullptr if failed.
     *      if you no longer use, call freeBuf to free memory.
     */
    public static native String getMultiSignAddress(String[] publicKeys, int length, int requiredSignCount);

    /**
     * \~English
     * Generate the multi sign transaction json string, the json string can be send to the next signer.
     *
     * @param
     *      privateKey          [in] the private key to sign the transaction.
     * @param
     *      publicKeys          [in] public key array of signers.
     * @param
     *      length              [in] the length of public key array.
     * @param
     *      requiredSignCount   [in] the require sign count.
     * @param
     *      transaction         [in] the transaction data in json string.
     *
     * @return
     *      the signed transaction data in json string if succeeded, or nullptr if failed.
     */
    public static native String multiSignTransaction(String privateKey, String[] publicKeys, int length, int requiredSignCount, String transaction);

    /**
     * \~English
     * Serialize the multi signed transaction json string.
     *
     * @param
     *      transaction          [in] the signed transaction data in json string.
     *
     * @return
     *      the serialized transaction data in json string if succeeded, or nullptr if failed.
     */
    public static native String serializeMultiSignTransaction(String transaction);

}
