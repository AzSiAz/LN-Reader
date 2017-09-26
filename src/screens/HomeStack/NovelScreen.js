import React from 'react'
import { View, Text, FlatList, StyleSheet, StatusBar, ScrollView } from 'react-native'
import { ListItem, SearchBar } from 'react-native-elements'

import LoadingComponent from './../../components/LoadingComponent'
import ErrorComponent from './../../components/ErrorComponent'

export default class NovelScreen extends React.PureComponent {
  static navigationOptions = {
    title: 'Novel List',
    // headerStyle: {},
    headerTitleStyle: {
      color: 'black'
    }
  }

  state = {
    novelList: [],
    isFetching: true,
    search: '',
    error: undefined
  }

  async componentWillMount() {
    try {
      const fetched = await fetch('https://api.azsiaz.tech/ln/english')
      const json = await fetched.json()

      this.setState((prevState) => {
        return { ...prevState, novelList: json.titles, isFetching: false }
      })
    }
    catch(e) {
      this.setState((prevState) => {
        return { ...prevState, error: e.message, isFetching: false }
      })
    }
  }

  render() {
    const { search, isFetching, error } = this.state
    const data = this.state.novelList.filter((item) => item.title.toLowerCase().includes(this.state.search.toLowerCase()))
    const rowToRender = (data.length / 2).toFixed()
    const clearIcon = search !== '' ? true : false 

    if (isFetching) return <LoadingComponent name='Novel List' />
    if (error) return <ErrorComponent error={error} />

    return (
      <ScrollView style={styles.container}>
        <SearchBar
          lightTheme
          clearIcon={ clearIcon }
          onChangeText={ (e) => this.setState({search: e}) }
        />
        <FlatList
          initialNumToRender={ rowToRender }
          data={ data }
          keyExtractor={ (item) => item.page }
          renderItem={this._renderItem}
        />
      </ScrollView>
    )
  }

  _renderItem = ({ item }) => (
    <ListItem onPress={this._onPress.bind(null, item)} title={item.title} />
  )

  _onPress = (novel) => {
    const { navigate } = this.props.navigation

    navigate('NovelDetailScreen', {
      title: novel.title,
      id: novel.pageid,
      page: novel.page
    })
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: 'white'
  }
})