import React from 'react'
import { View, Text, ScrollView, WebView } from 'react-native'
import { StackNavigator } from 'react-navigation'
import HTML from 'react-native-render-html'

import LoadingComponent from './../components/LoadingComponent'
import ErrorComponent from './../components/ErrorComponent'

class ReadingScreen extends React.PureComponent {
  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.title
  })

  state = {
    html: '',
    isFetching: true,
    error: undefined
  }

  async componentWillMount() {
    try {
        const { page } = this.props.navigation.state.params
        const fetched = await fetch(`https://api.azsiaz.tech/chapter/query/?chapter=${page}`)
        const html = await fetched.text()

        this.setState((prevState) => {
            return { ...prevState, html: html, isFetching: false }
        })
    }
    catch(e) {
        this.setState((prevState) => {
            return { ...prevState, error: e.message, isFetching: false }
        })
    }
  }

    render() {
        const { isFetching, error } = this.state
        const { title } = this.props.navigation.state.params

        if (isFetching) return <LoadingComponent name={title} />
        if (error) return <ErrorComponent error={error} />

        return (
            <ScrollView style={{backgroundColor:'white'}}>
                <View style={{flex: 1, marginLeft: 15, marginRight: 15}}>
                    <HTML 
                        html={this.state.html}
                    />
                </View>
            </ScrollView>
        )
    }
}

export default StackNavigator({
  ReadingScreen: { screen: ReadingScreen }
})
