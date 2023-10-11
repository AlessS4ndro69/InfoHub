import React, { useState } from 'react';
import {TouchableOpacity, View, Text, TextInput, Button, Modal, StyleSheet  } from 'react-native';
import tw from 'twrnc';
import { SafeAreaView } from "react-native-safe-area-context";
import Login from '../components/LoginComponent';
import Signup from '../components/SignupComponent';


const AuthSessionScreen = () => {
  const [goLogin, setGoLogin] = useState(false);
  const [goRegister, setGoRegister] = useState(false);
  

  return (
    <SafeAreaView style = {tw`bg-gray-200 h-full`}>
      {!goRegister && <Login handleRegister= {setGoRegister}/>}
      {goRegister && <Signup/>}
    </SafeAreaView>
  );
};

export default AuthSessionScreen;


const styles = StyleSheet.create({
  button: {
    width: 250,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderColor: '#fff',
    borderWidth: 1,
  }
});