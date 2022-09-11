import React from 'react'
import { View } from 'react-native'
import { WebView } from 'react-native-webview'

const Web = ({ route }) => {
  const event_url = route.params.item['event_url']
  return (
    <View style={{ flex: 1 }}>
        <WebView
            source={{ uri: event_url }}
            style={{ flex: 1}}
        />
    </View>
  )
}

export default Web;