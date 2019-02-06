import {util} from 'CR';
import Component from './Component';
import dm from '../../data';
import ImagePicker from 'react-native-image-picker';


export default util.createContainer(Component, (state)=>{
  const current = state.message.target;
  const info = dm.method.message.getUserInfo(current);
  console.log(111, info)
  return {
    all : state.message.all,
    current,
    info,
    list : state.message.all[current]
  };
}, ()=>{
  return {
    async sendText(userId, text){
      await dm.method.message.sendTextMessage(userId, text);
      
    },
    async sendStream(userId, type, content){
      if(!dm.method.session.isConnect(userId)){
        alert('session not connected');
        return;
      }
      await dm.method.message.sendStreamMessage(userId, type, content);
    },
    removeTarget(){
      dm.dispatch(dm.action.message_target(null));
    },
    removeUnread(userId){
      dm.dispatch(dm.action.message_unread(userId));
    },

    showSelectImageBox(callback){



      const options = {
        title: 'Select Images',
        // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
      
      ImagePicker.showImagePicker(options, (response) => {
        // console.log('Response = ', response);
      
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          // const source = { uri: response.uri };
          const path = 'data:image/png;base64,'+response.data;

          callback(true, path);
        }
      });
    }
  };
});