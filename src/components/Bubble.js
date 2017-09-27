/**
 *
 * the Component which show user talking bubble
 *
 * @zack
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ViewPropTypes,
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';

import MessageText from './MessageText';
import MessageImage from './MessageImage';
import Time from './Time';

class Bubble extends Component{
  constructor(props) {
    super(props);
    this.onLongPress = this.onLongPress.bind(this);
  }

  render(){
    return (
      <View style={[styles[this.props.position].containerStyle, this.props.containerStyle[this.props.position]]}>
        {this.props.position === 'left' ? this.renderTriangle() : null}
        {this.props.position === 'right' ? this.renderStatusView() : null}
        {this.renderBubble()}
        {this.props.position === 'left' ? this.renderStatusView() : null}
        {this.props.position === 'right' ? this.renderTriangle() : null}
      </View>
    );
  }

  onLongPress() {
  }

  renderTriangle() {
    var bkcolor = StyleSheet.flatten(styles[this.props.position].wrapperStyle).backgroundColor;
    return (
      <View style={[styles[this.props.position].triangleStyle, {borderBottomColor:bkcolor}]}/>
    );
  }

  renderBubble() {
    return (
      <View style={[styles[this.props.position].wrapperStyle, this.props.wrapperStyle[this.props.position]]}>
        <TouchableWithoutFeedback
        onLongPress={this.onLongPress}
        accessibilityTraits="text"
        {...this.props.touchableProps}>
          <View>
          {this.renderMessageImage()}
          {this.renderMessageText()}
          { this.props.showTime ?
            <View style={[styles.bottomContainerStyle, this.props.bottomContainerStyle[this.props.position]]}>
                {this.renderTime()}
                {this.renderStatus()}
            </View>
           : null}

          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  renderStatusView() {
    // return (
    //   <View style = {styles.statusStyle}>
    //     {this.props.renderStatusView(this.props)}
    //   </View>
    // );
    if (this.props.renderStatusView) {
      return this.props.renderStatusView(this.props);
    }
    return null;
  }

  renderMessageImage() {
    if (this.props.currentMessage.image) {
      const {containerStyle, wrapperStyle, ...messageImageProps} = this.props;
      if (this.props.renderMessageImage) {
        return this.props.renderMessageImage(messageImageProps);
      }
      return <MessageImage {...messageImageProps}/>;
    }
    return null;
  }

  renderMessageText() {
    if (this.props.currentMessage.text) {
      const {containerStyle, wrapperStyle, ...messageTextProps} = this.props;
      if (this.props.renderMessageText) {
        return this.props.renderMessageText(messageTextProps);
      }

      return <MessageText {...messageTextProps} />;
    }
    return null;
  }

  renderTime() {
    if (this.props.currentMessage.createdAt) {
      const {containerStyle, wrapperStyle, ...timeProps} = this.props;
      if (this.props.renderTime) {
        return this.props.renderTime(timeProps);
      }
      return <Time {...timeProps}/>;
    }
    return null;
  }

  renderStatus() {
    const { currentMessage } = this.props;
    if (this.props.renderStatus) {
        return this.props.renderStatus(currentMessage);
    }
    // status这里，如果为undifed，也是发送成功，后续完善
    if (currentMessage.status) {
      return (
        <View style={styles.statusViewStyle}>
          {currentMessage.status === '' && <Text style={[styles.statusStyle, this.props.statusStyle]}>✓</Text>}
          {currentMessage.status === 'received' && <Text style={[styles.statusStyle, this.props.statusStyle]}>✓</Text>}
          {currentMessage.status === 'sendError' && <Text style={[styles.statusStyle, this.props.statusStyle]}>x</Text>}
        </View>
      )
    }
  }
}

Bubble.defaultProps = {
  position: 'left',
  containerStyle: {},
  wrapperStyle: {},
  touchableProps: {},
  renderStatusView: null,
  currentMessage: {
    text: null,
    createdAt: null,
    image: null,
  },
  renderMessageImage: null,
  renderMessageText: null,
  bottomContainerStyle: {},
  renderTime: null,
  statusStyle: {},
  showTime: false,
};

Bubble.propTypes = {
  position: PropTypes.oneOf(['left', 'right']),
  containerStyle: PropTypes.shape({
    left: ViewPropTypes.style,
    right: ViewPropTypes.style,
  }),
  wrapperStyle: PropTypes.shape({
    left: ViewPropTypes.style,
    right: ViewPropTypes.style,
  }),
  currentMessage: PropTypes.object,
  renderMessageImage: PropTypes.func,
  renderMessageText: PropTypes.func,
  bottomContainerStyle: PropTypes.shape({
    left: ViewPropTypes.style,
    right: ViewPropTypes.style,
  }),
  renderTime: PropTypes.func,
  touchableProps: PropTypes.object,
  renderStatusView: PropTypes.func,
  statusStyle: Text.propTypes.style,
  showTime: PropTypes.bool,
};

const styles = {
  left: StyleSheet.create({
    containerStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    wrapperStyle: {
      borderRadius: 15,
      backgroundColor: '#f0f0f0',
      marginRight: 6,
      minHeight: 20,
      maxWidth: Dimensions.get('window').width - 80,
    },
    triangleStyle: {
      width: 0,
      height: 0,
      backgroundColor: 'transparent',
      borderStyle: 'solid',
      borderLeftWidth: 3,
      borderRightWidth: 3,
      borderBottomWidth: 6,
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      transform: [
        {rotate: '-90deg'}
      ],
    }

  }),
  right: StyleSheet.create({
    containerStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    wrapperStyle: {
      borderRadius: 15,
      backgroundColor: '#0084ff',
      marginLeft: 6,
      minHeight: 20,
      maxWidth: Dimensions.get('window').width - 80,
    },
    triangleStyle: {
      width: 0,
      height: 0,
      backgroundColor: 'transparent',
      borderStyle: 'solid',
      borderLeftWidth: 3,
      borderRightWidth: 3,
      borderBottomWidth: 6,
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      transform: [
        {rotate: '90deg'}
      ],
    }
  }),
  bottomContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderRadius: 13,
    overflow: 'hidden',  //使得超出borderRadius部分隐藏
    marginRight: 5,
    marginLeft: 5,
  },
  statusViewStyle: {
    flexDirection: 'row',
    marginRight: 10,
  },
  statusStyle: {
    fontSize: 10,
    backgroundColor: 'transparent',
    color: 'black',
  },

}

const triangleStyleCom = {
  width: 0,
  height: 0,
  backgroundColor: 'transparent',
  borderStyle: 'solid',
  borderLeftWidth: 3,
  borderRightWidth: 3,
  borderBottomWidth: 6,
  borderLeftColor: 'transparent',
  borderRightColor: 'transparent',
};


module.exports = Bubble;
