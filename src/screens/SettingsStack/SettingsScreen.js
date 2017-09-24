import React from 'react'
import { View, AsyncStorage, Alert, StyleSheet } from 'react-native'
import { List, ListItem } from 'react-native-elements'

export default class SettingsScreen extends React.PureComponent {
  static navigationOptions = {
    title: 'Settings',
    // headerStyle: {},
    headerTitleStyle: {
      color: 'black'
    }
  }
  
  async clearAppInfo() {
    await AsyncStorage.removeItem('info')
    Alert.alert('Done', 'Cleared App Info reload app for it to take effect', [
      {text: 'OK'}
    ], {
      cancelable: false
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <List>
          <ListItem
            hideChevron
            underlayColor='lightgrey'
            title='Clear App Information'
            subtitle='Reset Intro'
            onPress={this.clearAppInfo}
          />
        </List>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})