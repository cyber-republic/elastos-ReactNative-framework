import {_, plugin} from 'CR';
import config from 'app/config';

const {Carrier} = plugin;

const F = {
  splitStringByChunk(data, size){
    const d = data.split('');
    const arr = _.chunk(d, size);
    return _.map(arr, x=>x.join(''));
  }
};

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

    // type could be "image"
    async sendStreamMessage(userId, type, streamContent){
      const param = {
        type : 'from',
        userId,
        time : Date.now(),
        content : streamContent,
        contentType : type || 'stream'
      };

      dm.dispatch(dm.action.message_add(param));

      // start to send stream
      const arr = F.splitStringByChunk(streamContent, 1024);
      // const list = _.concat(config.STREAM_IMAGE_MESSAGE_START, arr, config.STREAM_IMAGE_MESSAGE_END);

      await dm.method.session.writeStream(userId, config.STREAM_IMAGE_MESSAGE_START);
      for(let i=0, len=arr.length; i<len; i++){
     
        await dm.method.session.writeStream(userId, arr[i]);
      }

      await dm.method.session.writeStream(userId, config.STREAM_IMAGE_MESSAGE_END);

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