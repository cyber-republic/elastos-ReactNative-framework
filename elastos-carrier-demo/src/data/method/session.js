export default (dm)=>{
  return {
    isConnect(friendId){
      const data = dm.store.getState().friends.all[friendId];
      if(!data){
        return false;
      }
      if(!data.state || data.state !== 4){
        return false;
      }

      return true;
    },

    async createSession(friendId){
      const carrier = dm.method.getCarrier();
      const config = dm.method.getCarrierConfig();

      try{
        await carrier.createSession(friendId, config.STREAM_TYPE.TEXT, config.STREAM_MODE.RELIABLE);
      }catch(e){

      }

      return true;
    },
    async sessionRequest(friendId){
      const carrier = dm.method.getCarrier();

      await carrier.sessionRequest(friendId);
    },

    async sessionReplyRequest(friendId){
      const carrier = dm.method.getCarrier();

      await carrier.sessionReplyRequest(friendId, 0, '');
    },

    async writeStream(friendId, data){
      const carrier = dm.method.getCarrier();
      await carrier.writeStream(friendId, data);
    }
  };
};