
import React from 'react';
import {View,Text} from 'react-native';
const Filter =() => {
  const postDescription =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
    return(

        <View>
   
        </View>
    )
}
export default Filter;// How to Add or Remove FlatList Item with Animation
// https://aboutreact.com/add-or-remove-flatlist-item-with-animation/
 
// import React in our code
// import React, {useState} from 'react';
 
// // import all the components we are going to use
// import {
//   Text,
//   View,
//   StyleSheet,
//   FlatList,
//   UIManager,
//   LayoutAnimation,
//   TouchableOpacity,
//   SafeAreaView,
//   Platform,
// } from 'react-native';
 
// import Card from './Card';
// console.disableYellowBox = true;
 
// if (Platform.OS === 'android') {
//   UIManager.setLayoutAnimationEnabledExperimental &&
//     UIManager.setLayoutAnimationEnabledExperimental(true);
// }
// const imageUrl =
//   'https://raw.githubusercontent.com/AboutReact/sampleresource/master/logosmalltransparen.png';
 
// const App = () => {
//   const [dataSource, setDataSource] = useState([]);
 
//   const setAnimation = () => {
//     LayoutAnimation.configureNext({
//       duration: 250,
//       update: {
//         type: LayoutAnimation.Types.easeIn,
//         springDamping: 0.7,
//       },
//     });
//     LayoutAnimation.configureNext({
//       duration: 500,
//       create: {
//         type: LayoutAnimation.Types.easeIn,
//         property: LayoutAnimation.Properties.scaleXY,
//         springDamping: 0.7,
//       },
//     });
//   };
 
//   const addItem = (() => {
//     let key = dataSource.length;
//     return () => {
//       dataSource.unshift({
//         key,
//         uri: imageUrl,
//         title: 'Animated FlatList Example Heading' + key,
//         description: 'Please visit www.aboutreact.com',
//         animated: true,
//       });
//       setAnimation();
//       setDataSource(dataSource.slice(0));
//       key++;
//     };
//   })();
//   removeItem = (key) => {
//     setAnimation();
//     setDataSource(
//          dataSource.slice().filter((item) => item.key !== key)
//     );
//   };
 
//   const ItemView = ({item}) => {
//     return (
//       // Flat List Item
//       <Card item={item} removeItem={removeItem} />
//     );
//   };
 
//   const ItemSeparatorView = () => {
//     return (
//       // Flat List Item Separator
//       <View
//         style={{
//           height: 0.5,
//           width: '100%',
//           backgroundColor: '#C8C8C8',
//         }}
//       />
//     );
//   };
 
//   const getItem = (item) => {
//     // Function for click on an item
//     alert('Id : ' + item.id + ' Title : ' + item.title);
//   };
 
//   return (
//     <SafeAreaView style={{flex: 1}}>
//       <TouchableOpacity
//         style={styles.addButtonStyle}
//         onPress={addItem}>
//         <Text style={styles.addIconStyle}>
//             Click to add list item
//         </Text>
//       </TouchableOpacity>
//       <FlatList
//         data={dataSource}
//         keyExtractor={(item, index) => index.toString()}
//         ItemSeparatorComponent={ItemSeparatorView}
//         renderItem={ItemView}
//       />
//     </SafeAreaView>
//   );
// };
 
// const styles = StyleSheet.create({
//   addButtonStyle: {
//     width: '100%',
//     elevation: 3,
//     backgroundColor: '#808080',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 15,
//   },
//   addIconStyle: {
//     color: 'white',
//     padding: 10,
//     fontSize: 20,
//     textAlign: 'center',
//   },
// });
 
// export default App;
