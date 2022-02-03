import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  TouchableNativeFeedback,
} from 'react-native';
import colors from '../constants/colors';

const MyButton = (props) => {
  let ButtonComponent = TouchableOpacity;

  if (
    Platform.OS === 'android' &&
    Platform.Version >= 21
  ) {
    ButtonComponent = TouchableNativeFeedback;
  }

  return (
    <View style={styles.mainCont}>
      <ButtonComponent
        activeOpacity={0.6}
        onPress={props.onPress}
      >
        <View
          style={{
            ...styles.btnCont,
            ...Platform.select({
              android: styles.btnAndroid,
            }),
          }}
        >
          <Text
            style={{
              ...styles.btnText,
              ...Platform.select({
                ios: styles.btnIos,
              }),
            }}
          >
            {props.children}
          </Text>
        </View>
      </ButtonComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  mainCont: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  btnCont: {
    marginVertical: 10,
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 20,
  },
  btnText: {
    color: 'white',
    fontFamily: 'open-sans',
    fontSize: 16,
  },
  btnIos: {
    fontSize: 18,
  },
  btnAndroid: {},
});

export default MyButton;
