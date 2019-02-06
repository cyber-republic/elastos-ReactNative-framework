import Assets from 'app/native/native.asset';
import config from 'app/config';
import Load from 'app/native/native.load';
import {Log} from 'app/lib';

const _log = Log.create('method.dapp');

export default (dm)=>{
  const F = {
    async list(){
      return new Promise((resolve, reject)=>{
        Assets.listResourcesInCache(config.DAPP_CACHE_DIR, (list)=>{
          dm.dispatch(dm.action.dapp_list(list));
          resolve(list);
        }, (err)=>{
          reject(err);
        });
      });
    },

    async loadByUrl(url){
      _log.info(url);
      await Load.load(url);
    },

    async open(name, remote_url){
      // check exist or not by name
      // const list = await F.list();

      return new Promise((resolve, reject)=>{
        // download to cache
        Assets.downloadResourceFromUrl(name, remote_url, config.DAPP_CACHE_DIR, async (res)=>{
          await F.loadByUrl(res.path);
          resolve(res);
        }, (error)=>{
          reject(error);
        });
      });
      
    }

    
  };

  return F;
};