import React, { Component } from 'react';
import {
  Text,
  View,
  ViewPropTypes,
  StyleSheet,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';

import Bubble from '@zdy/react-native-chat-bubble';

export default class Test extends React.Component{
  constructor(props){
    super(props);

  }

  render(){
    const currentMessage = {
      // text: '我的手机是：15810536985，email是： maiz9088@icloud.com   https://baidu.com',
      createdAt: '2017-07-07',
      image: 'https://img3.doubanio.com/img/fmadmin/large/708963.jpg',
    };
    return (
      <View style={styles.container}>
        <Bubble currentMessage={currentMessage}/>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    top: 60,
    flex:1,

  },


});
