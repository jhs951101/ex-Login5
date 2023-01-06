import React from 'react';
import { View, Text, Button } from 'react-native';

export default function UserInfoScreen({route, navigation}) {

  const {username, name, gender} = route.params;

  return(
    <View>
      <Text>이름: {name}</Text>
      <Text>아이디: {username}</Text>
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