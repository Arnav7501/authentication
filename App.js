import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image,ScrollView, Button} from 'react-native';
import {colors} from "./src/constants";
import Keyboard from "./src/components/Keyboard";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import HomeScreen from './HomeScreen';
import Funcwordlescreen from './AboutScreen';
import SightRead from './sightread';
import SignInScreen from './src/screens/SignInScreens/SignInScreen'
import SignUpScreen from './src/screens/SignUpScreens/SignUpScreen';
import ConfirmEmailScreen from './src/screens/ConfirmEmailScreens';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreens/ForgotPasswordScreen';
import NewPasswordScreen from './src/screens/NewPasswordScreens/NewPasswordScreen';
import Navigation from './src/navigation';
import Amplify from 'aws-amplify'
import config from './src/aws-exports'
import { LogBox } from 'react-native';
Amplify.configure(config)

LogBox.ignoreLogs(['Warning: source.uri should not be an empty string ']);
LogBox.ignoreLogs(['Warning: source.uri should not be an empty string ']);
LogBox.ignoreAllLogs()
const App = () =>  {
  //Auth.signOut()
    return (
      <SafeAreaView style = {styles.root}>
      <Navigation/>
	<Text> testing merge effects  </Text>
      </SafeAreaView>
      
    );
}

const styles = StyleSheet.create({ 
  root: {
    backgroundColor:"#F9FBFC", 
    flex: 1
  }
}) 

const signUpConfig = {
  header: "My Customized Sign Up",
  hideAllDefaults: true,
  signUpFields: [
    {
      label: "Full name",
      key: "name",
      required: true,
      displayOrder: 1,
      type: "string",
    },
    {
      label: "Email",
      key: "email",
      required: true,
      displayOrder: 2,
      type: "string",
    },
    {
      label: "Username",
      key: "preferred_username",
      required: true,
      displayOrder: 3,
      type: "string",
    },
    {
      label: "Password",
      key: "password",
      required: true,
      displayOrder: 4,
      type: "password",
    },
  ],
};

export default App
