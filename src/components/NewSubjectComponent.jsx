
import React, {useState} from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet, Pressable, FlatList, ActivityIndicator } from "react-native";
import { Input   } from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome';
import tw from "twrnc";
import { db } from "../../database/firebase";
import { setDoc,doc, addDoc, collection } from "firebase/firestore";
import MyButton from "./MyButtonComponent";


const NewSubject = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [viewError, setViewError] = useState(false);
    //const [fields, setfields] = useState([]);
    const [fields, setFields] = useState([{ titleField: '', description: '' }]);
    const [countField, setCountField] = useState(1); // no empieza en 1 porque  1 es el titulo
    const [valuesField, setvaluesField] = useState({});
    const [loading, setLoading] = useState(false);
    
    const [isCompletedField, setCompletedField] = useState(true);
    const [titleSubject, setTitleSubject] = useState("");



    const add_field = () => {
      setFields([...fields, { titleField: '', description: '' }]);
    };
  
    const handleTitleChange = (titleField, index) => {
      const updatedFields = [...fields];
      updatedFields[index].titleField = titleField;
      setFields(updatedFields);
      console.log("agregando",updatedFields);
      console.log(fields);
    };
  
    const handleTextChange = (description, index) => {
      const updatedFields = [...fields];
      updatedFields[index].description = description;
      setFields(updatedFields);
    };

    const upload_data =async() => {
      const d = await addDoc(collection(db, "subject_list"), {
        title : titleSubject,
        fields : fields,
        creator: "id_creator",
        views: 0,
      })
      .then((docRef) => {
        console.log("Agregando nuevo tema a Firebase con el ID: " , docRef.id);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al agregar el tema a Firebase: " , error);
        // Si ocurre un error, también puedes ocultar el ActivityIndicator aquí en el bloque catch
      });
      

    };
    return (
        <View style= {tw`items-center`}>
            
        
                <View style={styles.centeredView}>
                
                    {/*/////// Campo del TITULO*/}
                    <Text style = {styles.modalText}>Cree los campos necesarios para la información del tema</Text>
                
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                        <View style ={{
                        marginBottom: 10, // Espacio inferior
                        borderWidth: 1,  // Ancho del borde
                        borderColor: 'gray', // Color del borde
                        borderRadius: 5, // Radio de borde
                        width: "100%",
                        padding:3,
                        backgroundColor: "#B5D3F0",
                        }}>
                        <Text style={{ fontSize: 20, opacity: 0.7, paddingLeft: 10}}>Titulo </Text>
        
                        <Input
                            placeholder='titulo del tema'
                            leftIcon={{ type: 'font-awesome', name: 'pencil' }}
                            errorStyle={{ color: 'red' }}
                            errorMessage={ viewError ? 'dato inválido' : ''}
                            
                            errorProps={false}
                            value={titleSubject}
                            onChangeText={(text) => setTitleSubject(text)}
                        />
                        
                        </View>
                        
                        </View>
                        {/* campo de las PROPIEDADES */}
                <FlatList
                    data={fields}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                      <View key={index}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
                        <View style ={{
                        marginBottom: 10, // Espacio inferior
                        borderWidth: 1,  // Ancho del borde
                        borderColor: 'gray', // Color del borde
                        borderRadius: 5, // Radio de borde
                        width: "95%",
                        padding:6,
                        backgroundColor: "#B5D3F0",
                        }}>
                      <Text>Atributo {index + 1}</Text>
                      <Input
                        placeholder="Nombre del atributo"
                        value={item.titleField}
                        onChangeText={(text) => handleTitleChange(text, index)}
                      />
                      <Input
                        placeholder="Descripción del atributo(opcional)"
                        value={item.description}
                        onChangeText={(text) => handleTextChange(text, index)}
                      />
                      </View>
                      </View>
                    </View>
                    )}
                />
                { isCompletedField && <View style={styles.iconContainer}>
                      <TouchableOpacity 
                        
                        onPress={add_field}
                    >
                        <Icon name="plus" size={24} color="#2196F3" />
                    </TouchableOpacity>                    
                </View>}
                <MyButton text="crear tema"
                  onClick={() => {
                    upload_data();
                    //setModalVisible(true);
                    //setLoading(true);
                }}
                  
                />
                
            </View>
            
            
        </View>
    );
};


export default NewSubject;

const styles = StyleSheet.create({
    iconContainer: {
        backgroundColor: '#B5D3F0',  // Color de fondo celeste
        borderRadius: 30,             // Radio de borde para hacerlo redondeado
        width: 60,                    // Ancho
        height: 60,                   // Altura
        justifyContent: 'center',
        alignItems: 'center',
      },
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
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 10,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 15,
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
    
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  });