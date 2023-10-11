import React, { useEffect, useState } from "react";
import { Text, View, FlatList, TouchableOpacity, StyleSheet, Modal, Pressable } from "react-native";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input, Icon } from '@rneui/themed';
import { db } from "../../database/firebase";
import { setDoc,doc, addDoc, collection, query, getDocs } from "firebase/firestore";
import MyButton from "../components/MyButtonComponent";
import tw from "twrnc";
import RewardData from "../components/RewardDataComponent";

const NUMBER_REGISTERS = 3;

const InputInformationScreen = () => {
    const [formValues, setFormValues] = useState({});
    const [atributosArray, setAtributosArray] = useState(null);
    const [isReady, setReady] = useState(false);
    const [rewardData, setRewardData ] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    


    const route = useRoute();
    const subject = route.params.item.subject_title;
    // Función para manejar cambios en los campos de entrada
    const handleInputChange = (key, value, field) => {
      setFormValues({ ...formValues, [key]: {"value":value, "field": field} });
      //setFormValues({ ...formValues, [key]: {"value" :value, "titleField": field}});
    };
  
    // Función para enviar los datos del formulario
    const handleSubmit = async() => {
      // Aquí puedes acceder a los valores de formValues y hacer lo que necesites con ellos
      const arrayValues = Object.values(formValues);
      console.log('Valores del formulario:', arrayValues);
      

      try {
        const docRef = await addDoc(collection(db, subject), {
          props: arrayValues
        });
        console.log("Documento guardado con el tema: " + subject + " id: " + docRef.id);
        setReady(true);
      } catch (error) {
        console.error("Error al guardar el documento:", error);
      }
      
    };

  const get_data = async() => {
    const data = [];
    const q = query(collection(db,subject));
    const querySnapshot = await getDocs(q);

    const numDocuments = querySnapshot.size;
    

    if(numDocuments > NUMBER_REGISTERS){
      const randomIndexes = generateRandomIndexes(numDocuments, NUMBER_REGISTERS);
      randomIndexes.forEach((randomIndex) => {
        const doc = querySnapshot.docs[randomIndex];
        if (doc) {
          console.log(doc.id, " => ", doc.data());
          data.push(doc.data());
          
        }
      });
    }

    // Los 3 registros aleatorios se recuperan desde Firestore
    setRewardData(data);
    console.log("Reward data is: ",data);
    setModalVisible(true);
    
  }    
  // Convierte los atributos en una matriz de objetos para que puedan mostrarse en una lista
  

  // Función para renderizar cada elemento de la lista
  const renderItem = ({ item }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
      <View style ={{
            marginBottom: 10, // Espacio inferior
            borderWidth: 1,  // Ancho del borde
            borderColor: 'gray', // Color del borde
            borderRadius: 5, // Radio de borde
            width: "100%",
            padding:10,
            backgroundColor: "#B5D3F0",
          }}>
        <Text style={{ fontSize: 20, opacity: 0.7, paddingLeft: 10}}>{item.value.titleField}</Text>

        <Input
        
        placeholder='info'
        leftIcon={{ type: 'font-awesome', name: 'pencil' }}
        errorStyle={{ color: 'red' }}
        errorMessage='dato invalido'
        errorProps={false}
        value={formValues[item.key]}
        onChangeText={(text) => handleInputChange(item.key, text, item.value.titleField)}
        />
        </View>
      {/*<Text>{item.value}</Text>*/}
    </View>
  );

  useEffect(()=> {
    const atributos = route.params.item.subject_fields;  // {"edad": 28, "nombre_señorita": "María", "telefono": "+1234567890"}
    console.log("llamando desde useefecct de input");
    
    console.log(atributos);
    //setFormValues(atributos);
    const atributosArray = Object.entries(atributos).map(([key, value]) => ({ key, value })); //[{"key": "0", "value": {"description": "", "titleField": "Nombre"}}, {"key": "1", "value": {"description": "", "titleField": "Edad"}}, {"key": "2", "value": {"description": "", "titleField": "Ciudad"}}]
    console.log(atributosArray);
    setAtributosArray(atributosArray);
    //setFormValues(Object.entries(atributos).map(([key]) => ([key,'']))); //[["nombre_señorita", ""], ["edad", ""], ["telefono", ""]]
    
  },[]);

    return (
        <SafeAreaView style = {tw`bg-gray-200 h-full`}>
            <View style= {tw`items-center`}>
            <View style = {tw`p-3 m-5  bg-blue-500 rounded w-50%`}>
                                    <Text style = {tw` text-2xl italic  text-white font-bold`}>Llene los datos</Text>
                                </View>
            {atributosArray && <FlatList
                    data={atributosArray}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.key}
                />}
            <TouchableOpacity 
                onPress={() => {
                    console.log("presionango agregar datos");
                    handleSubmit();
                }} 
                style={[styles.button, {backgroundColor: '#3B82F6'}]}>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Agregar datos</Text>
                
              </TouchableOpacity>
              
              {isReady && <MyButton onClick={get_data} text="Multiplicar información"/>}

              
              {isReady && <RewardData data = {rewardData} modalVisible={modalVisible} setModalVisible={setModalVisible}/>}
            </View> 
        </SafeAreaView>
        
    );

    function generateRandomIndexes(maxValue, count) {
      const indexes = [];
      while (indexes.length < count) {
        const randomIndex = Math.floor(Math.random() * maxValue);
        if (!indexes.includes(randomIndex)) {
          indexes.push(randomIndex);
        }
      }
      return indexes;
    }
};



export default InputInformationScreen;

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
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
});