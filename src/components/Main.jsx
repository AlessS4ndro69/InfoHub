import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import HomeScreen from '../screens/HomeScreen';
import AuthSessionScreen from '../screens/AuthSessionScreen';
import InputInformationScreen from '../screens/InputInformationScreen';
import NewSubjectScreen from '../screens/NewSubjectScreen';


const Main = () => {
    

    const MyStack = () => {

        return(
            <Stack.Navigator initialRouteName="AuthSessionScreen">
                <Stack.Screen
                    name="AuthSessionScreen"
                    component={AuthSessionScreen}
                    options={{
                        headerShown:false
                    }}
                />

                <Stack.Screen 
                    name="HomeScreen" 
                    component={HomeScreen} 
                    options = {{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name='InputInformationScreen'
                    component={InputInformationScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name = 'NewSubjectScreen'
                    component={NewSubjectScreen}
                    options={{
                        headerShown: false
                    }}
                />
            
            </Stack.Navigator>
        );
        
    };

    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
      
        <MyStack /> 

        </NavigationContainer>
    );  
};


export default Main;