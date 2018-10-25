export default (dm)=>{
  return {
    async createSession(userId){
      const carrier = dm.method.getCarrier();

      await carrier.createSession(userId);
    }
  };
};