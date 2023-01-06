import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from './js/view/login';
import UserInfoScreen from './js/view/userinfo';

const Stack = createStackNavigator();

class App extends Component {

  render(){
    return(
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen 
            name='Login' 
            component={LoginScreen}
          />
          <Stack.Screen 
            name='UserInfo' 
            component={UserInfoScreen}
            />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

export default App;