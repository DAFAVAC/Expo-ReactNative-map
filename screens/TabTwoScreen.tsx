import { StatusBar } from 'expo-status-bar';
import React , { useState, useEffect }from 'react';
import { StyleSheet, Text, TextInput,Alert, Button , TouchableHighlight, View } from 'react-native';
import * as Location from "expo-location";

export default function App() {
  function alert(){
    Alert.alert(
      "Formulario enviado", "se envio el formulario correctamente",
      [
        {text:"ok",onPress:()=>(console.log("presionado"))},
        {text:"cancel",onPress:()=>(console.log("presionado"))}
      ]
    )
  }



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
    <View>
      <Text style={styles.title}>Formulario NUR</Text>
      <TextInput 
      style={styles.input}
      placeholder="Usuario"
      />
    <TouchableHighlight

    style={styles.button}>
      <Text style={styles.textBotton}
      onPress={alert}>Enviar</Text>
      </TouchableHighlight>
        </View>
        {(position && (
        <View>
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

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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