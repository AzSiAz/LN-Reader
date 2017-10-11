import React from 'react'
import { View, Text } from 'react-native'
import { ListItem, List } from 'react-native-elements'
import Accordion from 'react-native-collapsible/Accordion'

export const NormalVolumeComponent = ({ _onChapterPress, series }) => (
  <View>
    <Accordion
      sections={[...series]}
      renderHeader={section => {
        return (
          <View
            style={{ borderWidth: 1, padding: 15, backgroundColor: '#2980b9' }}
          >
            <Text>{section.title}</Text>
          </View>
        )
      }}
      renderContent={section => {
        return (
          <List style={{ paddingTop: 0 }}>
            <Accordion
              sections={[...section.books]}
              renderHeader={section => {
                return (
                  <View
                    style={{
                      borderWidth: 1,
                      padding: 15,
                      backgroundColor: '#bdc3c7'
                    }}
                  >
                    <Text numberOfLines={5}>{section.title}</Text>
                  </View>
                )
              }}
              renderContent={section => {
                return section.chapters.map((el, i) => {
                  return (
                    <ListItem
                      titleNumberOfLines={5}
                      title={el.title}
                      key={i}
                      onPress={_onChapterPress.bind(null, el)}
                    />
                  )
                })
              }}
            />
          </List>
        )
      }}
    />
  </View>
)
