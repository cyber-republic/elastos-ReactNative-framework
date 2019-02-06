import {Platform} from 'react-native';
import {plugin, _} from 'CR';
import me from './me';
import friends from './friends';
import messgae from './message';
import session from './session';
import config from 'app/config';

const Carrier = plugin.Carrier;
let _carrier = null;

const streamCache = {};
const randomCache = {};
const friendCache = {};

const F = {
  getRandomNumber(friendId){
    if(!randomCache[friendId]){
      if(Platform.OS === 'ios'){
        // TODO
        randomCache[friendId] = 1;
      }
      else{
        randomCache[friendId] = _.random(1, 100000) * _.random(1, 100000);
      }
      
    }
    return randomCache[friendId];
  },
  sessionHandshack(dm, friendId){
    const random = F.getRandomNumber(friendId);
console.log('[random send] : '+random);
    _carrier.sendMessage(friendId, config.STREAM_HANDSHACK_RANDOM+':'+random).then(()=>{
      // if(Platform.OS === 'ios'){
      //   dm.method.session.sessionRequest(friendId).catch(()=>{});
      // }
    });
    
  },
  sessionHandshackCallback(dm, friendId, random){
    const local_random = F.getRandomNumber(friendId);
    console.log('[ random ] : ', _.toNumber(random), local_random);
    if(_.toNumber(random) > local_random){
      _.delay(()=>{
        dm.method.session.sessionRequest(friendId).catch(()=>{});
      }, 500);
      
    }
  },


  buildCallback(dm){
    return {
      onReady : async ()=>{
        const address = await _carrier.getAddress();
        dm.dispatch(dm.action.me_set({
          address
        }));
      },
      onConnection : async (status)=>{
        const profile = await _carrier.getSelfInfo();
        if(status === Carrier.config.CONNECTION_STATUS.CONNECTED){
          dm.dispatch(dm.action.me_set({
            online : true,
            profile
          }));
        }
        else if(status === Carrier.config.CONNECTION_STATUS.DISCONNECTED){
          dm.dispatch(dm.action.me_set({
            online : false
          }));
        }
      },
      onFriends : (list)=>{
        const param = {};
        _.each(list, (item)=>{
          param[item.userId] = item;
        });
        dm.dispatch(dm.action.friends_all_set(param));
      },
      onFriendAdded : (list)=>{
        const param = {};
        _.each(list, (item)=>{
          param[item.userId] = item;
        });
        dm.dispatch(dm.action.friends_all_set(param));
      },
      onFriendRequest : (data)=>{
        const param = {};
        param[data.userId] = {
          ...data.userInfo,
          userId : data.userId,
          msg : data.msg
        };
        dm.dispatch(dm.action.friends_wait_set(param));
      },
      onFriendConnection : (data)=>{
        const param = {};
        param[data.friendId] = {
          status : data.status
        };

        dm.dispatch(dm.action.friends_all_set(param));

        if(!dm.method.session.isConnect(data.friendId)){
          const cache = friendCache[data.friendId] || {};
          friendCache[data.friendId] = cache;
          
          dm.method.session.createSession(data.friendId).then(()=>{
            cache.ready = true;
            if(cache.replyCB){
              cache.replyCB();
            }
          });
        }
      },
      onFriendPresence : (data)=>{
        const param = {};
        param[data.friendId] = {
          presence : data.presence
        };

        dm.dispatch(dm.action.friends_all_set(param));
      },
      onFriendInfoChanged : (data)=>{
        const param = {};
        param[data.userId] = data;

        dm.dispatch(dm.action.friends_all_set(param));
      },
      onFriendMessage : (data)=>{
        if(data.message.indexOf(config.STREAM_HANDSHACK_RANDOM) === 0){
          const random = data.message.split(':')[1];
          F.sessionHandshackCallback(dm, data.userId, random);
          return false;
        }

        const param = {
          type : 'to',
          userId : data.userId,
          time : Date.now(),
          content : data.message,
          contentType : 'text'
        };

        dm.dispatch(dm.action.message_add(param));
      },
      onSessionRequest : (data)=>{
        console.log(444, data);
        const { friendId } = data;

        const cache = friendCache[data.friendId] || {};
        friendCache[data.friendId] = cache;
        
        let loop = ()=>{
          _.delay(()=>{
            
            // if not delay, have an error happen
            console.log(11111111)
            dm.method.session.sessionReplyRequest(friendId).catch(()=>{});
            loop = ()=>{};
          }, 500);
        };

        if(cache.ready){
          console.log(2222222)
          loop();
        }
        else{
          console.log(3333333)
          cache.replyCB = loop;
        }
      },
      onStateChanged : (data)=>{
        const param = {};
        param[data.friendId] = {
          state : data.state
        };
        
        dm.dispatch(dm.action.friends_all_set(param));
        
        if(data.state === 1){
          F.sessionHandshack(dm, data.friendId);        
        }
      },
      onStreamData : (data)=>{
        const fid = data.friendId;
        // console.log(555, data.text);

        // TODO
        if(data.text === config.STREAM_IMAGE_MESSAGE_START){
          streamCache[fid] = '';
        }
        else if(config.STREAM_IMAGE_MESSAGE_END_REG.test(data.text)){
          const all = streamCache[fid]+data.text.replace(config.STREAM_IMAGE_MESSAGE_END, '');
          console.log(333, all.length);
          const param = {
            type : 'to',
            userId : fid,
            time : Date.now(),
            contentType : 'image',
            content : all
          };
          dm.dispatch(dm.action.message_add(param));

          streamCache[fid] = null;
        }
        else{
          streamCache[fid] += data.text;
        }
        
      }
    };
  }
};
export default (dm)=>{
  return {
    async start(){
      // try{
      //   const tmp = new Carrier('carrier_demo', {});
      //   await tmp.close();
      // }catch(e){
      //   console.log(111, e);
      // }
      

      _carrier = new Carrier('carrier_demo', F.buildCallback(dm));
      await _carrier.start();
    },
    getCarrier(){
      if(!_carrier){
        throw 'carrier not started';
      }
      return _carrier;
    },
    getCarrierConfig(){
      return Carrier.config;
    },




    me : me(dm),
    friends : friends(dm),
    message : messgae(dm),
    session : session(dm)
  };
};