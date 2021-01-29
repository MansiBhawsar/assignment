import React, { useState } from 'react';
import { Button, Text, View, FlatList, Dimensions, Alert } from 'react-native';
import {data} from './data';
import RadioGroup from 'react-native-radio-buttons-group';

function Assignment() {
  const correctAnswers = {};
  JSON.parse(data).map((val, idx) => correctAnswers[idx] = val.correctIndex);
  const [userAnswers, setUserAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  
  let flatListRef;

  const _renderItem = ({ item }) => {
    return (
      <View
        style={{
          padding: 16,
          width: Dimensions.get('screen').width,
        }}>
        <Text>{item.question}</Text>
        <RadioGroup
            radioButtons={item.answers.map((ans, idx) => { return {value: idx.toString(), label: ans}})}
            onPress={(option) => { 
              setUserAnswers({...userAnswers, [item.key]: +option.find(o=>o.selected).value})
            }}
        />
      </View>
    );
  };
  return (
    <View style={{marginTop: 200}}>
      <FlatList
          data={JSON.parse(data).map((item,idx) => { return {...item, key: idx.toString()}})}
          renderItem={_renderItem}
          horizontal={true}
          onEndReachedThreshold={0}
          initialScrollIndex={0}
          scrollEnabled={false}
          ref={(ref) => { flatListRef = ref; }}
				ItemSeparatorComponent={() => <View style={{margin: 4}}/>}
      />
      <Button 
        title="Submit"
        onPress={()=>{
          console.log(JSON.parse(data).length, currentQuestion);
          if(JSON.parse(data).length === currentQuestion + 1){
            let score = 0;
            for(const ans in userAnswers){
              if(correctAnswers[ans] === userAnswers[ans]){
                score++;
              }
            }
            Alert.alert(`Your score is :- ${score}`);
          } else {
            flatListRef.scrollToIndex({animated: true, index: currentQuestion + 1});
            setCurrentQuestion(currentQuestion + 1)
            console.log(currentQuestion);
          }
        }}
      />
        
    </View>
  );
}

export default  Assignment;