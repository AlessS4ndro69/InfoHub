import React , {useEffect, useState} from "react";
import { View, Modal, Text, TextInput, TouchableOpacity,StyleSheet, Button } from "react-native";
import tw from "twrnc";
import { useRoute, useNavigation } from "@react-navigation/native";
import MyButton from "../components/MyButtonComponent";

import { db } from "../../database/firebase";
import { setDoc,doc } from "firebase/firestore";

const Login = (props) => {
    const [useTelephone, setUseTelephone] = useState(false);
    const route = useRoute();
    const navigation = useNavigation();


    useEffect(()=> {
    
    },[]);

    return (
        <View style={styles.container}>
        <View style={styles.header}>
          
          <Text style={styles.title}>Iniciar Sesión</Text>
        </View>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Correo Electrónico"
            placeholderTextColor="#ccc"
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#ccc"
            secureTextEntry={true}
          />
          <MyButton text="Ingresar" onClick={()=> {
              console.log("estamos logeando...");
              navigation.navigate("HomeScreen");
            }
          }/>
          
          <TouchableOpacity style={styles.forgotPasswordButton}>
            <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.forgotPasswordButton}
            onPress={()=> {
              props.handleRegister(true);
            }}
          >
            <Text style={styles.forgotPasswordText}>Crear cuenta</Text>
          </TouchableOpacity>
        </View>
        
      </View>

          
        
    
      
    );
};

export default Login;



const styles = StyleSheet.create(
    {
      container: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1E1E1E', // Color de fondo
        
      },
      header: {
        alignItems: 'center',
        marginBottom: 30,
      },
      title: {
        color: 'white', // Color del texto del título
        fontSize: 24,
        marginTop: 10,
      },
      form: {
        width: '80%',
      },
      input: {
        backgroundColor: '#333', // Color de fondo del campo de entrada
        color: 'white', // Color del texto del campo de entrada
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
      },
      loginButton: {
        backgroundColor: '#007BFF', // Color de fondo del botón de inicio de sesión
        padding: 15,
        alignItems: 'center',
        borderRadius: 5,
      },
      loginButtonText: {
        color: 'white', // Color del texto del botón de inicio de sesión
        fontSize: 18,
      },
      forgotPasswordButton: {
        marginTop: 10,
        alignItems: 'center',
      },
      forgotPasswordText: {
        color: '#007BFF', // Color del texto del enlace "¿Olvidaste tu contraseña?"
      },
      
    }
  )