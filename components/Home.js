import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  BackHandler,
  Alert, Linking, Image, Dimensions, ActivityIndicator,
  ImageBackground
} from 'react-native';

import { Appbar } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
// import * as Animatable from 'react-native-animatable';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_SLIDER } from "@env"

import Carousel from 'react-native-snap-carousel';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');



export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userGoogleInfo: {},
      name: '',
      email: '',
      id: '',
      loader: false,
      sliderData: [],
      showSlider: false,
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

    this.getSliderData()
  }


  getSliderData() {
    fetch(`${API_SLIDER}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(result => {
      result.json().then(resp => {

        if (resp.status === "success") {
          this.setState({
            sliderData: resp.data,
            showSlider: true
          })
          console.log("data :- ", this.state.sliderData)
        } else {
          this.setState({
            showSlider: false
          })

        }
      })
    }).catch(error => {
      console.log(error)
      this.setState({
        showSlider: false
      })
    })
  }


  _renderItem = ({ item, index }) => {

    {
      if (item.photo === "https://bitsomapi.libcon.in/Images/NoPhoto.png") {
        this.state.showImage = false
      } else {
        this.state.showImage = true
      }
    }

    return (
      <React.Fragment key={index}>

        <TouchableOpacity style={{ borderRadius: 8, marginBottom: "10%" }} onPress={() => this.getBiblionumber(item)}>
          <View style={[{ marginTop: "5%", alignItems: "center", justifyContent: "center", borderBottomRightRadius: 8, borderBottomLeftRadius: 8 }]}>
            <View style={{
              borderRadius: 8, shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.2,
              shadowRadius: 2,
              elevation: 5
            }}>
              <Image style={{ display: this.state.showImage ? "flex" : "none", width: 150, height: 200, borderTopLeftRadius: 8, borderTopRightRadius: 8 }} source={{ uri: item.photo }} />


              {!this.state.showImage ? (
                <View style={{ height: 200, backgroundColor: "#fff", justifyContent: "center", alignItems: "center", padding: 5 }}>

                  <Text style={{ padding: 5 }}>{item.item.title}</Text>
                  <Text style={{ paddingTop: 2, paddingLeft: 5, paddingBottom: 5 }}>{item.item.author}</Text>

                </View>
              ) :
                null
              }



            </View>
          </View>
        </TouchableOpacity>
      </React.Fragment>
    );
  }

  async getBiblionumber(item) {
    console.log(item.biblionumber)

    if (item.biblionumber.length !== 0) {
      await AsyncStorage.setItem('opacNext', JSON.stringify(item.biblionumber));
      await AsyncStorage.setItem('opacNextAuthor', JSON.stringify(item.title));
      const da = JSON.parse(await AsyncStorage.getItem('opacNext'));
      const opacNextAutho = JSON.parse(
        await AsyncStorage.getItem('opacNextAuthor'),
      );
      console.log('data : ', da, opacNextAutho);
      // console.log('mail', this.props.route.params.da);
      this.props.navigation.push('OpacNext');
    } else {
      console.log('no data');
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
        <StatusBar backgroundColor="#FF5733" barStyle="light-content" />
        <ImageBackground source={require('./image/template_1.png')} resizeMode="cover" style={{
          flex: 1,
          justifyContent: "center"
        }}>



          <View style={styles.container}>


            <>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ marginBottom: '10%' }}>

                  <View style={styles.uDetail}>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={[styles.uNme, { width: '70%', color: "#fff" }]}>Hello</Text>

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
                            style={{ justifyContent: 'center', alignItems: 'center', color: "#fff" }}>
                            Logout
                          </Text>
                          <MaterialIcons
                            name="logout"
                            color="red"
                            size={15}
                            style={{ marginLeft: 5, marginTop: 3 }}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.uNme}>{this.state.name}</Text>
                    <Text style={{ marginTop: 10, color: '#FAFAFA' }}>
                      Welcome to Learning Resource Center, BITSoM, Mumbai{' '}
                    </Text>
                  </View>




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




                  {/* ------------------------------SLIDER----------------------------------------------------- */}


                  <View>
                    <View style={{ marginTop: "8%", borderBottomWidth: 1, borderBottomColor: '#F1F1F1' }}>

                    </View>

                    <View>
                      <Text style={{ marginTop: 10, color: '#FAFAFA' }}>
                        Latest books in your library.
                      </Text>
                    </View>


                    {this.state.showSlider ? (

                      <View style={{  marginTop: "5%" }} >
                        <Carousel
                          layout={'default'} layoutCardOffset={`18`}
                          ref={(c) => { this._carousel = c; }}
                          data={this.state.sliderData}
                          renderItem={this._renderItem}
                          sliderWidth={viewportWidth}
                          itemWidth={155}
                        />
                      </View>

                    ) : <View style={styles.activityIndicatorStyle}>
                      <ActivityIndicator color="#57A3FF" size="large" />
                    </View>
                    }


                  </View>

                  






                </View>

                <View
                    style={{
                      paddingTop: 2,
                      paddingBottom: 5,
                      // marginTop:"20%",
                      // position: "absolute",
                      // top:"99%",
                      // backgroundColor: "#fff",
                      width: "100%"
                    }}>
                    <TouchableOpacity
                      onPress={() => Linking.openURL('https://libcon.in/')}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={{ color: "#fff" }}>Powered by</Text>
                      <Text style={{ color: 'red' }}> LIBCON</Text>
                    </TouchableOpacity>
                  </View>




              </ScrollView>


              
            </>









          </View>


        </ImageBackground>

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
    color: "#fff"
  },
  button: {
    alignItems: 'center',
    marginTop: 13,
  },
  commonGradient: {
    width: '100%',
    justifyContent: 'center',
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
    flex: 1,
  },
  rightM: {
    textAlign: 'right',
    marginRight: 20,
  },
  scrollView: {
    flexGrow: 1,
    flex: 1,
  },
  activityIndicatorStyle: {
    flex: 1,
    // position: 'absolute',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 'auto',
    marginTop: "10%",
    // left: 0,
    // right: 0,
    // top: 0,
    // bottom: 0,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
});
