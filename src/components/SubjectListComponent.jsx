import React, { useEffect, useState } from "react"
import { Image, FlatList, View, TouchableOpacity ,Text, StyleSheet} from "react-native";
import { useNavigation } from "@react-navigation/native";
//import data from '../../data.json'
import headerImage from '../../assets/splash.png'; // Ruta a tu imagen de encabezado
import NewSubject from "./NewSubjectComponent";
import tw from "twrnc";
import { db } from "../../database/firebase";
import { collection, getDocs, query , onSnapshot} from "firebase/firestore";

const initialData = {
    "subject_title": "",
    "subject_fields": {},
    "subject_creator": "",
    "number_views": 0, 
};

const SubjectList = () => {
    const [data,setData] = useState(initialData);

    const navigation = useNavigation();

    const renderItem = ({ item }) => (
        <View style={{ backgroundColor: 'white', marginBottom: 10, padding: 10, borderRadius:10, margin:10 }}>
            <TouchableOpacity
                onPress={()=> {
                    console.log("presionando tema..");
                    navigation.navigate("InputInformationScreen",{
                        item: item
                    })
                }}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ color: 'red', marginRight: 10 }}>{item.subject_title}</Text>
                    <Text style={{ color: 'red', marginRight: 10 }}>{item.number_views}</Text>
                    
                </View>
          </TouchableOpacity>
          {/* Agregar más contenido de elementos de lista aquí */}
        </View>
      );


    useEffect(()=> {
        const q = query(collection(db,"subject_list"));

        async function f (){
            onSnapshot(q, async(querySnapshot) =>{
            const data = []

            querySnapshot.forEach((doc) => {
                
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                const {title, fields} = doc.data();

                data.push({
                    subject_title : title,
                    subject_fields : fields,
                    subject_creator: "",
                    number_views: 0,

                })
              });

            setData(data);

            });
            
        };
        f();
    },[]);

    return (
        <View >
        <Image
        source={headerImage}
        style={{ height: '25%', width: '100%', resizeMode: 'cover' }}
        />
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.subject_title}
        />
        <View style= {tw`items-center`}>
            <TouchableOpacity 
                onPress={() => {
                    console.log("presionando crear tema");
                    //setModalVisible(true);
                    navigation.navigate("NewSubjectScreen");
                }} 
                style={[styles.button, {backgroundColor: '#3B82F6'}]}>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Crear tema</Text>
                
        </TouchableOpacity>
        </View>
        
      </View>
    );
};


export default SubjectList;

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
})