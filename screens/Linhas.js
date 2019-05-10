import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { SearchBar, Header, Text, ListItem, Icon } from 'react-native-elements';

class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [
      {id:1, title: "Cadastrar Linha",   color:"#FF4500",   image:"./onibus.jpg"},
      {id:2, title: "Excluir Linha",     color:"#87CEEB",   image:"./onibus.jpg"},
      ]
    };
  }

  clickEventListener(item) {
    if (item == "1"){
      this.props.navigation.navigate('CadastroLinha');
    }
    else {
      this.props.navigation.navigate('ApagarLinha');
    }
  }
  
  voltarHome(){
    this.props.navigation.push('Home');
  }

  render() {
    return (
      <View >
      <Header
      leftComponent={{ icon: 'home', color: '#fff', onPress: () => {this.voltarHome()} }}
      centerComponent={{ text: 'Gerenciar Linhas', style: { color: '#fff' } }}
      />
      <FlatList style={styles.list}
      contentContainerStyle={styles.listContainer}
      data={this.state.data}
      horizontal={false}
      numColumns={2}
      keyExtractor= {(item) => {
        return item.id;
      }}
      renderItem={({item}) => {
        return (
          <TouchableOpacity style={[styles.card, {backgroundColor:item.color}]} onPress={() => {this.clickEventListener(item.id)}}>
          <View style={styles.cardHeader}>
          <Text style={styles.title}>{item.title}</Text>
          </View>
          </TouchableOpacity>
          )
        }}/>
        </View>
        );
      }
    }

    class CadastrarLinha extends React.Component {
      state = {
        search: '',
      };

      constructor(props) {
        super(props);
        this.state = {
          data: []
        };
      }
      clickEventListener(item) {
        console.log(item);
      }

      updateSearch = search => {
        this.setState({ search });
        if (search.length.toString() > '1'){
          buscarLinhas(search).then((responseJson) => {
           responseJson.map(function(item) {
            this.setState({
             data:responseJson
           })
         }, this)
       });
     }
     else{
      this.setState({
        data:[]
      })
    }
  };
  voltarHome(){
    this.props.navigation.navigate('Home');
  }

  render() {
    const { search } = this.state;
    return (
      
      
      <View >
      <Header
      leftComponent={{ icon: 'home', color: '#fff', onPress: () => {this.voltarHome()} }}
      centerComponent={{ text: 'Cadastrar Linhas', style: { color: '#fff' } }}
      />
    <Text h4 style={styles.nomeDFTRANS}>Buscar Linha no DFTRANS</Text>
    <SearchBar
    lightTheme
    placeholder="Buscar Linha..."
    onChangeText={this.updateSearch}
    value={search}
    />
    <FlatList style={styles.list}
    data={this.state.data}
    extraData={this.state.data}
    horizontal={false}
    numColumns={1}
    keyExtractor={item => item.numero+(Math.floor(Math.random() * 100) + 1) }
    renderItem={({item}) => {
      return (
      <TouchableOpacity onPress={() => {this.clickEventListener(item.numero)}}>
      <View style={styles.container}>
      <ListItem
        rightIcon={<Icon name={'add'} size={20}/>}
        title={item.numero}
        subtitle={item.descricao}
        />
      </View>
      </TouchableOpacity>
      )
    }}/>    
    </View>
    );
  }
}

class ExcluirLinha extends React.Component {
  render() {
    return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    </View>
    );
  }
}

const RootStack = createStackNavigator(
{
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      header: null,
    },
  },
  CadastroLinha: {
    screen: CadastrarLinha,
    navigationOptions: {
      header: null,
    },
  },
  ApagarLinha: {
    screen: ExcluirLinha,
    navigationOptions: {
      header: null,
    },
  },
},
{
  initialRouteName: 'Home',
}
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  static navigationOptions = {
    header: null,
  };
  render() {
    return <AppContainer />;
  }
}


async function buscarLinhas(search) {
  try {
    let response = await fetch(
      'https://www.sistemas.dftrans.df.gov.br/linha/find/'+search+'/short',
      );
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(error);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginLeft:16,
    marginRight:16,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 5,
    backgroundColor: '#FFF',
},
  list: {
    //paddingHorizontal: 5,
    backgroundColor:"#E6E6E6",
  },
  listContainer:{
    
  },
  nomeDFTRANS:{
    marginTop:20,
    marginBottom:20,
    alignSelf:"center"
  },
  /******** card **************/
  card:{
    padding:15,
    borderBottomWidth: 2,
    marginBottom: 30
  },
  cardHeader: {
    
  },
  cardContent: {
    margin:5
  },
});