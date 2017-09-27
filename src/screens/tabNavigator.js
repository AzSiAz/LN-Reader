import React from 'react'
import { TabNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'

import HomeStack from './HomeStack'
import SettingsStack from './SettingsStack'


const tabNavigator = TabNavigator({
  HomeStack: {
    screen: HomeStack, 
    navigationOptions: {
      tabBarLabel: 'Novel List',
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name='ios-list'
          size={30}
          color={tintColor}
        />
      ),
    }
  },
  SettingsStack: {
    screen: SettingsStack, 
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name='ios-settings'
          size={30}
          color={tintColor}
        />
      ),
    }
  },
})

export default tabNavigator