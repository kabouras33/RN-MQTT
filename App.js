// In App.js in a new project

import * as React from 'react';
import { View, Text,StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './screens/main';
import Settings from './screens/settings';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Camera from './screens/camera';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer headerStyle="white">
      <Tab.Navigator screenOptions={{
       tabBarStyle: { backgroundColor: "#a05684",color: 'red' },
       
    }}>
        <Tab.Screen  name="Home" component={Main} options={({route}) => ({
         headerStyle: {
          backgroundColor: '#a05684'
       },
         headerTitleAlign:"center",
         headerTitleStyle: {
          fontWeight: 'bold',
          color:"white"
        },
        tabBarActiveTintColor:"#bdeb08",
        tabBarInactiveTintColor:"white",
          tabBarIcon: ({color, size}) => (
            <Ionicons
              name="md-home"
              color={color}
              size={size}/>
              ),
            })}/>
            <Tab.Screen name="Camera" component={Camera} options={({route}) => ({
         // tabBarVisible: getTabBarVisibility(route),
         headerStyle: {
          backgroundColor: '#a05684'
       },
         headerTitleAlign:"center",
         headerTitleStyle: {
          fontWeight: 'bold',
          color:"white"
        },
        tabBarActiveTintColor:"#bdeb08",
        tabBarInactiveTintColor:"white",
          tabBarIcon: ({color, size}) => (
            <Ionicons
              name="md-camera"
              color={color}
              size={size}/>
              ),
            })}/>
        <Tab.Screen name="Settings" component={Settings} options={({route}) => ({
         headerStyle: {
          backgroundColor: '#a05684'
       },
         headerTitleAlign:"center",
         headerTitleStyle: {
          fontWeight: 'bold',
          color:"white"
        },
        tabBarActiveTintColor:"#bdeb08",
        tabBarInactiveTintColor:"white",
          tabBarIcon: ({color, size}) => (
            <Ionicons
              name="md-settings"
              color={color}
              size={size}/>
              ),
            })}/>
            
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles=StyleSheet.create({
navi:{
  flex:1,
  textAlign:"center",
  width:"auto"
}

});