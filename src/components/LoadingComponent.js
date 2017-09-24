import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default class LoadingComponent extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.loader}>
          Loading
        </Text>
        <Text>
          {this.props.name}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loader: {
    fontSize: 30,
    fontWeight: 'bold',
  }
})