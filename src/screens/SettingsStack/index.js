import { StackNavigator } from 'react-navigation'

import SettingsScreen from './SettingsScreen'

const SettingsStack = StackNavigator({
  SettingsScreen: { screen: SettingsScreen },
})

export default SettingsStack