/**
 * 
 * the Component which show image style message
 *
 * @zack
 */

import React, {Component} from 'react';
import {
  Image,
  View,
  ViewPropTypes,
  StyleSheet,
  Dimensions
} from 'react-native';
import PropTypes from 'prop-types';

import Lightbox from 'react-native-lightbox';

class MessageImage extends Component{
  render(){
    const { width, height } = Dimensions.get('window');
    return (
      <View style={[styles.containerStyle, this.props.containerStyle]}>
        <Lightbox
          activeProps = {{
            style:[styles.imageActiveStyle, { width, height}]
          }}
          {...this.props.lightboxProps}>
          <Image
            {...this.props.imageProps}
            style={[styles.imageStyle, this.props.imageStyle]}
            source={{uri: this.props.currentMessage.image}} />
        </Lightbox>
      </View>
    );
  }
}

MessageImage.defaultProps = {
  containerStyle: {},
  lightboxProps: {},
  imageStyle: {},
  imageProps: {},
  currentMessage: {
    image: null,
  },
};

MessageImage.propTypes = {
  containerStyle: ViewPropTypes.style,
  lightboxProps: PropTypes.object,
  imageStyle: ViewPropTypes.style,
  imageProps: PropTypes.object,
  currentMessage: PropTypes.object,
};

const styles = StyleSheet.create({
  containerStyle: {
  },
  imageStyle:{
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
    resizeMode: 'cover',
  },
  imageActiveStyle:{
    resizeMode: 'contain',
  }
});

module.exports = MessageImage;
