import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  elaAmout : {
    marginBottom : 30,
    textAlign: 'center'
  },
  elaPublicAddress : {
    marginBottom : 30,
    textAlign: 'center',
  },
  list: {
    flex: 1,
    marginTop : 10,
    marginLeft: 20,
    marginRight: 20
  },
  text : {
    
  },
  textbox: {
    borderColor: 'black',
    textAlign: 'left',
    height: 50,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 5,
    borderBottomWidth: 1
  },

  item : {
    flex : 1,
    flexDirection: 'column',
    marginBottom : 10
  }
});

export default styles;
