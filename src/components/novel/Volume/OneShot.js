import React from 'react'
import { View, Text } from 'react-native'
import { ListItem, List } from 'react-native-elements'
import Accordion from 'react-native-collapsible/Accordion'

export const OneShotVolumeComponent = ({ _onChapterPress, series }) => (
  <View>
    <Accordion
      sections={[...series]}
      renderHeader={section => {
        return (
          <View
            style={{
              borderWidth: 1,
              padding: 15,
              backgroundColor: '#2980b9'
            }}
          >
            <Text>{section.title}</Text>
          </View>
        )
      }}
      renderContent={section => {
        return (
          <List style={{ paddingTop: 0 }}>
            {section.chapters.map((el, i) => {
              return (
                <ListItem
                  titleNumberOfLines={5}
                  title={el.title}
                  key={i}
                  onPress={_onChapterPress.bind(null, el)}
                />
              )
            })}
          </List>
        )
      }}
    />
  </View>
)
