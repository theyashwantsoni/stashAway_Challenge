import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/screens/home';
import SplashScreen from './src/screens/splash';


const Stack = createStackNavigator();


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen 
          name="splash" 
          component={SplashScreen} 
          options={{
            headerShown:false
          }}
          />
        <Stack.Screen 
          name="home" 
          component={HomeScreen} 
          
          options={{
            headerShown:false
          }}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


