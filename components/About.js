import React, {Component} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';

import {WebView} from 'react-native-webview';

import {Appbar} from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import LinearGradient from 'react-native-linear-gradient';
// import * as Animatable from 'react-native-animatable';

export default class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Appbar.Header style={styles.ttl}>
          <TouchableOpacity
            style={{paddingLeft: '2%'}}
            onPress={() => this.props.navigation.goBack()}>
            <AntDesign name="arrowleft" color="#05375a" size={25} />
          </TouchableOpacity>

          <Appbar.Content title="More About The Library" />
        </Appbar.Header>

        <>
          <View style={{width: '100%', height: '100%'}}>
            <WebView
              source={{uri: 'https://bitsom.libcon.in/'}}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              onLoadStart={() =>
                this.setState({
                  loader: true,
                })
              }
              onLoadEnd={() =>
                this.setState({
                  loader: false,
                })
              }
            />
          </View>
        </>

        {this.state.loader && (
          <View style={styles.activityIndicatorStyle}>
            <ActivityIndicator color="#57A3FF" size="large" />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activityIndicatorStyle: {
    flex: 1,
    position: 'absolute',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 'auto',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    // elevation: 3,
  },
  ttl: {
    backgroundColor: '#fff',
  },
});
