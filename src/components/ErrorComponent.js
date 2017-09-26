import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

// export default class ErrorComponent extends React.PureComponent {}

export default ErrorComponent = ({ error }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.error1}> 
        Oups
      </Text>
      <Text style={styles.error2}>
        Something happened, please try again
      </Text>
      <Text> 
        {error}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  error1: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  error2: {
    fontSize: 20,
    fontWeight: 'bold',
  }
})