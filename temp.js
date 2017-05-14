
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  AsyncStorage,
  ToastAndroid,
  TouchableOpacity,
  TouchableHighlight,
  Button,
  View
} from 'react-native';
import MapView from 'react-native-maps';
import GeoFencing from 'react-native-geo-fencing';
import TimerMixin from 'react-timer-mixin';
import {TabNavigator} from 'react-navigation';
import DataScreen from './Components/DataScreen';
import {NotificationsAndroid} from 'react-native-notifications';


class MapScreen extends React.Component{
  constructor(){
  super();
  this.state={
        mixins: [TimerMixin],
        initialPosition: 'unknown',
        lastPosition: 'unknown',
        current:{
          longitude:0,
          latitude:0
        },
        radius:0.043496,
        fence:[],
        initiallatitude:0,
        initiallongitude:0,

        color:'33FFFF',
        markers: {
            title: 'hello',
            coordinates: {
              longitude: 101.652778,
              latitude: 3.148561
              
            },
          },
          
      polygon:[
      {latitude:0,longitude:0},
      {latitude:0,longitude:0},
      {latitude:0,longitude:0},
      {latitude:0,longitude:0},
      {latitude:0,longitude:0},
      {latitude:0,longitude:0},
      {latitude:0,longitude:0},
      {latitude:0,longitude:0},
      {latitude:0,longitude:0},
      {latitude:0,longitude:0},
      {latitude:0,longitude:0},
      {latitude:0,longitude:0},
      {latitude:0,longitude:0}
        ],
    
      enter:false,
            
    }
}


calculateCoordinates(coordinates){
  let R=this.state.radius;
  lat=coordinates.latitude;
  lng=coordinates.longitude;
  let fence=this.state.fence;
  ////////////////////////////////
  let d2r=Math.PI/180;
  let r2d=180/Math.PI;
  let earthradius=3963;
  let rlat=(R/earthradius)*r2d;
  let rlng=rlat/Math.cos(lat*d2r);

  for(let i=0;i<12;i++ ){
    let theta=Math.PI*(i/6);
    d_lng=(rlng*Math.cos(theta));
    d_lat=(rlat*Math.sin(theta));
    fence.push({id:'dlat'+(i+1),key:d_lat});
    fence.push({id:'dlng'+(i+1),key:d_lng});
  }
  this.setState({fence});
  //ToastAndroid.showWithGravity('here',ToastAndroid.SHORT,ToastAndroid.BOTTOM)
}

clickMarker(value){
  coordinates=value.coordinate;
  this.setState({markers:{coordinates}});
  this.calculateCoordinates(coordinates);
  let fence=this.state.fence;


  
  polygon=[
      {latitude:value.coordinate.latitude+fence[0].key,longitude:value.coordinate.longitude+fence[1].key},
      {latitude:value.coordinate.latitude+fence[2].key,longitude:value.coordinate.longitude+fence[3].key},
      {latitude:value.coordinate.latitude+fence[4].key,longitude:value.coordinate.longitude+fence[5].key},
      {latitude:value.coordinate.latitude+fence[6].key,longitude:value.coordinate.longitude+fence[7].key},
      {latitude:value.coordinate.latitude+fence[8].key,longitude:value.coordinate.longitude+fence[9].key},
      {latitude:value.coordinate.latitude+fence[10].key,longitude:value.coordinate.longitude+fence[11].key},
      {latitude:value.coordinate.latitude+fence[12].key,longitude:value.coordinate.longitude+fence[13].key},
      {latitude:value.coordinate.latitude+fence[14].key,longitude:value.coordinate.longitude+fence[15].key},
      {latitude:value.coordinate.latitude+fence[16].key,longitude:value.coordinate.longitude+fence[17].key},
      {latitude:value.coordinate.latitude+fence[18].key,longitude:value.coordinate.longitude+fence[19].key},
      {latitude:value.coordinate.latitude+fence[20].key,longitude:value.coordinate.longitude+fence[21].key},
      {latitude:value.coordinate.latitude+fence[22].key,longitude:value.coordinate.longitude+fence[23].key},
      {latitude:value.coordinate.latitude+fence[0].key,longitude:value.coordinate.longitude+fence[1].key},
       
    ]
    //for(let i=0;i<24;i=i+2){
      //polygon.push({latitude:value.coordinate.latitude+fence[i].key,longitude:value.coordinate.longitude+fence[i+1].key});
   // }
    
    this.setState({polygon});
      //ToastAndroid.showWithGravity(JSON.stringify(this.state.polygon),ToastAndroid.SHORT,ToastAndroid.BOTTOM)


}


createGeofence(value){
  //this.setData(true);
  //this.fireNotifications('message');
//ToastAndroid.showWithGravity('Created Geofence',ToastAndroid.SHORT,ToastAndroid.BOTTOM)
TimerMixin.clearInterval
enter=false;
this.setState({enter});

  let fence=this.state.fence;
      const geofence = [
        { lat: value.latitude+fence[0].key, lng: value.longitude+fence[1].key},
        { lat: value.latitude+fence[2].key, lng: value.longitude+fence[3].key},
        { lat: value.latitude+fence[4].key, lng: value.longitude+fence[5].key},
        { lat: value.latitude+fence[6].key, lng: value.longitude+fence[7].key},
        { lat: value.latitude+fence[8].key, lng: value.longitude+fence[9].key},
        { lat: value.latitude+fence[10].key, lng: value.longitude+fence[11].key},
        { lat: value.latitude+fence[12].key, lng: value.longitude+fence[13].key},
        { lat: value.latitude+fence[14].key, lng: value.longitude+fence[15].key},
        { lat: value.latitude+fence[16].key, lng: value.longitude+fence[17].key},
        { lat: value.latitude+fence[18].key, lng: value.longitude+fence[19].key},
        { lat: value.latitude+fence[20].key, lng: value.longitude+fence[21].key},
        { lat: value.latitude+fence[22].key, lng: value.longitude+fence[23].key},
        { lat: value.latitude+fence[0].key, lng: value.longitude+fence[1].key} // last point has to be same as first point
      ];
  TimerMixin.setInterval(
      () => {

  //ToastAndroid.showWithGravity(JSON.stringify(value),ToastAndroid.SHORT,ToastAndroid.BOTTOM); 
    
    
    let point = {
        lat: this.state.current.latitude,
        lng:this.state.current.longitude
      };
 /*   const polygonn = [
      { lat: point.lat-0.0000803, lng: point.lng-0.000017 },
      { lat: point.lat+0.0000803, lng: point.lng-0.000017 },
      { lat: point.lat+0.0000803, lng: point.lng+0.000017 },
      { lat: point.lat-0.0000803, lng: point.lng+0.000017 } // last point has to be same as first point
    ];  */
    
      //ToastAndroid.showWithGravity(JSON.stringify(point),ToastAndroid.SHORT,ToastAndroid.BOTTOM);
  
    GeoFencing.containsLocation(point, geofence)
      .then(() => {
        if(!this.state.enter){
          //ToastAndroid.showWithGravity('Entering Geofence',ToastAndroid.SHORT,ToastAndroid.BOTTOM)
          enter=true;
          this.setState({enter});
          this.setData(enter);
          this.fireNotifications('Entering Geofence');
        }
      })
      .catch(() => {
        
        if(this.state.enter){
          //ToastAndroid.showWithGravity('Exiting Geofence',ToastAndroid.SHORT,ToastAndroid.BOTTOM)
          enter=false;
          this.setState({enter});
          this.setData(enter);
          this.fireNotifications('Exiting Geofence');
        }
        
      })

     },
      8000
    );

}

fireNotifications(message){
  NotificationsAndroid.localNotification({
      title: "GeoFence",
      body: message,
  });
}

setData(enter){
  curTime= new Date(new Date().getTime()).toLocaleString();
  if(enter){
    AsyncStorage.clear();
    AsyncStorage.setItem("enter_time", curTime);
    
  }
  else{
    AsyncStorage.setItem("exit_time", curTime);
  }
}

setRadius(value){
    radius=value*0.000621371;
    this.setState({radius});    
    ToastAndroid.showWithGravity(JSON.stringify(this.state.radius),ToastAndroid.SHORT,ToastAndroid.BOTTOM)


}
  componentDidMount() {
    //AsyncStorage.clear();
    let polygon=this.state.polygon;
    for(let i=0;i<24;i=i+2){
      polygon.push({latitude:0,longitude:0});
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        initialPosition = JSON.stringify(position);
        initiallatitude=position.coords.latitude;
        initiallongitude=position.coords.longitude;
        current={longitude:position.coords.longitude,
                latitude:position.coords.latitude 
              }
        this.setState({initiallatitude});
        this.setState({initiallongitude});
        this.setState({initialPosition});
        this.setState({current});
        ToastAndroid.showWithGravity('success',ToastAndroid.SHORT,ToastAndroid.BOTTOM);
       ToastAndroid.showWithGravity(JSON.stringify(position),ToastAndroid.SHORT,ToastAndroid.BOTTOM);
        
        
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      ToastAndroid.showWithGravity('changed',ToastAndroid.SHORT,ToastAndroid.BOTTOM);
       lastPosition = JSON.stringify(position);
       current={longitude:position.coords.longitude,
                latitude:position.coords.latitude 
              }
      this.setState({current});
      this.setState({lastPosition});

    })
 
}

    componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);

    
  }
  static navigationOptions={
    title:'Map'
  };
  render(){
    
    return(
      <View style={styles.container}>
        <View style={{flex:1,justifyContent:'center',alignContent:'center',paddingBottom:20}}>
            <View>
              <MapView style={styles.map}
              
                /*region={{
                  latitude: this.state.initiallatitude,
                  longitude: this.state.initiallongitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}*/
                onPress={e => this.clickMarker(e.nativeEvent)}
                initialPosition={this.state.initialPosition}
                lastPosition={this.state.lastPosition}
                showsUserLocation = {true}
                followsUserLocation={true}
                showsCompass={true}
                zoomEnabled = {true}
                loadingEnabled={true}
                showsMyLocationButton = {true}
              >
                  <MapView.Polygon
                    coordinates={this.state.polygon}
                    strokeColor='#00bfff'
                    //fillColor='#e0ffff'
                  />
                  <MapView.Marker
                    coordinate={this.state.markers.coordinates}
                    title={this.state.markers.title}
                    description={this.state.markers.description}
                    
                  />
                  
      
            </MapView>
          </View>
          <View >
           
            <Button
            title='Create Geofence'
            onPress={()=>this.createGeofence(this.state.markers.coordinates)}
            />
          </View>
        </View>
      </View>
    );
  }
}

const MapApp =TabNavigator({
  Map:{screen:MapScreen},
  Data:{screen:DataScreen},
})

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'flex-start',
  },
  map: {
    height:500,
    //margin:20,
    marginLeft:20,
    marginRight:20,
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  button:{
  //  flex:1,

    color:"blue",
    height:30,
    textAlign:'center'
 }
});

AppRegistry.registerComponent('MapApp', () => MapApp);
