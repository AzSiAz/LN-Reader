import React from 'react'
import { View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

import CategorieItem from './CategorieItem'

export default class CategorieList extends React.PureComponent {
  render() {
    const { categories } = this.props

    return (
      <View style={styles.container}>
        {categories.map((el, i) => (
          <CategorieItem key={i} cat={el} />
        ))}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
})

CategorieList.propTypes = {
  categories: PropTypes.array
}
