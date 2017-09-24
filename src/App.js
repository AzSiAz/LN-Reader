import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  AsyncStorage,
} from 'react-native';
import Info from 'react-native-device-info'

import TabNavigator from './screens'
import IntroComponent from './components/IntroComponent'

export default class LNReader extends Component {

  state = {
    showInfo: false,
    isFetching: true
  }

  async componentWillMount() {
    try {
      const currentInfo = {
        version: Info.getReadableVersion(),
        deviceVersion: Info.getSystemVersion()
      }
      const storedInfo = await AsyncStorage.getItem('info')
      const prevInfo = JSON.parse(storedInfo)

      const showInfo = this.showInfo(prevInfo, currentInfo)

      this.setState((prevState) => (
        {...prevState, showInfo: showInfo, isFetching: false }
      ))
    }
    catch(e) {
      this.setState((prevState) => (
        {...prevState, showInfo: true, isFetching: false }
      ))
    }
  }

  showInfo(prevInfo, currentInfo) {
    return prevInfo.version === currentInfo.version ? false : true
  }

  hideIntro = async () => {
    const currentInfo = {
      version: Info.getReadableVersion(),
      deviceVersion: Info.getSystemVersion()
    }
    await AsyncStorage.mergeItem('info', JSON.stringify(currentInfo))

    this.setState((prevState) => (
      { ...prevState, showInfo: false }
    ))
  }

  render() {

    const { showInfo, isFetching } = this.state

    if (isFetching) return null
    if (showInfo) return <IntroComponent hideIntro={this.hideIntro} />

    return <TabNavigator />
  }
}

AppRegistry.registerComponent('LNReader', () => LNReader);
