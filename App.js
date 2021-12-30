import React, {Component} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SplashScreen from 'react-native-splash-screen';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import Login from './components/Login';
import PageFirst from './components/PageFirst';
import VerifyNum from './components/VerifyNum';
import Home from './components/Home';
import Eresource from './components/eresource/Eresource';
import Opac from './components/Opac';
import About from './components/About';
import Contact from './components/Contact';
import Profile from './components/Profile';
import PublicerDetails from './components/eresource/PublicerDetails';
import Account from './components/Account';
import LogInNew from './components/LogInNew';
import OpenBook from './components/eresource/OpenBook';
import OpacNext from './components/opac/OpacNext';


console.disableYellowBox = true;

export default class App extends Component {
  componentDidMount() {
  
    SplashScreen.hide();
  }

  render() {
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="LogInNew" component={LogInNew} />
            <Stack.Screen name="PageFirst" component={PageFirst} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Eresource" component={Eresource} />
            <Stack.Screen name="PublicerDetails" component={PublicerDetails} />
            <Stack.Screen name="OpenBook" component={OpenBook} />
            <Stack.Screen name="Opac" component={Opac} />
            <Stack.Screen name="OpacNext" component={OpacNext} />
            <Stack.Screen name="About" component={About} />
            <Stack.Screen name="Contact" component={Contact} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Accountss" component={Account} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}

const Stack = createNativeStackNavigator();
