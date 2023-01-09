import React, { Component } from 'react';
import { SafeAreaView } from "react-native";
import { WebView } from 'react-native-webview';

function Camera (){
  
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <WebView 
          source={{ uri: 'http://...:8081/' }} 
        />
      </SafeAreaView>
    );
  
}
export default Camera;
