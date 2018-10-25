import {plugin} from 'CR';
import me from './me';
import friends from './friends';
import messgae from './message';
import session from './session';

const Carrier = plugin.Carrier;
let _carrier = null;
const F = {
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
        const param = {
          type : 'to',
          userId : data.userId,
          time : Date.now(),
          content : data.message,
          contentType : 'text'
        };

        dm.dispatch(dm.action.message_add(param));
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
      // TODO : when use CMD+R to refresh page in debug mode. how to restart carrier node?

      _carrier = new Carrier('carrier_demo', F.buildCallback(dm));
      await _carrier.start();
    },
    getCarrier(){
      if(!_carrier){
        throw 'carrier not started';
      }
      return _carrier;
    },




    me : me(dm),
    friends : friends(dm),
    message : messgae(dm),
    session : session(dm)
  };
};