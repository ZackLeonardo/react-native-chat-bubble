/**
 *
 * the Component which show text style message
 *
 * @zack
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ViewPropTypes,
  Text,
  Linking,
  ActionSheetIOS
} from 'react-native';
import PropTypes from 'prop-types';

import ParsedText from 'react-native-parsed-text';

// import Communications from '../constants/communications';
import Communications from 'react-native-communications';

class MessageText extends Component{
  constructor(props) {
    super(props);
    this.handlePhonePress = this.handlePhonePress.bind(this);
    this.handleEmailPress = this.handleEmailPress.bind(this);
  }

  render() {
    return (
      <View style = {[
        styles[this.props.position].containerStyle,
        this.props.containerStyle[this.props.position]
      ]}>
        <ParsedText
          style = {[
            styles[this.props.position].textStyle,
            this.props.textStyle[this.props.position]
          ]}
          parse = {[
            {
              type: 'url',
              style: StyleSheet.flatten([styles[this.props.position].linkStyle, this.props.linkStyle[this.props.position]]),
              onPress: Communications.web
            },
            {
              type: 'phone',
              style: StyleSheet.flatten([styles[this.props.position].phoneStyle, this.props.phoneStyle[this.props.position]]),
              onPress: this.handlePhonePress
            },
            {
              type: 'email',
              style: StyleSheet.flatten([styles[this.props.position].linkStyle, this.props.linkStyle[this.props.position]]),
              onPress: this.handleEmailPress
            },

          ]}
        >
          {this.props.currentMessage.text}
        </ParsedText>
      </View>
    );
  }

  handlePhonePress(phone) {
    const options = [
      'Text',
      'Call',
      'Cancel',
    ];
    const cancelButtonIndex = options.length - 1;
    ActionSheetIOS.showActionSheetWithOptions({
      options,
      cancelButtonIndex,
    },
    (buttonIndex) => {
      switch (buttonIndex) {
        case 0:
          Communications.text(phone);
          break;
        case 1:
          Communications.phonecall(phone, true);
          break;
      }
    });
  }

  handleEmailPress(email) {
    const options = [
      'email',
      'Cancel',
    ];
    const cancelButtonIndex = options.length - 1;
    ActionSheetIOS.showActionSheetWithOptions({
      options,
      cancelButtonIndex,
    },
    (buttonIndex) => {
      switch (buttonIndex) {
        case 0:
          Communications.email(email, null, null, null, null);
          break;
      }
    });
  }

}

MessageText.contextTypes = {
  actionSheet: PropTypes.func,
};

MessageText.defaultProps = {
  position: 'left',
  currentMessage: {
    text: '',
  },
  containerStyle: {},
  textStyle: {},
  linkStyle: {},
  phoneStyle: {}
};

MessageText.propTypes = {
  position: PropTypes.oneOf(['left', 'right']),
  currentMessage: PropTypes.object,
  containerStyle: PropTypes.shape({
    left: ViewPropTypes.style,
    right: ViewPropTypes.style,
  }),
  textStyle: PropTypes.shape({
    left: Text.propTypes.style,
    right: Text.propTypes.style,
  }),
  linkStyle: PropTypes.shape({
    left: Text.propTypes.style,
    right: Text.propTypes.style,
  }),
  phoneStyle: PropTypes.shape({
    left: Text.propTypes.style,
    right: Text.propTypes.style,
  })
};


const styles = {
  left: StyleSheet.create({
    containerStyle: {
      paddingTop: 3,
      borderRadius: 13,
      paddingBottom: 3,
    },
    textStyle: {
      margin: 3,
      color: 'black',
      ...textStyleCom,
    },
    linkStyle: {
      color: 'royalblue',
      textDecorationLine: 'underline',
    },
    phoneStyle: {
      color: 'royalblue',
    }
  }),
  right: StyleSheet.create({
    containerStyle: {
      paddingTop: 3,
      borderRadius: 13,
      paddingBottom: 3,
    },
    textStyle: {
      margin: 3,
      color: 'black',
      ...textStyleCom,
    },
    linkStyle: {
      color: 'royalblue',
      textDecorationLine: 'underline',
    },
    phoneStyle: {
      color: 'royalblue',
    }
  }),
}

const textStyleCom = {
  fontSize: 16,
  lineHeight: 20,
  marginTop: 5,
  marginBottom: 5,
  marginLeft: 10,
  marginRight: 10,
};

module.exports = MessageText;
