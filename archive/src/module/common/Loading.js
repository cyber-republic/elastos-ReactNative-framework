import React from 'react';
import {Spinner, Container, View} from 'native-base';
import {Style} from 'CR';

export default class extends React.Component{
  render(){
    const p = this._defineMainProperty();
    const sy = Style.create({
      box : {
        backgroundColor : 'rgba(0,0,0,0.3)',
        width : '100%',
        height : '100%',
        top : 0,
        position : 'absolute',
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
      }
    });
    return (
      <Container style={sy.box}>
        <Spinner color={p.color} />
      </Container>
    );
  }

  _defineMainProperty(){
    return {
      color : this.props.color || '#228b22',
    };
  }
}