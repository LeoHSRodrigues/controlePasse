import React from 'react';
import {View} from 'react-native';
import {Header,Text} from 'react-native-elements';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    return (
      <View>
      <Header backgroundColor={"#2d603f"}
      centerComponent={{ text: 'Sistema de Controle de Passes', style: { color: '#fff' } }}
      />
      <Text>Teste</Text>
      </View>
    )
}
}

