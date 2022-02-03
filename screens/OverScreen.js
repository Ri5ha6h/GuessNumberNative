import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import MyButton from '../components/MyButton';

const OverScreen = (props) => {
  return (
    <ScrollView>
      <View style={styles.overCont}>
        <Text>Game OVER!!!</Text>
        <View style={styles.imgCont}>
          <Image
            source={require('../assets/success.png')}
            style={styles.img}
          />
        </View>
        <Text>
          Number of Rounds to complete the game:{' '}
          {props.rounds}
        </Text>
        <Text>
          Number entered by User:{' '}
          {props.userNumber}
        </Text>
        <MyButton onPress={props.newGame}>
          NEW GAME
        </MyButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  overCont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  imgCont: {
    height: 300,
    width: 300,
    borderWidth: 1,
    borderRadius: 150,
    overflow: 'hidden',
    marginVertical: 12,
    borderColor: 'white',
  },
  img: {
    height: '100%',
    width: '100%',
  },
});

export default OverScreen;
