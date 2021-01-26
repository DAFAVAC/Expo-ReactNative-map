import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button} from "react-native";
import * as Location from "expo-location";
import MapView  from 'react-native-maps';


export default function App() {

  

  const [position, setPosition] = useState(null);



  const getPosition = async () => {
    try {
      const { coords } = await Location.getCurrentPositionAsync({});
      setPosition(coords);
    } catch (error) {
      console.log("getPosition -> error", error);
      setPosition(null);
    }
  };



  const entryPoint = async () => {
    try {
      const { status } = await Location.requestPermissionsAsync();
      if (status === "granted") {
        getPosition();
      }
    } catch (error) {
      console.log("getPermissionAndPosition -> error", error);
    }
  };

  useEffect(() => {
    entryPoint();
  }, []);





  return (
    <View style={styles.container}>
      

      
      {(position && (
        <View>
                           <View style={styles.container}>
                            <MapView style={styles.map}     initialRegion={{
                                  latitude: position.latitude,
                                  longitude:  position.longitude,
                                  latitudeDelta: 0.00922,
                                  longitudeDelta: 0.00421,
                            }}/>
                            </View>
          <View>
            <Text>Latitude: {position.latitude}</Text>
          </View>
          <View>
            <Text>Longitude: {position.longitude} </Text>
          </View>
              
          <View>
            <Button title="Refresh" onPress={getPosition} />
          </View>
          
        </View>
        
      )) || (
        <View>
          <Text>GPS Unavailable!</Text>
        </View>
      )}
      <StatusBar style="auto" />
      
    </View>
    
  );
}







const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: 410,
    height: 550,
    bottom:0
  },
  input:{
  height:40,
  width:200,
  borderColor:"#ccc",
  borderWidth:2,
  marginBottom:40
  },
  textArea:{
  height:60,
  fontSize:18 
  },
  title:{
    textAlign:"center",
    bottom:15
  },
  button:{
    backgroundColor:'skyblue',
    paddingTop:15,
    paddingBottom:15
  },
  textBotton:{
    textAlign:"center",
    color:"#000"
  }
  

});