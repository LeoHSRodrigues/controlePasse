import React from "react";
import { View } from "react-native";
import { Header, Text, Button, Icon, Card, Image } from "react-native-elements";
import { Calendar } from "react-native-general-calendars";
import Moment from "moment";
import localization from "moment/locale/pt-br";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor() {
    super();
    Moment.updateLocale("pt-br", localization);
    var date = new Date().toISOString().split("T")[0];
    dateString = date;
    this.state = {
      selected: date,
      datafinal: date
    };
  }

  render() {
    return (
      <View style={{ backgroundColor: "#121212" }}>
        <Header
          backgroundColor={"#121212"}
          centerComponent={{
            text: "Sistema de Controle de Passes",
            style: { color: "#fff" }
          }}
        />

        <View
          style={{
            // flex: 1,
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          <View style={{ width: 200, height: 150, backgroundColor: "#121212" }}>
            <Card 
            title="Passes Restantes" 
            titleStyle={{ color: "#ffffff" }} 
            containerStyle={{backgroundColor:'#1F1A24', borderColor:'#1F1A24'}}
            >
              <Text
                style={{
                  marginBottom: 10,
                  textAlign: "center",
                  color: "#ffffff"
                }}
              >
                20
              </Text>
            </Card>
          </View>
          <View style={{ width: 200, height: 150, backgroundColor: "#121212" }}>
            <Card 
            title="Total de Passes" 
            titleStyle={{ color: "#ffffff" }} 
            containerStyle={{backgroundColor:'#1F1A24', borderColor:'#1F1A24'}}
            >
              <Text
                style={{
                  marginBottom: 10,
                  textAlign: "center",
                  color: "#ffffff"
                }}
              >
                54
              </Text>
            </Card>
          </View>
        </View>

        <View>
          <Calendar
            theme={{
              calendarBackground: "#1F1A24",
              selectedDayTextColor: "#ffffff",
              todayTextColor: "#ffffff",
              dayTextColor: "#ffffff",
              textDisabledColor: "#484848",
              monthTextColor: "#ffffff"
            }}
            markedDates={{
              [this.state.selected]: {
                selected: true,
                disableTouchEvent: true,
                selectedDotColor: "orange"
              }
            }}
            maxDate={this.state.datafinal}
            onDayPress={day => {
              console.log(this.state.selected);
              this.setState({
                selected: day.dateString
              });
            }}
            onDayLongPress={day => {}}
          />
        </View>
        <View style={{ paddingTop: 30, backgroundColor: "#121212" }}>
          <Card
            title="Passes e linhas usadas no dia"
            titleStyle={{ color: "#ffffff" }}
            containerStyle={{backgroundColor:'#1F1A24', borderColor:'#1F1A24'}}
          >
            <Text
              style={{
                marginBottom: 10,
                textAlign: "center",
                color: "#ffffff"
              }}
            >
              54
            </Text>
          </Card>
        </View>
      </View>
    );
  }
}
