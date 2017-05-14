import React,{Component} from 'react';
import TimerMixin from 'react-timer-mixin';
import { AppRegistry,View,Text,AsyncStorage,StyleSheet,ToastAndroid}from 'react-native';




export default class DataScreen extends React.Component{
    constructor(){
        super();
        this.state={
            enter_label:'Enter Time',
            enter_time:'unknown',
            exit_label:'Exit Time',
            exit_time:'unnown'
        }
        
    }

    componentDidMount() {
        TimerMixin.setInterval(             // to dynamcally update the values
            () => {
                AsyncStorage.getItem("enter_time")
                .then((value) => {
                    enter_time=value;
                    this.setState({enter_time});
                }).done();
                AsyncStorage.getItem("exit_time")
                .then((value) => {
                    exit_time=value;
                    this.setState({exit_time});
                }).done();
            },
        1000
        );
    }

    static navigationOptions={
        title:'Data'
    };
    render(){
        return(
            <View style={{flex:1}}>
                <View style={styles.container}>
                    <View style={styles.row}>
                        <Text style = {styles.text}>
                            {this.state.enter_label}
                        </Text>
                        <Text style = {styles.text}>
                            {this.state.enter_time}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style = {styles.text}>
                            {this.state.exit_label}
                        </Text>
                        <Text style = {styles.text}>
                            {this.state.exit_time}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create ({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40
   },
   row:{
       margin:40,
       flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
   },
   text: {
      flex: 1,
      fontWeight: 'bold'
   },
});
AppRegistry.registerComponent('DataScreen', () => DataScreen);