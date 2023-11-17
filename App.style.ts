import { StyleSheet, Platform } from 'react-native';

const theme = StyleSheet.create({

  default: {
    color: '#ffff',
    backgroundColor: '#202029',
    fontFamily: 'Metro'
  },

  alt: {
    color: '#202029',
    backgroundColor: '#E5E7EB',
    fontFamily: 'Metro'
  },

  text: {
    color: '#ffff',
    textAlign: 'left',
    fontWeight: 300,
    margin: '2%',
    fontSize: 16,
    fontFamily: 'Metro'
  }

});


export default theme;
