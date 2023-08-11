import React, { useState, useRef } from 'react'
import { View, Text, TouchableOpacity, Alert, TextInput, ScrollView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Ionicons } from '@expo/vector-icons'
import { Video, ResizeMode } from 'expo-av'
import * as Clipboard from 'expo-clipboard'
import Toast from 'react-native-toast-message'

interface Props {

}

const App: React.FC<Props> = () => {

  const video = useRef<any>(null)
  const [status, setStatus] = useState<any>({})
  const [beshyText, setBeshyText] = useState<string>('')

  const clearText = () => {
    if (beshyText.length > 0) {
      Alert.alert(
        "CLEAR TEXT BESHY 🤸",
        "Sure ka ba beshy ko? 🤸",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          {
            text: "Clear",
            style: "destructive",
            onPress: () => setBeshyText('')
          }
        ]
      )
    } else {
      setBeshyText('')
    }
  }

  const copyClipboard = async () => {

    const beshyTextWithEmoji = beshyText.replace(/\s+/g, ' 🤸 ')

    await Clipboard.setStringAsync(beshyTextWithEmoji)

    status && video.current.playFromPositionAsync(5000)

    if (!beshyText) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Wala kang nilagay na text beshy ko 🤸',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
      });
      return;

    } else {
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Ok na beshy ko HAHHAHAHAHAHHA! 🤸',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30
      })
    }
  }

  return (
    <View className='mt-14 justify-center items-center'>
      <Text className='text-lg text-center mb-4'>
        BeshyKo 🤸
      </Text>
      <Video
        className='w-[260px] h-[200px] rounded-xl'
        ref={video}
        source={{
          uri: 'https://bat-malungkot-ang-beshy-ko.vercel.app/video.mp4'
        }}
        isMuted={false}
        useNativeControls={true}
        resizeMode={ResizeMode.CONTAIN}
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
      <View className='mt-10'>
        <TextInput
          className='border-2 border-[#cbd5e1] rounded-xl text-lg h-[160px] w-[360px] px-4'
          placeholder='Type 🤸 ka 🤸 rito 🤸 beshy 🤸 ko'
          placeholderTextColor='#cbd5e1'
          multiline={true}
          onChangeText={text => setBeshyText(text)}
          value={beshyText}
          blurOnSubmit={true}
        />
      </View>
      <ScrollView scrollEnabled={false}
        className={`${beshyText.length > 0 ? 'flex' : 'hidden'}`}>
        <View className='flex-row mt-4 h-12 w-[360px] px-4 justify-between items-center bg-[#64748b]'>
          <Text className='text-lg text-white'>
            Generated Text
          </Text>
          <View className='flex-row'>
            <TouchableOpacity className='px-4' onPress={clearText}>
              <Ionicons name="trash-outline" size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity onPress={copyClipboard}>
              <Ionicons name="ios-copy-outline" size={24} color="white" />
            </TouchableOpacity>

          </View>
        </View>
        <ScrollView
          className={`px-4 border-2 border-[#cbd5e1] w-[360px] h-32`}
        >
          <Text className='text-lg text-left'>
            {beshyText.replace(/\s+/g, ' 🤸 ')}
          </Text>

        </ScrollView>
      </ScrollView>


      {/* copy and clear btn */}
      {/* <View className='flex-row mt-8'>

        <TouchableOpacity onPress={clearText}
          className='border-2 border-[#cbd5e1] rounded-xl h-[40px] 
        w-[120px] bg-[#f1f5f9] flex-row justify-center items-center mx-4'>
          <Ionicons
            name='trash'
            size={30}
            color="#dc2626"
          />
          <Text className='text-center pl-2 font-bold'>
            Clear
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={copyClipboard}
          className='border-2 border-[#cbd5e1] rounded-xl h-[40px] w-[120px]
        bg-[#f1f5f9] flex-row justify-center items-center mx-4'>
          <Ionicons
            name='copy'
            size={30}
            color="#0ea5e9"
          />
          <Text className='text-center pl-2 font-bold'>
            Copy
          </Text>

        </TouchableOpacity>

      </View> */}

      <StatusBar style='auto' />
      <Toast />
    </View >
  )
}

export default App;