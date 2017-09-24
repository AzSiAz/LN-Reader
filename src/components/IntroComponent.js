import React from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AppIntro from 'react-native-app-intro'
import Icon from 'react-native-vector-icons/Ionicons'


// TODO (Stef): To Improve
export default class IntroComponent extends React.PureComponent {
  render() {
    const { hideIntro } = this.props

    const pageArray = [{
        title: 'Read Light Novel',
        description: 'Read novel from baka-tsuki directly inside the application',
        backgroundColor: '#7f8c8d',
        fontColor: '#fff',
        level: 10,
      },
      {
        title: 'Multiple Language',
        description: "Don't read in english ? you can also do it in spanish or french (more to come)",
        fontColor: '#fff',
        backgroundColor: '#7f8c8d',
        level: 10
      }, {
        title: 'Save Light Novel',
        description: "Don't want to remember which novel you are reading, you can save them",
        fontColor: '#fff',
        backgroundColor: '#7f8c8d',
        level: 10
      }, {
        title: 'Notification',
        description: 'Soon you will be able to receive Push notification on your favorite novel update',
        fontColor: '#fff',
        backgroundColor: '#7f8c8d',
        level: 10
      }
    ];

    return (
      <AppIntro 
        customStyles={{btnContainer: {flex: 1}}}
        onDoneBtnClick={hideIntro}
        onSkipBtnClick={hideIntro}
        pageArray={pageArray}
      />
    )
  }
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
    padding: 15,
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});