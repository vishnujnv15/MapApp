project(':react-native-geo-fencing').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-geo-fencing/android')
import React, { Component } from 'react';
import {
 TouchableOpacity,
 Dimensions,
 AppRegistry,
 StyleSheet,
 Text,
 View
} from 'react-native';
import MapView from 'react-native-maps'

var { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

class MapApp extends React.Component {
 constructor(){
   super();
   return {
      region: {
        latitude: 19.0760,
        longitude: 72.8777,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01* ASPECT_RATIO,
      },
    };
 }

 _findMe(){
   navigator.geolocation.getCurrentPosition(
     ({coords}) => {
       const {latitude, longitude} = coords
       this.setState({
         position: {
           latitude,
           longitude,
         },
         region: {
           latitude,
           longitude,
           latitudeDelta: 0.005,
           longitudeDelta: 0.001,
         }
       })
     },
     (error) => alert(JSON.stringify(error)),
     {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
   )
 }
 componentDidMount() {
     navigator.geolocation.getCurrentPosition(
       ({coords}) => {
         const {latitude, longitude} = coords
         this.setState({
           position: {
             latitude,
             longitude,
           },
           region: {
             latitude,
             longitude,
             latitudeDelta: 0.005,
             longitudeDelta: 0.001,
           }
         })
       },
       (error) => alert('Error: Are location services on?'),
       {enableHighAccuracy: true}
     );
     this.watchID = navigator.geolocation.watchPosition(
       ({coords}) => {
         const {lat, long} = coords
         this.setState({
           position: {
             lat,
             long
           }
         })
     });
   }
   componentWillUnmount() {
     navigator.geolocation.clearWatch(this.watchID);
   }
 render() {
   const { height: windowHeight } = Dimensions.get('window');
   const varTop = windowHeight - 125;
   const hitSlop = {
     top: 15,
     bottom: 15,
     left: 15,
     right: 15,
   }
   bbStyle = function(vheight) {
     return {
       position: 'absolute',
       top: vheight,
       left: 10,
       right: 10,
       backgroundColor: 'transparent',
       alignItems: 'center',
     }
   }
   return(
     <View style={styles.container}>
       <View style={bbStyle(varTop)}>
         <TouchableOpacity
           hitSlop = {hitSlop}
           activeOpacity={0.7}
           style={styles.mapButton}
           onPress={ () => this._findMe() }
         >
             <Text style={{fontWeight: 'bold', color: 'black',}}>
               Find Me
             </Text>
         </TouchableOpacity>
       </View>
       <MapView
         style={styles.map}
         region={this.state.region}
         showsUserLocation={true}
       >
       </MapView>
     </View>
   );
 }
}


const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#EEEEEE',
 },
 text: {
   color: 'white',
 },
   map: {
   flex: 1,
   zIndex: -1, 
 },
 mapButton: {
   width: 75,
   height: 75,
   borderRadius: 85/2,
   backgroundColor: 'rgba(252, 253, 253, 0.9)',
   justifyContent: 'center',
   alignItems: 'center',
   shadowColor: 'black',
   shadowRadius: 8,
   shadowOpacity: 0.12,
   opacity: .6,
   zIndex: 10,
},
})
AppRegistry.registerComponent('MapApp', () => MapApp);