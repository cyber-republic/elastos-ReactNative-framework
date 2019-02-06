import {_, plugin} from 'CR';


const {Carrier} = plugin;
export default (dm)=>{
  return {
    async sendTextMessage(userId, message){
      const carrier = dm.method.getCarrier();
      const f_info = await carrier.getFriendInfo(userId);
      if(f_info.status !== Carrier.config.CONNECTION_STATUS.CONNECTED){
        throw 'target is offline';
      }

      await carrier.sendMessage(userId, message);

      const param = {
        type : 'from',
        userId,
        time : Date.now(),
        content : message,
        contentType : 'text'
      };

      dm.dispatch(dm.action.message_add(param));
    },
    async sendStreamMessage(userId, streamContent){
      await dm.method.session.writeStream(userId, streamContent);

      const param = {
        type : 'from',
        userId,
        time : Date.now(),
        content : streamContent,
        contentType : 'stream'
      };

      dm.dispatch(dm.action.message_add(param));
    },


    getTotalUnreadNumber(){
      const message_state = dm.store.getState().message;
      let rs = 0;
      _.each(message_state.unread, (item)=>{
        rs += item.num;
      });

      return rs;
    },


    getUserInfo(userId=null){
      const state = dm.store.getState();
      if(!userId){
        return state.me;
      }

      const list = state.friends.all;
      const d = _.find(list, (item)=>{
        return item.userId === userId;
      });
      if(!d){
        throw 'invalid user id : '+userId;
      }
      
      return d;
    }
  };
};