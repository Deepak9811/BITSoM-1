// import React, { Component } from 'react';
// import {
//   TouchableOpacity,
//   StyleSheet,
//   View,
//   ActivityIndicator,
//   StatusBar,
//   ScrollView,
//   Text,
//   Image,
//   BackHandler,
// } from 'react-native';

// import { WebView } from 'react-native-webview';

// import { Appbar, Button } from 'react-native-paper';
// import Feather from 'react-native-vector-icons/Feather';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import LinearGradient from 'react-native-linear-gradient';

// import RNFetchBlob from 'rn-fetch-blob';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export default class PublicerDetails extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       loader: false,
//       convert: 'hello',
//       searchQuer: '',
//       searchFiel: '',
//       startPag: '',
//       email: 'mtesting405@gmail.com',
//       showData: false,
//       booksDetails: [],
//       loader: true,
//       popShow: true,
//     };
//   }

//   async componentDidMount() {
//     const searchqueryLocal = JSON.parse(await AsyncStorage.getItem('searchquery'));
//     const email = JSON.parse(await AsyncStorage.getItem('email'));
//       const userId = JSON.parse(await AsyncStorage.getItem('userId'));
//       const sName = JSON.parse(await AsyncStorage.getItem('sName'));
//       const sNameLast = JSON.parse(await AsyncStorage.getItem('sNameLast'));
//     const labelLocal = JSON.parse(await AsyncStorage.getItem('labelLocal'));

//     this.setState({
//       searchQuer: searchqueryLocal,
//       searchFiel: labelLocal,
//       email: email,
//     });

//     // console.log(
//     //   'searchquery local : ',
//     //   this.state.searchQuer,
//     //   this.state.searchFiel,
//     // );

//     const headers = {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     };
//     const body = JSON.stringify({
//       searchQuery: searchqueryLocal,
//       searchField: labelLocal,
//       startPage: this.state.startPag,
//       userEmail: email,
//     }),
//       path = 'https://bitsomt.refread.com/webservice/pub/documents';

//     RNFetchBlob.config({
//       trusty: true,
//     })
//       .fetch('POST', path, headers, body)
//       .then(resp => {
//         // console.log('resp : ', resp.data);
//         const detail = resp.data;
//         const prs = JSON.parse(detail);
//         this.setState({
//           showData: true,
//           booksDetails: prs.refreadDocumentList,
//           loader: false,
//         });
//         if (prs.refreadDocumentList.length != 0) {
//           console.log("helo")
//         }
//         console.log("check :- ",prs.refreadDocumentList.length);

//       })
//       .catch((error, statusCode) => {
//         // console.log('statusCode :', statusCode);
//         console.log(
//           'There has been a problem with your fetch operation: ' +
//           error.message,
//         );
//       });
//   }

//   async getDetails(item) {
//     console.log('label : ', item.title);

//     await AsyncStorage.setItem('Booktitle', JSON.stringify(item.title));
//     await AsyncStorage.setItem('fulltexturl', JSON.stringify(item.fulltexturl));

//     const Booktitle = JSON.parse(await AsyncStorage.getItem('Booktitle'));
//     const fullurl = JSON.parse(await AsyncStorage.getItem('fulltexturl'));

//     // (this.state.searchquery = item.searchQuery),
//     //   (this.state.label = item.label),
//     //   console.log('state : ', this.state.searchquery);

//     if (Booktitle !== '' && fullurl !== '') {
//       // this.setState({
//       //   popShow: false,
//       // });

//       this.props.navigation.navigate('OpenBook');
//     } else {
//       console.log('Something wents wrong.');
//     }
//   }

//   backButton() {
//     BackHandler.removeEventListener(
//       'hardwareBackPress',

//       this.hidePop(),
//     );
//   }

//   hidePop() {
//     this.setState({
//       popShow: true,
//     });
//     console.log('hleoo : ', this.state.popShow);
//     return true;
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         {/* {this.state.popShow ? ( */}
//         <>
//           <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
//           <Appbar.Header style={styles.ttl}>
//             <TouchableOpacity
//               style={{ paddingLeft: '2%' }}
//               onPress={() => this.props.navigation.goBack()}
//             >
//               <AntDesign name="arrowleft" color="#05375a" size={25} />
//             </TouchableOpacity>

//             <Appbar.Content title="eResources" />
//           </Appbar.Header>

//           {this.state.loader ? (
//             <>
//               <View
//                 style={{
//                   height: '100%',
//                   width: '100%',
//                   position: 'absolute',
//                   elevation: 3,
//                   // backgroundColor: 'rgba(0,0,0,0.2)',
//                 }}></View>
//               <View
//                 style={{
//                   flex: 1,
//                   width: '100%',
//                   position: 'absolute',
//                   elevation: 3,
//                   top: '50%',
//                   justifyContent: 'center',
//                 }}>
//                 <ActivityIndicator size="large" color="#0d6efd" />
//               </View>
//             </>
//           ) : null}

//           <View style={styles.container}>
//             <>
//               <ScrollView showsVerticalScrollIndicator={false}>
//                 {this.state.showData ? (
//                   <View
//                     style={{
//                       marginLeft: '5%',
//                       marginRight: '5%',
//                       marginBottom: '5%',
//                     }}>
//                     <View style={styles.commonGradient}>

//                       <Text
//                         style={{
//                           color: '#6f6f6f',
//                           fontSize: 18,
//                           fontWeight: '700',
//                           marginTop: '5%',
//                           borderBottomColor: '#f68823',
//                           borderBottomWidth: 1,
//                           paddingBottom: 10,
//                         }}>
//                         Publisher : {this.state.searchFiel}
//                       </Text>
//                     </View>

//                     {this.state.booksDetails.map((item, i) => {
//                       {
//                         console.log('item : ', item.title);
//                       }
//                       return (
//                         <React.Fragment key={i}>
//                           <TouchableOpacity
//                             style={styles.button}
//                             onPress={() => this.getDetails(item)}>
//                             <LinearGradient
//                               colors={['#f7f6ff', '#eff3fe']}
//                               style={styles.commonGradient}>
//                               <View style={{ flexDirection: 'row' }}>

//                                 <View
//                                   style={{
//                                     marginLeft: '5%',
//                                     margin: 10,
//                                     width: '80%',
//                                   }}>
//                                   <Text
//                                     style={[
//                                       styles.textCommon,
//                                       { color: '#191919', margin: '3%' },
//                                     ]}>
//                                     {item.title}
//                                   </Text>
//                                 </View>

//                                 <View style={styles.rightIcon}>
//                                   <Feather
//                                     name="chevron-right"
//                                     color="#5ec6e9"
//                                     size={15}
//                                     style={styles.rightM}
//                                   />
//                                 </View>
//                               </View>
//                             </LinearGradient>
//                           </TouchableOpacity>
//                         </React.Fragment>
//                       );
//                     })}
//                   </View>
//                 ) : null}

//               </ScrollView>
//             </>
//           </View>


//         </>
//         <View
//           style={{
//             paddingHorizontal: 5,
//             paddingVertical: 8,
//           }}>
//           <TouchableOpacity
//             onPress={() => Linking.openURL('https://libcon.in/')}
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}>
//             <Text>In Association with </Text>
//             <Text style={{ color: '#f68823' }}> Refread</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   ttl: {
//     backgroundColor: '#fff',
//   },
//   commonGradient: {
//     width: '100%',
//     justifyContent: 'center',
//     borderRadius: 10,
//   },

//   rightIcon: {
//     justifyContent: 'center',
//     marginTop: 4,
//     flex: 1,
//   },
//   rightM: {
//     textAlign: 'right',
//     marginRight: 20,
//   },
//   button: {
//     alignItems: 'center',
//     marginTop: 13,
//   },
//   textCommon: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });



import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Alert, View } from 'react-native';
import axios from "axios";
import RNFetchBlob from 'rn-fetch-blob';

import Posts from "../pagination/Post";
import Pagination from "../pagination/Pagination";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function slider({navigation}) {
  const [posts, setPosts] = useState([]);
  const [getDetails, setgetDetails] = useState([]);
  const [loader, setLoading] = useState(false);
  const [showData, setshowData] = useState(true);
  const [showText, setshowText] = useState(true);
  const [showpage, setshowpage] = useState(false);
  const [showPagiantion, setshowPagiantion] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage,setPostsPerPage] = useState(20);

  useEffect(() => {

    const fetchPosts = async () => {
      // setLoading(true);
      // const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      // console.log(res.data)
      // setPosts(res.data);
      // setLoading(false);

      setLoading(true);
      const searchqueryLocal = JSON.parse(await AsyncStorage.getItem('searchquery'));
      const email = JSON.parse(await AsyncStorage.getItem('email'));
      const userId = JSON.parse(await AsyncStorage.getItem('userId'));
      const sName = JSON.parse(await AsyncStorage.getItem('sName'));
      const sNameLast = JSON.parse(await AsyncStorage.getItem('sNameLast'));
      const labelLocal = JSON.parse(await AsyncStorage.getItem('labelLocal'));
      const documentList = JSON.parse(await AsyncStorage.getItem('documentList'));

      console.log("searchqueryLocal :- ",searchqueryLocal,", labelLocal:- ",labelLocal)



      const headers = {
        Accept: '*/*',
        'Content-Type': 'application/json',
      };
      const body = JSON.stringify({
        searchQuery: searchqueryLocal,
        searchField: labelLocal,
        startPage: 0,
        userEmail: email,
      }),
        path = documentList;


      RNFetchBlob.config({
        trusty: true,
      })
        .fetch('POST', path, headers, body)
        .then(resp => {
          // console.log(resp.data)
          const detail = resp.data;
          const prs = JSON.parse(detail);
          console.log("data :- ", prs.refreadDocumentList)
          setPosts(prs.refreadDocumentList);
          setLoading(false);

          // this.setState({
          //     showData: true,
          //     booksDetails: prs.refreadDocumentList,
          //     loader: false,
          // });

          if (!prs.refreadDocumentList.length > 0) {
            console.log("helo")
            setshowText(false)
          }else{
            setshowpage(true)
          }

          // console.log("check :- ", prs.refreadDocumentList.length);
          
          if(prs.refreadDocumentList.length <= 20 || prs.refreadDocumentList.length ===0){
            setshowPagiantion(false)
            console.log("check :- ", prs.refreadDocumentList);
          }

        })
        .catch((error, statusCode) => {
          // console.log('statusCode :', statusCode);
          Alert.alert('Error', "There has been a problem with your fetch operation. Please try again.", [{ text: 'Okay' }], { cancelable: true });
          navigation.goBack()
          setLoading(false)

          console.log(
            'There has been a problem with your fetch operation: ' + error.message);
        });
    };

    fetchPosts();
  }, []);

  // GET CURRENT POSTS

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);


  //CHANGE PAGE

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const postsPerPages = (pageSize) => setPostsPerPage(pageSize)

  console.log("currentPage :- ",postsPerPage)


  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Posts posts={currentPosts} loading={loader} eText={showText} navigation={navigation} />
        {showpage && (
          <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} showPages={showPagiantion} paginate={paginate} postsPerPages={postsPerPages} />
        )}
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});


// import React, { Component } from 'react';

// import { ScrollView, StyleSheet, Text, View } from 'react-native';
// import axios from "axios";
// import RNFetchBlob from 'rn-fetch-blob';

// import Posts from "../pagination/Post";
// import Pagination from "../pagination/Pagination";
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // GET CURRENT POSTS




// //CHANGE PAGE

// // console.log("getDetails :- ", getDetails)

// export default class PublicerDetails extends Component {
//   constructor(props) {
//     super(props)

//     this.state = {
//       posts: [],
//       getDetails: [],
//       loader: false,
//       showData: true,
//       showText: false,
//       showData: true,
//       currentPage: 1,
//       postsPerPage: 20,

//       //       const [posts, setPosts] = useState([]);
//       // const [getDetails, setgetDetails] = useState([]);
//       // const [loader, setLoading] = useState(false);
//       // const [showData, setshowData] = useState(true);
//       // const [showText, setshowText] = useState(false);
//       // const [currentPage, setCurrentPage] = useState(1);
//       // const [postsPerPage] = useState(20);

//     }
//   }

//   async componentDidMount() {

//     // setLoading(true);
//     // const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
//     // console.log(res.data)
//     // setPosts(res.data);
//     // setLoading(false);

//     this.setState({loader:true})

//     // setLoading(true);
//     const searchqueryLocal = JSON.parse(await AsyncStorage.getItem('searchquery'));
//     const email = JSON.parse(await AsyncStorage.getItem('email'));
//     const userId = JSON.parse(await AsyncStorage.getItem('userId'));
//     const sName = JSON.parse(await AsyncStorage.getItem('sName'));
//     const sNameLast = JSON.parse(await AsyncStorage.getItem('sNameLast'));
//     const labelLocal = JSON.parse(await AsyncStorage.getItem('labelLocal'));

//     const headers = {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     };
//     const body = JSON.stringify({
//       searchQuery: searchqueryLocal,
//       searchField: labelLocal,
//       startPage: 0,
//       userEmail: email,
//     }),
//       path = 'https://bitsomt.refread.com/webservice/pub/documents';


//     RNFetchBlob.config({
//       trusty: true,
//     })
//       .fetch('POST', path, headers, body)
//       .then(resp => {
//         // console.log(resp.data)
//         const detail = resp.data;
//         const prs = JSON.parse(detail);
//         // console.log("data :- ", prs.refreadDocumentList)

//         this.setState({
//           posts: prs.refreadDocumentList,
//           loading: false,
//           loader:false,
//           showText: true,
//         })

//         const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
//         const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
//         const currentPosts = this.state.posts.slice(indexOfFirstPost, indexOfLastPost);
//         // const paginate = (pageNumber) => setCurrentPage(pageNumber)

//         this.state.currentPage = currentPosts

//         // this.setState({
//         //   currentPosts:currentPosts
//         // })

//         console.log("currentPosts :- ",currentPosts)



       
//         // setPosts(prs.refreadDocumentList);
//         // setLoading(false);
//         // setshowText(true);

//         // this.setState({
//         //     showData: true,
//         //     booksDetails: prs.refreadDocumentList,
//         //     loader: false,
//         // });

//         if (prs.refreadDocumentList.length != 0) {
//           console.log("helo")
//           this.setState({
//             showText: true,
//           })
//           // setshowText(true)
//         }
//       })
//       .catch((error, statusCode) => {
//         // console.log('statusCode :', statusCode);
//         console.log(
//           'There has been a problem with your fetch operation: ' +
//           error.message,
//         );
//       });


//   }

//   currentPage() {

//   }





//   render() {
//     const {currentPosts,loader} =this.state
//     return (
//       <View style={styles.container}>
//         <ScrollView showsVerticalScrollIndicator={false}>
//           <Posts posts={currentPosts} loading={this.state.loader} eText={this.state.showText} getDetails={this.state.getDetails} />
//           {/* <Pagination postsPerPage={this.state.postsPerPage} totalPosts={this.state.posts.length} paginate={paginate} /> */}
//         </ScrollView>

//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff"
//   }
// });
