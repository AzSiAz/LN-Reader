import React from 'react'
import { StackNavigator } from 'react-navigation'

import tabNavigator from './tabNavigator'
import ReadingScreen from './ReadingScreen'



const navigator = StackNavigator({
  Tab: {
    screen: tabNavigator,
  },
  Reading: {
    screen: ReadingScreen,
  }
},{
    mode: 'modal',
    headerMode: 'none'
})

export default navigator