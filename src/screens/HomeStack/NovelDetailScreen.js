import React from 'react'
import { 
  ScrollView,
  StyleSheet, 
  Text, 
  Image, 
  View, 
  TouchableHighlight, 
  SegmentedControlIOS, 
  RefreshControl,
  ActionSheetIOS,
  Linking
} from 'react-native'
import { Icon, Divider } from 'react-native-elements'

import LoadingComponent from './../../components/LoadingComponent'
import ErrorComponent from './../../components/ErrorComponent'

import CategorieList from './../../components/novel/Categorie/CategorieList'


iconHeart = [ 'md-heart-outline', 'md-heart' ]

export default class NovelDetailScreen extends React.PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
    headerRight: <Icon 
      type='ionicon' 
      name='ios-more'
      style={{marginRight: 15}}
      underlayColor='#EFEFF2'
      size={26} 
      onPress={navigation.state.params.more} 
    />
  })

  constructor(props) {
    super(props)
    this.getData = this.getData.bind(this)
  }

  state = {
    novel: {},
    isFetching: true,
    refreshing: false,
    error: undefined,
    image: {},
    iconHeart: iconHeart[0],
    segmentIndex: 'Information',
    selectedIndex: 0
  }

  componentDidMount() {
    this.props.navigation.setParams({ more: this.more })
  }

  more = () => {
    ActionSheetIOS.showActionSheetWithOptions({
      options: ['Add to favorite', 'Open In Safari', 'Cancel'],
      cancelButtonIndex: 2
    }, (index) => {
      if (index === 0) {
        // TODO add to favorite
        alert('Added to Favorite')
      }
      if (index === 1) {
        const { page } = this.props.navigation.state.params
        Linking.openURL(`https://www.baka-tsuki.org/project/index.php?title=${page}`)
      }
    })
  }

  async componentWillMount() {
    try {
      await this.getData()
    }
    catch(e) {
      this.setState((prevState) => {
        return { ...prevState, error: e.message, isFetching: false }
      })
    }
  }

  async getData() {
    this.setState((prevState) => (
      {...prevState, refreshing: true}
    ))
    const { page } = this.props.navigation.state.params

    const fetched = await fetch(
      `https://api.azsiaz.tech/title/query/?title=${encodeURIComponent(page)}`
    )
    const json = await fetched.json()

    this.setState((prevState) => ({
      ...prevState, novel: json, 
      isFetching: false,
      refreshing: false
    }))
  }

  render() {
    const { params } = this.props.navigation.state
    const { isFetching, novel, error, iconHeart, selectedIndex } = this.state

    if (isFetching) return <LoadingComponent name={params.title} />
    if (error) return <ErrorComponent error={error} />

    return (
      <ScrollView style={{ backgroundColor: 'white' }} refreshControl={this._renderRefreshControl()} >
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
                <Text style={styles.title} numberOfLines={3}>
                  {novel.title}
                </Text>
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
          <View style={{ paddingTop: 25 }}>
            <Divider />
            <View style={{ paddingTop: 5, marginLeft: 10, marginRight: 10, paddingBottom: 5 }}>
              <SegmentedControlIOS 
                selectedIndex={selectedIndex}
                values={[ 'Information', 'Volume' ]}
                onValueChange={(val) => this.setState({segmentIndex: val})}
              />
            </View>
            <Divider />
            <View style={{paddingTop: 5}}>
              {this._renderSegment()}
            </View>
          </View>
        </View>
      </ScrollView>
    )
  }

  _renderRefreshControl = () => {
    return (
      <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={this.getData}
      />
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
      <View style={{left: 18, right: 18}}>
        <Text>Volume</Text>
      </View>
    )
  }

  _renderInformation = () => {
    const { categories, synopsis } = this.state.novel

    const correctCat = categories.map((el) => {
      if (el.toLowerCase().includes('genre'))
          return el.replace('Genre -', '')
    })
    const filteredCat = correctCat.filter(el => typeof el === 'string')

    if (filteredCat.length === 0) {
      return (
        <View>
          <View style={{alignItems: 'center', flex: 1, marginBottom: 5}}>
            <Text>No categories found</Text>
          </View>
          <Divider />
          {this._renderNextInformation()}
        </View>
      )
    }
    return (
      <View>
        <View style={{marginLeft: 10, marginRight: 10}}>
          <CategorieList categories={filteredCat} />
        </View>
        <Divider />
        {this._renderNextInformation()}
      </View>
    )
  }

  _renderNextInformation = () => {
    return (
      <View>
        {this._renderSynopsis()}
        <Divider />
        {this._renderNovelInformation()}
        <Divider />
      </View>
    )
  }

  _renderSynopsis = () => {
    const { synopsis } = this.state.novel

    return (
      <View style={{marginLeft: 18, marginRight: 18, marginTop: 5, marginBottom: 5}}>
        <Text style={{fontSize: 18}}>
          Synopsis:
        </Text>
        <Text style={{marginTop: 5}}>
          {synopsis}
        </Text>
      </View>
    )
  }

  _renderNovelInformation = () => {
    const { updateDate, author } = this.state.novel

    return (
      <View style={{marginLeft: 18, marginRight: 18, marginTop: 5}}>
        <Text style={{fontSize: 18, marginBottom: 5}}>Novel Information:</Text>
        <Text style={{marginBottom: 5}}>Source: Baka-Tsuki</Text>
        <Text style={{marginBottom: 5}}>Update Date: {updateDate}</Text>
        <Text style={{marginBottom: 5}}>Author: {author}</Text>
      </View>
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
