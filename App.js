//import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, TextInput, Button } from "react-native";
import { BlurView } from 'expo-blur';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
//import { function } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-SERVICE.js'
import { initializeApp, initializeAuth } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from './firebase-config';

import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';


function HomeScreen(){
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text> Home Screen </Text>
    </View>
  );
}


function LoginScreen(){

  

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const navigation = useNavigation(); 

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleCreateAccount = () =>{
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) =>{
      console.log('Account created')
      const user = userCredential.user;
      console.log(user)
    })
    .catch(error =>{
      console.log(error)
      Alert.alert(error.message)
    })
  }

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('Signed in!')
      const user = userCredential.user
      console.log(user)
      naviation.navigate('Home');
    })
    .catch(error =>{
      console.log(error)
    })
  } 

  return (
    <View style={styles.container}>
      <Image source={require("./assets/login1.png")} style={[styles.image, StyleSheet.absoluteFill]} />
      <ScrollView contentContainerStyle= {{
        flex: 1,
        width: '100%', 
        height: '100%', 
        alignItems: 'center',
        justifyContent:'center',
        }}>
        <BlurView intensity={250}>
          <View style={styles.login}>
            <Image source={require("./assets/blank-profile.png")} style={styles.prefilePicture}/>
            <View>
              <Text style={{fontSize:17, fontWeight: '400', color:'#FF7D61'}}>E-mail</Text>
              <TextInput onChangeText={(text) => setEmail(text)} placeholder="E-mail" style={styles.input}></TextInput>
            </View>
            <View>
              <Text style={{fontSize:17, fontWeight: '400', color:'#FF7D61'}}>Password</Text>
              <TextInput onChangeText={(text) => setPassword(text)} style={styles.input} placeholder="Password" secureTextEntry={true} ></TextInput>
            </View>
            <TouchableOpacity onPress={handleSignIn} style={[styles.button]}>
              <Text style={{fontSize: 17, fontWeight:'400', color:'#FF7D61'}}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCreateAccount} style={[styles.button, { backgroundColor:'#B35545'}]}>
              <Text style={{fontSize: 17, fontWeight:'400', color:'#FF7D61'}}>Create Acount</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </ScrollView>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen  options={{ headerShown: false }} name = "Login" component={LoginScreen}/>
        <Stack.Screen name = "Home" component={HomeScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    width:'100%', 
    height:'100%',
    resizeMode: 'cover',
  },

  login:{
    width:350,
    height:520,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center'

  },

  prefilePicture:{
    width: 100,
    height:120,
    borderRadius:50,
    borderColor:'#fff',
    borderWidth:1,
    marginVertical: 30,
  },

  input:{
    width:250,
    height:40,
    borderColor:'#fff',
    borderWidth:2,
    borderRadius:10,
    padding:10,
    marginVertical:10,
    backgroundColor: '#ffffff90',
    marginBottom: 20,
  },

  button:{
    width:250,
    height:40,
    borderRadius:10,
    backgroundColor:'#FFA495',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderColor:'#fff',
    borderWidth: 1,
  },
});



