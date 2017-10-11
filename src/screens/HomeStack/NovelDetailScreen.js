import React from 'react'
import { Linking, ActionSheetIOS } from 'react-native'
import { Icon } from 'react-native-elements'

import LoadingComponent from './../../components/LoadingComponent'
import ErrorComponent from './../../components/ErrorComponent'
import { Novel } from './../../components/novel'
import { getNovelJSON } from './../../api'

const iconHeart = ['md-heart-outline', 'md-heart']

export default class NovelDetailScreen extends React.PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
    headerRight: (
      <Icon
        type="ionicon"
        name="ios-more"
        style={{ marginRight: 15 }}
        underlayColor="#EFEFF2"
        size={36}
        onPress={navigation.state.params.more}
      />
    )
  })

  state = {
    favorite: false,
    novel: {},
    isFetching: true,
    refreshing: false,
    error: undefined,
    image: {},
    iconHeart: iconHeart[0],
    volumeNumber: 0
  }

  componentDidMount() {
    this.props.navigation.setParams({ more: this.more })
  }

  more = () => {
    let str = this.state.favorite ? 'Remove From Favorite' : 'Add To Favorite'
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [str, 'Open In Safari', 'Cancel'],
        cancelButtonIndex: 2
      },
      index => {
        if (index === 0) {
          this._onHeartPress()
        }
        if (index === 1) {
          const { page } = this.props.navigation.state.params
          Linking.openURL(
            `https://www.baka-tsuki.org/project/index.php?title=${page}`
          )
        }
      }
    )
  }

  async componentWillMount() {
    try {
      await this.getData()
    } catch (e) {
      this.setState(prevState => {
        return { ...prevState, error: e.message, isFetching: false }
      })
    }
  }

  getData = async () => {
    this.setState(prevState => ({ ...prevState, refreshing: true }))
    const { page } = this.props.navigation.state.params

    const { json, volumeNumber } = await getNovelJSON(page)

    this.setState(prevState => ({
      ...prevState,
      novel: json,
      isFetching: false,
      refreshing: false,
      volumeNumber: volumeNumber
    }))
  }

  render() {
    const { params } = this.props.navigation.state
    const {
      isFetching,
      refreshing,
      novel,
      error,
      iconHeart,
      volumeNumber
    } = this.state

    if (isFetching) return <LoadingComponent name={params.title} />
    if (error) return <ErrorComponent error={error} />

    return (
      <Novel
        iconHeart={iconHeart}
        novel={novel}
        volumeNumber={volumeNumber}
        refreshing={refreshing}
        _onChapterPress={this._onChapterPress}
        _onHeartPress={this._onHeartPress}
      />
    )
  }

  _onHeartPress = () => {
    // TODO remove or add fav
    let name =
      this.state.iconHeart === iconHeart[0] ? iconHeart[1] : iconHeart[0]

    this.setState(prevState => ({
      ...prevState,
      iconHeart: name,
      favorite: !prevState.favorite
    }))
  }

  _onChapterPress = chapter => {
    const { navigate } = this.props.navigation

    if (chapter.linktype === 'internal') {
      navigate('Reading', {
        page: chapter.page,
        link: chapter.link,
        title: chapter.title
      })
    } else {
      Linking.openURL(chapter.link)
    }
  }
}
