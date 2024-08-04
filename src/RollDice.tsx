import React, { useRef, useState } from 'react';
import {
    StyleSheet, 
    View, 
    Text,
    Image,
    Animated,
    SafeAreaView,
    ImageSourcePropType,
    Button
} from 'react-native';
import Dice1 from './assets/dice1.png';
import Dice2 from './assets/dice2.png';
import Dice3 from './assets/dice3.png';
import Dice4 from './assets/dice4.png';
import Dice6 from './assets/dice5.png';
import Dice5 from './assets/dice6.png';

import type {PropsWithChildren} from 'react';

type DiceProps = ImageSourcePropType

const RollDice = () => {
    const [currentDiceImage, setCurrentDiceImage] = useState<DiceProps>(Dice1);
    const [currentDiceNumber, setCurrentDiceNumber] = useState(1);
    const flipAnim = useRef(new Animated.Value(0)).current;


    const setDiceImage = (dice: number)=> {
        switch (dice) {
            case 1:
                setCurrentDiceImage(Dice1)
                break;
            case 2:
                setCurrentDiceImage(Dice2)
                break;
            case 3:
                setCurrentDiceImage(Dice3)
                break;
            case 4:
                setCurrentDiceImage(Dice4)
                break;
            case 5:
                setCurrentDiceImage(Dice5)
                break;
            case 6:
                setCurrentDiceImage(Dice6)
                break;
            default:
                setCurrentDiceImage(Dice1)
                break;
        }
    }

    const rollTheDice = (dice: number) => {
        const currentDice = Math.floor((Math.random() * 6))
         // Reset the animation value
        flipAnim.setValue(0);

        // Start the flip animation
        Animated.timing(flipAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
        }).start(() => {
        // Update the dice image after the animation completes
        setCurrentDiceNumber(currentDice)
        setDiceImage(currentDice)
        });
    }

    const rollInterpolateX = flipAnim.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: ['0deg', '90deg', '180deg'],
    });

    const rollInterpolateY = flipAnim.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: ['0deg', '90deg', '180deg'],
      });

    const animatedStyle = {
        transform: [
            { rotateY: rollInterpolateY },
            { rotateX: rollInterpolateX },
          ]
    };


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.diceImageContainer}>
                <Animated.View style={animatedStyle}>
                    <Image style={styles.diceImage} source={currentDiceImage}/>
                </Animated.View>
                <View style={styles.diceButton}>
                    <Button onPress={()=>rollTheDice(currentDiceNumber)} title='Roll The Dice'/>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    diceImage:{
        height:150,
        width:150,
        backgroundColor:"yellow",
        borderRadius:15
    },
    diceButton:{
        margin:5,
        padding:8,
    },
    diceImageContainer:{
        flex: 1,
        backgroundColor:"white",
        color:"black",
        alignItems:'center',
        justifyContent: 'center',
    },
    container:{
        flex:1,
        backgroundColor :"black",
    }
})

export default RollDice;
