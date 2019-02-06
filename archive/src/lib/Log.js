import {_} from 'CR';

const Log = class{
  constructor(type){
    this.type = type || 'Unknown';
  }

  info(){
    console.log(`----- [${this.type}] -----`);
    console.log.apply(console, arguments);
    // console.log('\n');
  }

  sign(log){
    console.log(`[${this.type}] ----- ${log} -----`);
  }
};


export default {
  create : (type)=>{
    const L = new Log(type);
    return L;
  }
};