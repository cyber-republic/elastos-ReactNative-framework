export default (dm)=>{
  return {
    async sendAddRequest(address, message){
      const carrier = dm.method.getCarrier();
      const rs = await carrier.addFriend(address, message);
      return rs;
    },
    async setLabel(friendId, label){
      const carrier = dm.method.getCarrier();
      await carrier.setLabel(friendId, label);
      const info = await carrier.getFriendInfo(friendId);
      const param = {};
      param[friendId] = info;
      dm.dispatch(dm.action.friends_all_set(param));
    },
    async acceptFriend(friendId){
      const carrier = dm.method.getCarrier();
      await carrier.acceptFriend(friendId);

      dm.dispatch(dm.action.friends_wait_remove(friendId));
      await dm.method.friends.getFriendList();
      return true;
    },
    async getFriendList(){
      const carrier = dm.method.getCarrier();
      const list = await carrier.getFriendList();

      const param = {};
      _.each(list, (item)=>{
        param[item.userId] = item;
      });
      dm.dispatch(dm.action.friends_all_set(param));
    }
  };
};