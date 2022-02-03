import React, {
  useState,
  useRef,
  useEffect,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import Number from '../components/Number';
import Card from '../components/Card';
import MyButton from '../components/MyButton';
import { Entypo } from '@expo/vector-icons';
import colors from '../constants/colors';

const randomNumGen = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum =
    Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return randomNumGen(min, max, exclude);
  } else {
    return rndNum;
  }
};

const renderListItem = (listLength, itemData) => (
  <View style={styles.listItem}>
    <Text>#{listLength - itemData.index}</Text>
    <Text>{itemData.item}</Text>
  </View>
);

const GameScreen = (props) => {
  const initialGuess = randomNumGen(
    1,
    100,
    props.userChoice
  );
  const [currentGuess, setCurrentGuess] =
    useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([
    initialGuess,
  ]);
  const [mode, setMode] = useState(
    Dimensions.get('window').height
  );

  const { userChoice, gameOver } = props;

  useEffect(() => {
    const updateMode = () => {
      setMode(Dimensions.get('window').height);
    };

    const heightLayout =
      Dimensions.addEventListener(
        'change',
        updateMode
      );

    return () => {
      heightLayout?.remove();
    };
  }, [Dimensions]);

  useEffect(() => {
    if (currentGuess === userChoice) {
      gameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, gameOver]);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  const nextGuess = (direction) => {
    if (
      (direction === 'lower' &&
        currentGuess < props.userChoice) ||
      (direction === 'higher' &&
        currentGuess > props.userChoice)
    ) {
      Alert.alert(
        "Don't lie!!!",
        'Do tell correct hint!!!',
        [{ text: 'Sorry!', style: 'cancel' }]
      );
      return;
    }
    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNum = randomNumGen(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNum);
    // setRounds((r) => r + 1);
    setPastGuesses((curPastGuess) => [
      nextNum,
      ...curPastGuess,
    ]);
  };

  let gameControls = (
    <>
      <Number>{currentGuess}</Number>
      <Card style={styles.btnCont}>
        <MyButton
          onPress={nextGuess.bind(this, 'lower')}
        >
          <Entypo
            name='thumbs-down'
            size={24}
            color='white'
          />
        </MyButton>
        <MyButton
          onPress={nextGuess.bind(this, 'higher')}
        >
          <Entypo
            name='thumbs-up'
            size={24}
            color='white'
          />
        </MyButton>
      </Card>
    </>
  );

  if (mode < 500) {
    gameControls = (
      <View style={styles.landscape}>
        <MyButton
          onPress={nextGuess.bind(this, 'lower')}
        >
          <Entypo name='thumbs-down' size={24} />
        </MyButton>
        <Number>{currentGuess}</Number>
        <MyButton
          onPress={nextGuess.bind(this, 'higher')}
        >
          <Entypo name='thumbs-up' size={24} />
        </MyButton>
      </View>
    );
  }

  return (
    <View style={styles.gameCont}>
      <Text>Opponent's Guess</Text>
      {gameControls}
      <View style={styles.listCont}>
        {/* <ScrollView
          contentContainerStyle={styles.list}
        >
          {pastGuesses.map((guess, i) => (
            <View key={i} style={styles.listItem}>
              <Text>
                #{pastGuesses.length - i}
              </Text>
              <Text>{guess}</Text>
            </View>
          ))}
        </ScrollView> */}
        <FlatList
          keyExtractor={(item) => item}
          data={pastGuesses}
          renderItem={renderListItem.bind(
            this,
            pastGuesses.length
          )}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gameCont: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
  },
  landscape: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '70%',
    marginVertical: 6,
  },
  btnCont: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '80%',
    minWidth: 300,
    maxWidth: '95%',
  },
  listCont: {
    flex: 1,
    width: '70%',
  },
  list: {
    flexGrow: 1,
    // alignItems: 'center',
    justifyContent: 'flex-end',
  },
  listItem: {
    marginVertical: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
    width: '100%',
  },
});

export default GameScreen;
