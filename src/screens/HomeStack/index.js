import { StackNavigator } from 'react-navigation'

import NovelScreen from './NovelScreen'
import NovelDetailScreen from './NovelDetailScreen'

const HomeStack = StackNavigator({
  NovelScreen: { screen: NovelScreen },
  NovelDetailScreen: { screen: NovelDetailScreen }
})

export default HomeStack