import React, { useMemo, useState } from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';
import { Dimensions } from 'react-native';
import { TransactionData } from '../constants/transactionData';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const TransactionCard = ({}: any) => {
  //     {TransactionData.map((data,i)=>(
  // <View style={styles.transactionWrap}>
  //           <View key={i} style={styles.leftWrap}>
  //           <View style={styles.iconWrap}>
  //           {data.icon==="up"?<Image
  //                 style={{
  //                   width: windowWidth/12,
  //                   // marginTop:windowWidth/15
  //                 }}
  //                 resizeMode="contain"
  //                 source={require('../assets/images/Downloadcirclefill.png')}
  //               />:
  //               <Image
  //                 style={{
  //                   width: windowWidth/12,
  //                   // marginTop:windowWidth/15
  //                 }}
  //                 resizeMode="contain"
  //                 source={require('../assets/images/Loadcirclefill.png')}
  //               />
  //               }
  //               </View>
  //               <View>
  //                   <Text style={styles.transactionText}>Fund Added</Text>
  //                   <Text style={styles.fee}>Card Set up fee</Text>
  //                   <Text style={styles.transactionDate}>{data.date}</Text>
  //               </View>
  //               </View>
  //               <View>
  //               <View style={styles.flagWrap}>
  //                   <Text style={styles.currency}>Currency</Text>
  //                   <Image
  //                 style={{
  //                   width: windowWidth/18,
  //                   marginLeft:windowWidth/50
  //                 }}
  //                 resizeMode="contain"
  //                 source={require('../assets/images/flag.png')}
  //               />
  //                   </View>
  //                   <Text style={styles.state3}>Debit</Text>
  //               </View>
  //               <View style={{alignItems:"flex-end"}}>
  //                   <Text style={{...styles.amount,color:data.color}}>{`${data.amount}`}</Text>
  //                   <Text style={styles.state3}>Balance: {data.balance}</Text>
  //               </View>
  //        </View> )}
};

const styles = StyleSheet.create({
  transactionWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#2F3B71',
    width: '100%',
    borderRadius: windowWidth / 60,
    paddingHorizontal: windowWidth / 60,
    paddingVertical: windowWidth / 30,
    marginTop: windowHeight / 40,
    alignItems: 'center',
  },
  leftWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionText: {
    color: '#fff',
    fontSize: windowWidth / 30,
    fontWeight: '700',
  },
  fee: {
    color: '#fff',
    fontSize: windowWidth / 36,
  },
  transactionDate: {
    color: 'gray',
    fontSize: windowWidth / 36,
  },
  currency: {
    color: '#fff',
    fontSize: windowWidth / 30,
    // fontWeight:"bold"
  },
  amount: {
    color: '#FF4B38',
    fontSize: windowWidth / 30,
    fontWeight: '700',
  },
  amount2: {
    color: '#6FCF97',
    fontSize: windowWidth / 30,
    fontWeight: '700',
  },
  state3: {
    color: '#fff',
    fontSize: windowWidth / 30,
    // fontWeight:"bold"
  },
  flagWrap: {
    flexDirection: 'row',
  },
  iconWrap: {
    backgroundColor: '#182561',
    borderRadius: windowWidth / 2,
    width: windowWidth / 10,
    alignItems: 'center',
    marginRight: windowWidth / 100,
  },
});

export default TransactionCard;
