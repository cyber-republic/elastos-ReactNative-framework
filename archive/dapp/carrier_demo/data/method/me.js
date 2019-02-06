export default (dm)=>{
  return {
    async changeProfile(profile){
      const carrier = dm.method.getCarrier();
      await carrier.setSelfInfo(profile);
      const info = await carrier.getSelfInfo();
      dm.dispatch(dm.action.me_set({
        profile : info
      }));
    }
  };
};