import React, { Component } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  ActivityIndicator,
  StatusBar,
  ScrollView,
  Text,
  Image,
  BackHandler,
} from 'react-native';

import { WebView } from 'react-native-webview';

import { Appbar, Button } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';

import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class PublicerDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      convert: 'hello',
      searchQuer: '',
      searchFiel: '',
      startPag: '',
      email: 'mtesting405@gmail.com',
      showData: false,
      booksDetails: [],
      loader: true,
      popShow: true,
    };
  }

  async componentDidMount() {
    const searchqueryLocal = JSON.parse(
      await AsyncStorage.getItem('searchquery'),
    );
    const labelLocal = JSON.parse(await AsyncStorage.getItem('labelLocal'));

    this.setState({
      searchQuer: searchqueryLocal,
      searchFiel: labelLocal,
    });

    // console.log(
    //   'searchquery local : ',
    //   this.state.searchQuer,
    //   this.state.searchFiel,
    // );

    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    const body = JSON.stringify({
      searchQuery: this.state.searchQuer,
      searchField: this.state.searchFiel,
      startPage: this.state.startPag,
      userEmail: 'mtesting405@gmail.com',
    }),
      path = 'https://bitsomt.refread.com/webservice/pub/documents';

    RNFetchBlob.config({
      trusty: true,
    })
      .fetch('POST', path, headers, body)
      .then(resp => {
        // console.log('resp : ', resp.data);
        const detail = resp.data;
        const prs = JSON.parse(detail);
        // console.log(prs.refreadDocumentList);
        this.setState({
          showData: true,
          booksDetails: prs.refreadDocumentList,
          loader: false,
        });
      })
      .catch((error, statusCode) => {
        // console.log('statusCode :', statusCode);
        console.log(
          'There has been a problem with your fetch operation: ' +
          error.message,
        );
      });
  }

  async getDetails(item) {
    console.log('label : ', item.title);

    await AsyncStorage.setItem('Booktitle', JSON.stringify(item.title));
    await AsyncStorage.setItem('fulltexturl', JSON.stringify(item.fulltexturl));

    const Booktitle = JSON.parse(await AsyncStorage.getItem('Booktitle'));
    const fullurl = JSON.parse(await AsyncStorage.getItem('fulltexturl'));

    // (this.state.searchquery = item.searchQuery),
    //   (this.state.label = item.label),
    //   console.log('state : ', this.state.searchquery);

    if (Booktitle !== '' && fullurl !== '') {
      // this.setState({
      //   popShow: false,
      // });

      this.props.navigation.navigate('OpenBook');
    } else {
      console.log('Something wents wrong.');
    }
  }

  backButton() {
    BackHandler.removeEventListener(
      'hardwareBackPress',

      this.hidePop(),
    );
  }

  hidePop() {
    this.setState({
      popShow: true,
    });
    console.log('hleoo : ', this.state.popShow);
    return true;
  }

  render() {
    return (
      <View style={styles.container}>
        {/* {this.state.popShow ? ( */}
        <>
          <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
          <Appbar.Header style={styles.ttl}>
            <TouchableOpacity
              style={{ paddingLeft: '2%' }}
              onPress={() => this.props.navigation.goBack()}
            >
              <AntDesign name="arrowleft" color="#05375a" size={25} />
            </TouchableOpacity>

            <Appbar.Content title="Books" />
          </Appbar.Header>

          {this.state.loader ? (
            <>
              <View
                style={{
                  height: '100%',
                  width: '100%',
                  position: 'absolute',
                  elevation: 3,
                  // backgroundColor: 'rgba(0,0,0,0.2)',
                }}></View>
              <View
                style={{
                  flex: 1,
                  width: '100%',
                  position: 'absolute',
                  elevation: 3,
                  top: '50%',
                  justifyContent: 'center',
                }}>
                <ActivityIndicator size="large" color="#0d6efd" />
              </View>
            </>
          ) : null}

          <View style={styles.container}>
            <>
              <ScrollView showsVerticalScrollIndicator={false}>
                {this.state.showData ? (
                  <View
                    style={{
                      marginLeft: '5%',
                      marginRight: '5%',
                      marginBottom: '5%',
                    }}>
                    <View style={styles.commonGradient}>
                      
                      <Text
                        style={{
                          color: '#6f6f6f',
                          fontSize: 18,
                          fontWeight: '700',
                          marginTop: '5%',
                          borderBottomColor: '#f68823',
                          borderBottomWidth: 1,
                          paddingBottom: 10,
                        }}>
                        Publisher : {this.state.searchFiel}
                      </Text>
                    </View>

                    {this.state.booksDetails.map((item, i) => {
                      {
                        console.log('item : ', item.title);
                      }
                      return (
                        <React.Fragment key={i}>
                          <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.getDetails(item)}>
                            <LinearGradient
                              colors={['#f7f6ff', '#eff3fe']}
                              style={styles.commonGradient}>
                              <View style={{ flexDirection: 'row' }}>

                                <View
                                  style={{
                                    marginLeft: '5%',
                                    margin: 10,
                                    width: '80%',
                                  }}>
                                  <Text
                                    style={[
                                      styles.textCommon,
                                      { color: '#191919', margin: '3%' },
                                    ]}>
                                    {item.title}
                                  </Text>
                                </View>

                                <View style={styles.rightIcon}>
                                  <Feather
                                    name="chevron-right"
                                    color="#5ec6e9"
                                    size={15}
                                    style={styles.rightM}
                                  />
                                </View>
                              </View>
                            </LinearGradient>
                          </TouchableOpacity>
                        </React.Fragment>
                      );
                    })}
                  </View>
                ) : null}

              </ScrollView>
            </>
          </View>

         
        </>
        <View
          style={{
            paddingHorizontal: 5,
            paddingVertical: 8,
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  ttl: {
    backgroundColor: '#fff',
  },
  commonGradient: {
    width: '100%',
    justifyContent: 'center',
    borderRadius: 10,
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
  button: {
    alignItems: 'center',
    marginTop: 13,
  },
  textCommon: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});