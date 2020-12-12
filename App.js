import 'react-native-gesture-handler'
import React from 'react';
import { StyleSheet,SafeAreaView,StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import TemplatesScreen from './src/screens/TemplatesScreen';
import CreateMemeScreen from './src/screens/CreateMemeScreen';
import RandomScreen from './src/screens/RandomScreen';
import MemeScreen from './src/screens/MemeScreen';

const options = (title) => {
  return {
    title: title,
    headerStyle: {
      backgroundColor: '#060930',
      shadowColor: '#222'
    },
    headerTintColor: '#f4f4f2',
  }
}

const App =()=>{
    const Stack = createStackNavigator();
      return (
        <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor="#060930"/>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={options("Meme generator")}
              />
              <Stack.Screen
                name="Templates"
                component={TemplatesScreen}
                options={options("Templates")}
              />
              <Stack.Screen
                name="Random"
                component={RandomScreen}
                options={options("Random meme creater")}
              />
              <Stack.Screen
                name="CreateMeme"
                component={CreateMemeScreen}
                options={options("Create Meme")}
              />
              <Stack.Screen
                name="Meme"
                component={MemeScreen}
                options={options("Create Meme")}
              />
            </Stack.Navigator>
          </NavigationContainer> 

        </SafeAreaView>
      );
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,  
    backgroundColor:"#333456"
  },
  header: {
    backgroundColor: '#060930',
    shadowColor:'#222'
  }
});

export default App;