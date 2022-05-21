import 'react-native-gesture-handler';
import React from 'react';
import {View, Text, Button} from 'react-native';

export default function UserInfoScreen({route, navigation}) {

  const {username, name, gender} = route.params;

  return(
    <View>
      <Text>아이디: {username}, 이름: {name}, 성별: {gender}</Text>
      <Text>Curation Screen</Text>
      <Button
        title="Log Out"
        onPress={() =>{
          navigation.goBack()
        }}
      />
    </View>
  )
}