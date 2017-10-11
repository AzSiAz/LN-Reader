import React from 'react'
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import Swiper from 'react-native-swiper'
import Icon from 'react-native-vector-icons/Ionicons'

// TODO (Stef): To Improve
export default class IntroComponent extends React.PureComponent {
  render() {
    const { hideIntro } = this.props

    return (
      <View style={styles.container}>
        <Swiper style={styles.wrapper} showsButtons={true} loop={false}>
          <View style={styles.slide1}>
            <Text style={styles.title}>Read Light Novel</Text>
            <Text style={styles.text}>
              Read novel from baka-tsuki directly inside the application
            </Text>
          </View>
          <View style={styles.slide2}>
            <Text style={styles.title}>Multiple Language</Text>
            <Text style={styles.text}>
              Don't read in english ? you can also do it in spanish or french
              (more to come)
            </Text>
          </View>
          <View style={styles.slide3}>
            <Text style={styles.title}>Save Light Novel</Text>
            <Text style={styles.text}>
              Don't want to remember which novel you are reading, you can save
              them
            </Text>
          </View>
          <View style={styles.slide4}>
            <Text style={styles.title}>Notification</Text>
            <Text style={styles.text}>
              Soon you will be able to receive Push notification on your
              favorite novel update
            </Text>
          </View>
        </Swiper>
        <TouchableHighlight onPress={hideIntro}>
          <View style={styles.doneButton}>
            <Text style={{ color: '#fff' }}>Done</Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  doneButton: {
    height: 50,
    backgroundColor: '#2c3e50',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
  },
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#7f8c8d'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#7f8c8d'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#7f8c8d'
  },
  slide4: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#7f8c8d'
  },
  title: {
    marginLeft: 15,
    marginRight: 15,
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold'
  },
  text: {
    marginLeft: 40,
    marginRight: 40,
    marginTop: 15,
    color: '#fff',
    fontSize: 18
  }
})
