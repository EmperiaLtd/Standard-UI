import { View, ViewStyle, Text, TextStyle, Platform } from 'react-native';

const GenericModal = ({width, height, containerStyle, contentContainerStyle, textStyle}:any) => {

  const modalContainer:ViewStyle = {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    width: width,
    height: height,
    backgroundColor: '#ffffff33',
    backdropFilter: 'blur(10px)',
    webkitBackdropFilter: 'blur(10px)'
  };

  const contentContainer:ViewStyle = {
    flexDirection: 'column',
    alignItems: 'bottom',
    justifyContent: 'flex-end',
    width: width,
    height: height,
    backgroundColor: 'red'
  };

  const leftContentContainer:ViewStyle = {
    backgroundColor: 'blue',
  };

  const rightContentContainer:ViewStyle = {
    backgroundColor: 'green',
  };

  const text:TextStyle = {
    color: '#202029'
  };

  return <>
    <View style={[ modalContainer, containerStyle ]}>
      <View style={[ contentContainer, contentContainerStyle ]}>
        <Text style={[ text, textStyle ]}>Hello World</Text>
      </View>
    </View>
  </>;
};

export default GenericModal;
