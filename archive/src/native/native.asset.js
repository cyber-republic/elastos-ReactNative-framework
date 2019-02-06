
'use strict';


var RCTAssetManager = require('NativeModules').AssetManager;
var invariant = require('invariant');


export default class {


  /**
   * Saves the resource file dowloaded from url into cache directory
   * @param {string} url
   * @param {string} cacheDir cache directory where we're going to store the resource file
   * @param {function} sucessfull callback -Invoked with arg of filename given to dowloaded resource in cache
   *                   directory.
   * @param {function} error callback - Invoked with error message on error.
   *
   */
  static downloadResourceFromUrl(name, url, cacheDir, successCallback, errorCallback) {

      invariant(
       typeof url === 'string',
       'RCTAssetManager.downloadResourceFromUrl url must be a valid string.'
      );

      invariant(
          typeof cacheDir === 'string',
          'RCTAssetManager.downloadResourceFromUrl cacheDir must be a valid string.'
      );

      RCTAssetManager.downloadResourceFromUrl(
        name,
        url,
        cacheDir,

        (localFileName) => {
            successCallback && successCallback(localFileName);
        },
         (errorMessage) => {
            errorCallback && errorCallback(errorMessage);
        });
  }

    /**
     * Lists resource file names in cache directory
     * @param {string} cacheDir cache directory where is stored the resource file.
     * @param {function} sucessfull callback -Invoked with arg of  list of resource filenames stored
     *                                        in cache directory.
     * @param {function} error callback - Invoked with error message on error.
     */
    static listResourcesInCache(cacheDir, successCallback, errorCallback) {

        invariant(
            typeof cacheDir === 'string',
            'RCTAssetManager.downloadResourceFromUrl cacheDir must be a valid string.'
        );


        RCTAssetManager.listResourcesInCache(cacheDir,

            (arrayFilenames) => {
                successCallback && successCallback(arrayFilenames);
            },
            (errorMessage) => {
                errorCallback && errorCallback(errorMessage);
            });
    }


    /**
     * Delete resource file in cache directory
     * @param {string} cacheDir cache directory where is stored the resource file.
     * @param {function} sucessfull callback -Invoked with arg of  list of resource filenames stored
     *                                        in cache directory.
     * @param {function} error callback - Invoked with error message on error.
     */
    static deleteResourceInCache(filename, cacheDir, successCallback) {

        invariant(
            typeof cacheDir === 'string',
            'RCTAssetManager.deleteResourceInCache cacheDir must be a valid string.'
        );

        invariant(
            typeof filename === 'string',
            'RCTAssetManager.deleteResourceInCache filename must be a valid string.'
        );


        RCTAssetManager.deleteResourceInCache(filename,cacheDir,

            (deleted) => {
                successCallback && successCallback(deleted);
            }
        );
    }

}
