import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

import LoadingComponent from './../../components/LoadingComponent'

export default class NovelDetailScreen extends React.PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
  })

  state = {
    novel: {},
    isFetching: true
  }

  async componentWillMount() {
    const { page } = this.props.navigation.state.params
    const fetched = await fetch(`https://api.azsiaz.tech/title/query/?title=${page}`)
    const json = await fetched.json()

    this.setState((prevState) => {
      return { novel: json, isFetching: false }
    })
  }

  render() {
    const { params } = this.props.navigation.state
    const { isFetching, novel } = this.state

    if (isFetching) return <LoadingComponent name={params.title} />

    return (
      <View>
        <Text>{ !isFetching ? novel.title : 'fetching' }</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})