import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  BackHandler,
  Alert, Linking,
} from 'react-native';

import { Appbar } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
// import * as Animatable from 'react-native-animatable';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userGoogleInfo: {},
      name: '',
      email: '',
      id: '',
      loader: false,
    };
  }
  async componentDidMount() {
    try {
      const email = JSON.parse(await AsyncStorage.getItem('email'));
      const userId = JSON.parse(await AsyncStorage.getItem('userId'));
      const sName = JSON.parse(await AsyncStorage.getItem('sName'));
      const sNameLast = JSON.parse(await AsyncStorage.getItem('sNameLast'));

      this.setState({
        name: sName + ' ' + sNameLast,
        id: userId,
        email: email,
      });

      console.log('email : ', this.state.email);
    } catch (error) {
      console.log('There has problem in AsyncStorage : ' + errro.message);
    }
  }

  backButton() {
    BackHandler.addEventListener(
      'hardwareBackPress',

      this.disableBackButton(),
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',

      this.disableBackButton(),
    );
  }

  disableBackButton() {
    BackHandler.exitApp();
    // Alert.alert('Exit From App', 'Do you want to exit from app ?', [
    //   {text: 'Yes', onPress: () =>  BackHandler.exitApp()},
    //   {text: 'No', onPress: () => console.warn('No Pressed')},
    // ]);
    return true;
  }

  logOut() {
    BackHandler.removeEventListener('hardwareBackPress', this.disableBack());
  }

  disableBack() {
    Alert.alert('Log out from App', 'Do you want to log out from app ?', [
      { text: 'Yes', onPress: () => this.clearToken() },
      { text: 'No', onPress: () => console.warn('No Pressed') },
    ], { cancelable: true });
    return true;
  }

  async clearToken() {
    await AsyncStorage.clear();
    BackHandler.exitApp();
  }

  render() {
    return (
      <SafeAreaView style={{ backgroundColor: '#ffffff', flex: 1 }}>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />

        <View style={styles.container}>
          <View style={styles.uDetail}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={[styles.uNme, { width: '70%' }]}>Hello</Text>

              <TouchableOpacity
                onPress={() => this.logOut()}
                style={{
                  justifyContent: 'center',
                  flex: 1,
                  alignItems: 'center',
                  borderRadius: 5,
                }}>
                <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                  <Text
                    style={{ justifyContent: 'center', alignItems: 'center' }}>
                    Logout
                  </Text>
                  <MaterialIcons
                    name="logout"
                    color="#fe8c00"
                    size={15}
                    style={{ marginLeft: 5, marginTop: 3 }}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <Text style={styles.uNme}>{this.state.name}</Text>
            <Text style={{ marginTop: 10, color: '#8A8A8A' }}>
              Welcome to Learning Resource Center, BITSoM, Mumbai{' '}
            </Text>
          </View>

          <>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ marginBottom: '10%' }}>
                {/* ---------PROFILE */}
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ width: '31%', marginTop: 10 }}>
                    <TouchableOpacity
                      onPress={() => this.props.navigation.push('Profile')}>
                      <LinearGradient
                        colors={['#F3F3F3', '#F3F3F3']}
                        style={styles.commonGradient}>
                        <View style={{ padding: 10 }}>
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              marginTop: 10,
                            }}>
                            <Feather name="user" color="#fe8c00" size={28} />
                          </View>

                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              marginTop: 18,
                              marginBottom: 20,
                            }}>
                            <Text style={{ color: '#717171' }}>Your Profile</Text>
                          </View>
                        </View>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>

                  {/*  ---------------------------ACCOUNT------------------------------ */}
                  <View style={{ width: '31%', marginLeft: 10, marginTop: 10 }}>
                    <TouchableOpacity
                      // style={styles.button}
                      onPress={() =>
                        this.props.navigation.navigate('Accountss')
                      }>
                      <LinearGradient
                        colors={['#F3F3F3', '#F3F3F3']}
                        style={styles.commonGradient}>
                        <View style={{ padding: 10 }}>
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              marginTop: 10,
                            }}>
                            <Feather name="lock" color="#fe8c00" size={28} />
                          </View>

                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              paddingTop: 10,
                              paddingBottom: 8,
                            }}>
                            <Text style={{ color: '#717171' }}>Your </Text>
                            <Text style={{ color: '#717171' }}> Account</Text>
                          </View>
                        </View>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>

                  {/* -----------------ABOUT--------------------------- */}
                  <View style={{ width: '31%', marginLeft: 10, marginTop: 10 }}>
                    <TouchableOpacity
                      onPress={() => this.props.navigation.push('About')}>
                      <LinearGradient
                        colors={['#F3F3F3', '#F3F3F3']}
                        style={styles.commonGradient}>
                        <View style={{ padding: 10 }}>
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              marginTop: 10,
                            }}>
                            <AntDesign
                              name="infocirlceo"
                              color="#fe8c00"
                              size={28}
                            />
                          </View>

                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              paddingTop: 10,
                              paddingBottom: 10,
                            }}>
                            <Text style={{ color: '#717171' }}> More About </Text>
                            <Text style={{ color: '#717171' }}> The Library</Text>
                          </View>
                        </View>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* -----------------CHECKOUT------------------------------ */}

                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                  <View style={{ width: '31%', marginTop: 10 }}>
                    <TouchableOpacity
                      onPress={() => this.props.navigation.push('Opac')}>
                      <LinearGradient
                        colors={['#F3F3F3', '#F3F3F3']}
                        style={styles.commonGradient}>
                        <View style={{ padding: 10 }}>
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              marginTop: 10,
                            }}>
                            <AntDesign
                              name="search1"
                              color="#fe8c00"
                              size={28}
                            />
                          </View>

                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              marginTop: 15,
                              marginBottom: 10,
                            }}>
                            <Text style={{ color: '#717171' }}>Search Book</Text>

                            <Text style={{ color: '#717171' }}>(OPAC)</Text>
                          </View>
                        </View>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>

                  {/*  ---------------------------ACCOUNT------------------------------ */}
                  <View style={{ width: '31%', marginLeft: 10, marginTop: 10 }}>
                    <TouchableOpacity
                      // style={styles.button}
                      onPress={() => this.props.navigation.push('Eresource')}>
                      <LinearGradient
                        colors={['#F3F3F3', '#F3F3F3']}
                        style={styles.commonGradient}>
                        <View style={{ padding: 10 }}>
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              marginTop: 10,
                            }}>
                            <AntDesign name="book" color="#fe8c00" size={28} />
                          </View>

                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              paddingTop: 20,
                              paddingBottom: 22,
                            }}>
                            <Text style={{ color: '#717171' }}>E-Resources </Text>
                          </View>
                        </View>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>

                  {/* -----------------Search Book (OPAC)--------------------------- */}
                  <View style={{ width: '31%', marginLeft: 10, marginTop: 10 }}>
                    <TouchableOpacity
                      onPress={() => this.props.navigation.push('Contact')}>
                      <LinearGradient
                        colors={['#F3F3F3', '#F3F3F3']}
                        style={styles.commonGradient}>
                        <View style={{ padding: 10 }}>
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              marginTop: 10,
                            }}>
                            <AntDesign
                              name="contacts"
                              color="#fe8c00"
                              size={28}
                            />
                          </View>

                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              paddingTop: 14,
                              paddingBottom: 10,
                            }}>
                            <Text style={{ color: '#717171' }}>Contact </Text>
                            <Text style={{ color: '#717171' }}>The Library</Text>
                          </View>
                        </View>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ScrollView>
          </>



          





        </View>

        <View
            style={{
              paddingHorizontal: 5,
              paddingVertical: 15,
              // marginTop: '37%',
              position:"absolute",
              left:"30%",
              top:"93%"
            }}>
            <TouchableOpacity
              onPress={() => Linking.openURL('https://libcon.in/')}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text>Powered by</Text>
              <Text style={{ color: '#f68823' }}> LIBCON</Text>
            </TouchableOpacity>
          </View>


      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  ttl: {
    backgroundColor: '#fff',
  },
  container: {
    marginLeft: '5%',
    marginRight: '5%',
  },
  uDetail: {
    marginTop: 10,
    marginBottom: 10,
  },
  uNme: {
    fontSize: 30,
  },
  button: {
    alignItems: 'center',
    marginTop: 13,
    // width: '100%',
  },
  commonGradient: {
    width: '100%',
    // height: 50,
    justifyContent: 'center',
    // alignItems: 'center',
    borderRadius: 10,
  },
  textCommon: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconC: {
    marginTop: 4,
    marginRight: 10,
    marginLeft: 20,
  },
  rightIcon: {
    justifyContent: 'center',
    marginTop: 4,
    // textAlign:"right",
    flex: 1,
    // alignItems: 'flex-end',
    // flexDirection:"row",
    // width:"100%"
  },
  rightM: {
    //   alignItems:"flex-end",
    textAlign: 'right',
    marginRight: 20,
    //   width:"100%"
  },
  scrollView: {
    flexGrow: 1,
    flex: 1,
  },
});
