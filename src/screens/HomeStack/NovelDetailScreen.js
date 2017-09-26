import React from 'react'
import { ScrollView, StyleSheet, Text, Image, View, TouchableHighlight, SegmentedControlIOS } from 'react-native'
import { Icon, Divider } from 'react-native-elements'

import LoadingComponent from './../../components/LoadingComponent'
import ErrorComponent from './../../components/ErrorComponent'

iconHeart = [ 'md-heart-outline', 'md-heart' ]

export default class NovelDetailScreen extends React.PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
  })

  state = {
    novel: {},
    isFetching: true,
    error: undefined,
    image: {},
    iconHeart: iconHeart[0],
    segmentIndex: 'Information',
    selectedIndex: 0
  }

  async componentWillMount() {
    try {
      const { page } = this.props.navigation.state.params

      const fetched = await fetch(
        `https://api.azsiaz.tech/title/query/?title=${encodeURIComponent(page)}`
      )
      const json = await fetched.json()

      this.setState((prevState) => ({
        ...prevState, novel: json, 
        isFetching: false, 
      }))
    }
    catch(e) {
      this.setState((prevState) => {
        return { ...prevState, error: e.message, isFetching: false }
      })
    }
  }

  render() {
    const { params } = this.props.navigation.state
    const { isFetching, novel, error, iconHeart, selectedIndex } = this.state

    if (isFetching) return <LoadingComponent name={params.title} />
    if (error) return <ErrorComponent error={error} />

    return (
      <ScrollView style={{ backgroundColor: 'white' }}>
        <View style={{flex: 1}}>
          <View style={styles.container}>
            <View style={styles.image}>
              <Image
                style={{ width: 150, height: 150 }}
                source={{ uri: novel.cover }}
                resizeMode='contain'
              />
            </View>
            <View style={{flex: 1, flexDirection: 'column'}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Text style={styles.title} numberOfLines={3}>{novel.title}</Text>
                <Icon
                  type='ionicon' 
                  style={styles.heartIcon} 
                  name={iconHeart} 
                  size={26}
                  underlayColor='white'
                  onPress={this._onHeartPress}
                />
              </View>
              <View>
                <Text>Status: {novel.status}</Text>
                <Text>Volume number: {novel.tome[0].tome.length}</Text>
              </View>
            </View>
          </View>
          <Divider style={{ top: 25 }} />
          <View style={{ top: 30, marginLeft: 10, marginRight: 10 }}>
            <SegmentedControlIOS 
              selectedIndex={selectedIndex}
              values={[ 'Information', 'Volume' ]}
              onValueChange={(val) => this.setState({segmentIndex: val})}
            />
          </View>
          <Divider style={{ top: 35 }} />
          <View style={{top: 40, left: 18, right: 18}}>
            {this._renderSegment()}
          </View>
        </View>
      </ScrollView>
    )
  }

  _renderSegment = () => {
    if (this.state.segmentIndex === 'Information') {
      return this._renderInformation()
    }
    return this._renderVolume()
  }

  _renderVolume = () => {
    return (
      <Text>Volume</Text>
    )
  }

  _renderInformation = () => {
    return (
      <Text>Information</Text>
    )
  }

  _onHeartPress = () => {
    // TODO remove or add fav
    let name = (this.state.iconHeart === iconHeart[0]) ? iconHeart[1] : iconHeart[0]
    this.setState((prevState) => (
      { ...prevState, iconHeart: name }
    ))
  }

  _onChapterPress = () => {
    const { navigate } = this.props.navigation
  }

}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    top: 15,
    flex: 1,
    height: 150,
    left: -10
  },
  image: {
    maxWidth: 150,
    maxHeight: 150,
  },
  title: {
    height: 150,
    width: 170
  },
  heartIcon: {
    right: -10
  }
})