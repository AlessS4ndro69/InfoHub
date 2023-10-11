import React from "react";
import { Text } from "react-native";
import NewSubject from "../components/NewSubjectComponent";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

const NewSubjectScreen = () => {


    return (
        <SafeAreaView style = {tw`bg-gray-200 h-full`}>
        <NewSubject/>
        </SafeAreaView>
    );

};


export default NewSubjectScreen;