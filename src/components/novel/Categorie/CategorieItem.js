import React from 'react'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'
import PropTypes from 'prop-types'
import { Button } from 'react-native-elements'

export default class CategorieItem extends React.PureComponent {
  render() {
    const { cat } = this.props

    return (
      <TouchableHighlight underlayColor='#7f8c8d' style={styles.container} onPress={this._onCatPress.bind(null, cat)}>
        <View>
          <Text style={{color: 'white'}}>{cat}</Text>
        </View>
      </TouchableHighlight>
    )
  }

  _onCatPress = (cat) => {
    alert(`Cat - ${cat}`)
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2c3e50',
    marginBottom: 5,
    marginRight: 5,
    paddingRight: 15,
    paddingLeft: 15,
    paddingTop: 10,
    paddingBottom: 10,
    borderWidth: 0.5,
  }
})

CategorieItem.propTypes = {
  cat: PropTypes.string
}
