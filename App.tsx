import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './src/screens/home';



const MainNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,  
    navigationOptions: {
      headerShown: false,
    }
  }, 
});

const App = createAppContainer(MainNavigator);

export default App;
