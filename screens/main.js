import Paho from "paho-mqtt";

import { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Switch, View, Alert, Image, ImageBackground } from 'react-native';
import RNSpeedometer from 'react-native-speedometer';

client = new Paho.Client(
  "camera-sys.ddns.net",
  Number(9001),
  `mqtt-async-test-${parseInt(Math.random() * 100)}`
);



export default function Main() {

  const [switchValue_entrance, setSwitchValue_entrance] = useState(false);
  const [switchValue_garage, setSwitchValue_garage] = useState(false);
  const [switchValue_perimeter, setSwitchValue_perimeter] = useState(false);
  const [connected, setValue_connected] = useState();
  const [image_entrance, setImage_entrance] = useState("0");
  const [image_garage, setImage_garage] = useState("0");
  const [image_perimeter, setImage_perimeter] = useState("0");
  const [meterValue, setMeterValue] = useState();
  const [meterValue_out, setMeterValue_out] = useState();


  const toggleSwitch_entrance = (value_entrance) => {
    //To handle switch toggle
    //console.log(connected);
    if (connected === "yes") {
      setSwitchValue_entrance(value_entrance);
      //console.log(value_entrance)
      if (value_entrance === true) {
        changeValue_entrance(client);

      } else {
        changeValue0_entrance(client);
      }
    } else {
      Alert.alert("not connected");
    }
    //State changes according to switch
  };


  const toggleSwitch_garage = (value_garage) => {
    if (connected === "yes") {
      setSwitchValue_garage(value_garage);
      //console.log(value_garage)
      if (value_garage === true) {
        changeValue_garage(client);

      } else {
        changeValue0_garage(client);
      }
    } else {
      Alert.alert("not connected");
    }
    //State changes according to switch
  };

  const toggleSwitch_perimeter = (value_perimeter) => {
    if (connected === "yes") {
      setSwitchValue_perimeter(value_perimeter);
      //console.log(value_perimeter)
      if (value_perimeter === true) {
        changeValue_perimeter(client);

      } else {
        changeValue0_perimeter(client);
      }
    } else {
      Alert.alert("not connected");
    }
    //State changes according to switch
  };


  function onMessage(message) {

    if (message.destinationName === "switch_1") {

      if (message.payloadString === "1") {

        setImage_entrance("1");
      }
      if (message.payloadString === "0") {

        setImage_entrance("0");
      }
    }

    if (message.destinationName === "switch_2") {
      if (message.payloadString === "1") {

        setImage_garage("1");
      }
      if (message.payloadString === "0") {

        setImage_garage("0");
      }
    }


    if (message.destinationName === "switch_3") {
      if (message.payloadString === "1") {

        setImage_perimeter("1");
      }

      if (message.payloadString === "0") {

        setImage_perimeter("0");
      }
    }
    if (message.destinationName === "temperature") {
      setMeterValue(message.payloadString)
    }
    if (message.destinationName === "temperature1") {
      setMeterValue_out(message.payloadString)
    }
  }

  useEffect(() => {
    client.connect({
      onSuccess: () => {
        console.log("Connected!!");
        client.subscribe("switch_1");
        client.subscribe("switch_2");
        client.subscribe("switch_3");
        client.subscribe("temperature");
        client.subscribe("temperature1");
        client.onMessageArrived = onMessage;
        //value_entrance="yes";
        setValue_connected("yes");
      },
      onFailure: () => {
        //value_entrance="no";
        setValue_connected("no");
        console.log("Failed to connect!");
      }
    });
  }, [])

  function changeValue_entrance(c) {
    const message = new Paho.Message("1");
    message.destinationName = "switch_1";
    c.send(message);
  }

  function changeValue0_entrance(c) {
    const message = new Paho.Message("0");
    message.destinationName = "switch_1";
    c.send(message);
  }

  function changeValue_garage(c) {
    const message = new Paho.Message("1");
    message.destinationName = "switch_2";
    c.send(message);
  }

  function changeValue0_garage(c) {
    const message = new Paho.Message("0");
    message.destinationName = "switch_2";
    c.send(message);
  }

  function changeValue_perimeter(c) {
    const message = new Paho.Message("1");
    message.destinationName = "switch_3";
    c.send(message);
  }

  function changeValue0_perimeter(c) {
    const message = new Paho.Message("0");
    message.destinationName = "switch_3";
    c.send(message);
  }



  return (
    <ImageBackground imageStyle={{ opacity: 0.5 }} source={require('../assets/abstract.jpg')} style={styles.backgroundImage}>
      <View style={{ flex: 1, marginHorizontal: 0, paddingRight: 230 }}>
        <RNSpeedometer
          value={meterValue}
          //value for Speedometer
          size={100}
          //Size of Speedometer
          minValue={0}
          //Min value for Speedometer
          maxValue={50}
          //Max value for Speedometer
          allowedDecimals={1}
          //Decimals value allowed or not


          labels={[
            {
              name: 'Cold',
              labelColor: '#2200ff',
              activeBarColor: '#2200ff',
            },
            {
              name: 'Comfy',
              labelColor: '#00ff6b',
              activeBarColor: '#00ff6b',
            },
            {
              name: 'Hot',
              labelColor: '#ff0000',
              activeBarColor: '#ff0000',
            },
          ]}
        //Labels for the different steps of Speedometer
        />
      </View>
      <View style={{ marginHorizontal: 0, paddingLeft: 230 }}>
        <RNSpeedometer
          value={meterValue_out}
          //value for Speedometer
          size={100}
          //Size of Speedometer
          minValue={0}
          //Min value for Speedometer
          maxValue={50}
          //Max value for Speedometer
          allowedDecimals={1}
          //Decimals value allowed or not


          labels={[
            {
              name: 'Cold',
              labelColor: '#2200ff',
              activeBarColor: '#2200ff',
            },
            {
              name: 'Comfy',
              labelColor: '#00ff6b',
              activeBarColor: '#00ff6b',
            },
            {
              name: 'Hot',
              labelColor: '#ff0000',
              activeBarColor: '#ff0000',
            },
          ]}
        //Labels for the different steps of Speedometer
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.text_entrance_description}>Entrance</Text>
        {image_entrance === '0' && <Image style={{ width: 50, height: 50, margin: 10 }} source={require('../assets/off.png')} />}
        {image_entrance === '1' && <Image style={{ width: 50, height: 50, margin: 10 }} source={require('../assets/on.png')} />}
        <Switch style={styles.switch_entrance} onValueChange={toggleSwitch_entrance} value={switchValue_entrance} />

        <Text style={styles.text_garage_description}>Garage</Text>
        {image_garage === '0' && <Image style={{ width: 50, height: 50, margin: 10 }} source={require('../assets/off.png')} />}
        {image_garage === '1' && <Image style={{ width: 50, height: 50, margin: 10 }} source={require('../assets/on.png')} />}
        <Switch style={styles.switch_garage} onValueChange={toggleSwitch_garage} value={switchValue_garage} />

        <Text style={styles.text_perimeter_description}>Perimeter</Text>
        {image_perimeter === '0' && <Image style={{ width: 50, height: 50, margin: 10 }} source={require('../assets/off.png')} />}
        {image_perimeter === '1' && <Image style={{ width: 50, height: 50, margin: 10 }} source={require('../assets/on.png')} />}
        <Switch style={styles.switch_perimeter} onValueChange={toggleSwitch_perimeter} value={switchValue_perimeter} />
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({

  container: {
    //flex: 1,
    //backgroundColor: '#b6cdf3',
    alignItems: 'center',
    //justifyContent: "flex-start",
    padding: 20

  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'

  },
  text_entrance_description: {
    justifyContent: "center",
    padding: 20,
    fontSize: 24
  },

  text_garage_description: {
    justifyContent: "center",
    padding: 20,
    fontSize: 24
  },

  text_perimeter_description: {
    justifyContent: "center",
    padding: 20,
    fontSize: 24
  },

  switch_entrance: {
    //margin:5,
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }]
  },
  switch_garage: {
    //margin:140,
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }]
  },
  switch_perimeter: {
    //margin:140,
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }]
  },

});
