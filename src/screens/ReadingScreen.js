import React from 'react'
import {
  View,
  Text,
  ScrollView,
  WebView,
  AsyncStorage,
  Dimensions
} from 'react-native'
import { StackNavigator, NavigationActions } from 'react-navigation'
import HTML from 'react-native-render-html'
import { Icon } from 'react-native-elements'

import LoadingComponent from './../components/LoadingComponent'
import ErrorComponent from './../components/ErrorComponent'
import { getReaderPage } from './../api'

class ReadingScreen extends React.PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title,
    headerRight: (
      <Icon
        type="ionicon"
        name="ios-more"
        style={{ marginRight: 15 }}
        underlayColor="#EFEFF2"
        size={40}
        onPress={navigation.state.params.more}
      />
    ),
    headerLeft: (
      <Icon
        type="ionicon"
        name="ios-close"
        style={{ marginLeft: 15 }}
        underlayColor="#EFEFF2"
        size={40}
        onPress={navigation.state.params.back}
      />
    )
  })

  state = {
    html: '',
    isFetching: true,
    error: undefined,
    y: 0
  }

  async componentDidMount() {
    const { navigation } = this.props
    const { page } = this.props.navigation.state.params

    navigation.setParams({
      more: this.more,
      back: this.goBack
    })

    try {
      const html = await getReaderPage(page)
      const data = await AsyncStorage.getItem(page)

      const dataJSON = JSON.parse(data)
      const scrollPosition = dataJSON ? dataJSON.scrollPosition : 0

      this.setState(prevState => ({
        ...prevState,
        html: html,
        isFetching: false
      }))
      setTimeout(() => {
        this.setState(prevState => ({
          ...prevState,
          y: scrollPosition
        }))
      }, 100)
    } catch (e) {
      this.setState(prevState => {
        return { ...prevState, error: e.message, isFetching: false }
      })
    }
  }

  goBack = async () => {
    const { navigation } = this.props
    // const { y } = this.state

    await AsyncStorage.mergeItem(
      navigation.state.params.page,
      JSON.stringify({
        scrollPosition: this.y
      })
    )

    navigation.dispatch(NavigationActions.back())
  }

  more = () => {
    alert('More tapped')
  }

  htmlStyles = {
    br: {
      display: 'none'
    },
    p: {
      marginTop: 10,
      marginBottom: 0
    }
  }

  render() {
    const { isFetching, error, y } = this.state
    const { title } = this.props.navigation.state.params

    if (isFetching) return <LoadingComponent name={title} />
    if (error) return <ErrorComponent error={error} />

    return (
      <ScrollView
        style={{ backgroundColor: 'white' }}
        scrollEventThrottle={16}
        onScroll={this._onScroll}
        contentOffset={{ x: 0, y: y }}
      >
        <View style={{ flex: 1, marginLeft: 15, marginRight: 15 }}>
          <HTML
            html={this.state.html}
            tagsStyles={this.htmlStyles}
            imagesMaxWidth={Dimensions.get('window').width * 0.9}
          />
        </View>
      </ScrollView>
    )
  }

  _onScroll = ev => {
    const y = ev.nativeEvent.contentOffset.y
    this.y = y
  }
}

export default StackNavigator({
  ReadingScreen: { screen: ReadingScreen }
})
