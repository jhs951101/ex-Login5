import React, { useState } from 'react';
import {
  StyleSheet, View, Text, TextInput, Button, Alert, BackHandler, TouchableWithoutFeedback, Keyboard
} from 'react-native';

import axios from 'axios';

export default function LoginScreen({navigation}) {

  const [usernameTxt, setUsernameTxt] = useState('');
  const [passwordTxt, setPasswordTxt] = useState('');

  const changeHandler_usernameTxt = (val) => {
      setUsernameTxt(val);
  }

  const changeHandler_passwordTxt = (val) => {
      setPasswordTxt(val);
  }

  const get = async (originalUrl, data) => {
    var result = null;

    var url = originalUrl;
    var first = true;

    for(var key in data){
      var conn = '&';

      if (first){
          conn = '?';
      }

      url += (conn + key + "=" + data[key]);
      first = false;
    }

    const response = await axios.get(url);
    
    if(response.status == 200){
      result = response.data;
    }

    return result;
  }

  const post = async (originalUrl, data) => {
    var result = null;

    const response = await axios.post(
      originalUrl,
        JSON.stringify(data),
        { headers: { 'Content-Type': 'application/json'} }
      );
    
    if(response.status == 200){
      result = response.data;
    }

    return result;
  }

  const submitHandler = async (usernameTxt, passwordTxt) => {

      if(usernameTxt.length < 1){
        Alert.alert('Error', '아이디를 입력하십시오', [
          {text: '확인'}
        ]);
      }
      else if(passwordTxt.length < 1){
        Alert.alert('Error', '비밀번호를 입력하십시오', [
          {text: '확인'}
        ]);
      }
      else {
        const response = await post(
          '(URL 입력)',
          {
            username: usernameTxt,
            password: passwordTxt,
          }
        );

        if(response == null){
          Alert.alert('Error', '통신 중 오류가 발생하였습니다', [
            {text: '확인'}
          ]);
        }
        else{
          if(response.success){
            navigation.navigate('UserInfo', {
              username: usernameTxt,
              name: response.name,
            });
          }
          else{
            Alert.alert('Error', '아이디 또는 비밀번호가 일치하지 않습니다', [
              {text: '확인'}
            ]);
          }
        }
      }
  }

  const quitHandler = () => {
    BackHandler.exitApp();
  }

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}>
      <View style={styles.container}>
        <View style={styles.inner_container}>
          <Text style={[styles.output_text, styles.items]}>
            Welcome!
          </Text>

          <TextInput
            style={[styles.input_text, styles.items]}
            placeholder='아이디를 입력하십시오'
            onChangeText={changeHandler_usernameTxt}
          />

          <TextInput
            style={[styles.input_text, styles.items]}
            placeholder='비밀번호를 입력하십시오'
            onChangeText={changeHandler_passwordTxt}
          />

          <Button
            title='로그인'
            color='#00C800'
            onPress={() => submitHandler(usernameTxt, passwordTxt)}
          />

          <Button
            title="회원가입"
            color='#00C8FF'
            /*onPress={() => navigation.navigate('SignUp')}*/
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  inner_container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    justifyContent: 'center',
  },

  items: {
    marginBottom: 10,
    paddingHorizontal: 5,
    paddingVertical: 6,
  },

  output_text: {
      fontWeight: 'bold',
      textAlign: 'center',
  },

  input_text: {
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
  },
})
