import React, {useEffect, useState} from "react";
import { Modal, Text, View, Pressable, StyleSheet, Alert, FlatList, ListView } from "react-native";
import tw from "twrnc";
import { ListItem } from "react-native-elements";

const RewardData = ({data, modalVisible, setModalVisible}) => {
    //const [modalVisible, setModalVisible] = useState(visible);
    //const data = Object.entries(rewardData).map(([key, value]) => ({ key, value }));
    const [expandedKey, setExpanded] = useState(0);



    const renderItem = ({ item}) => {
        
        return(
            <FlatList
                data={item.props}
                keyExtractor={(item, index) => index.toString()} // Utiliza el índice como identificador
                renderItem={({item})=>{
                    return(
                        <View>
                            <Text>{item.field}</Text>
                            <Text>{item.value}</Text>
                        </View>
                        
                    );
                    
                }}
            />  
        );
        
    };

    
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
            }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                <Text>Tripliclaste tu información</Text> 

                {data.length > 0 ?<FlatList
                    data = {data}
                    renderItem= {renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />:<Text>Actualizando base de datos</Text>}
                
                <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => {
                            setModalVisible(!modalVisible);
                            console.log("reward data: ", data);
                        }}
                        
                        
                    >
                        <Text style={styles.textStyle}>Aceptar</Text>
                    </Pressable>
                </View>
             </View>
             
            </Modal>
    );
};

export default RewardData;

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