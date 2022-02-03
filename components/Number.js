import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import colors from '../constants/colors';

const Number = (props) => {
  return (
    <View style={styles.numCont}>
      <Text style={styles.num}>
        {props.children}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  numCont: {
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 12,
    padding: 10,
    borderColor: colors.secondary,
  },
  num: {
    color: colors.secondary,
    fontSize: 20,
  },
});

export default Number;
