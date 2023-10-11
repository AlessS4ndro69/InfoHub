import React, {useState} from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Button } from 'react-native';
import PushNotificationComponent from '../components/PushNotificationComponent';
import { SafeAreaView } from 'react-native-safe-area-context';
import SubjectList from '../components/SubjectListComponent';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';

import {initializeAuth,getReactNativePersistence, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import firebase from "../../database/firebase";
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { getApps, getApp} from 'firebase/app';



//const auth = getAuth(firebase);
//const app = getApps().length === 0 ? firebase : getApp();
const app = firebase;
const auth = getAuth(app) || initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

/*const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});*/
const email = "cabellera@gmail.com";
const password = "cabellera";


const HomeScreen = () => {  
  const [login, setLogin] = useState(false);

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('Signed in!');
      const user = userCredential.user;
      console.log(user.uid);
      //setUid(user.uid);
      //getUser(user.uid);
      setLogin(true);
    })
    .catch(error => {
      
      console.log(error);
    })
}

  return (
    <SafeAreaView style = {tw`bg-gray-200 h-full`}>
      <SubjectList/>
      
      {!login && <Button title = {"auth"} onPress={handleSignIn}/>}
      {login && <PushNotificationComponent/>}
    </SafeAreaView>
  );
};

export default HomeScreen;
