import React from 'react'
import propTypes from 'prop-types'
import {
  ScrollView,
  StyleSheet,
  Text,
  Image,
  View,
  SegmentedControlIOS,
  RefreshControl,
  SectionList,
  FlatList
} from 'react-native'
import { Icon, Divider, ListItem, List } from 'react-native-elements'
import Accordion from 'react-native-collapsible/Accordion'

import { CategorieList, NovelInformation, Synopsis } from './index'
import { OneShotVolumeComponent } from './Volume/OneShot'
import { NormalVolumeComponent } from './Volume/Normal'

export default class NovelComponent extends React.PureComponent {
  state = { segmentIndex: 'Information', selectedIndex: 0 }

  render() {
    const { iconHeart, novel, volumeNumber, _onHeartPress } = this.props
    const { segmentIndex, selectedIndex } = this.state

    return (
      <ScrollView
        style={{ backgroundColor: 'white' }}
        refreshControl={this._renderRefreshControl()}
      >
        <View style={{ flex: 1 }}>
          <View style={styles.container}>
            <View style={styles.image}>
              <Image
                style={{ width: 150, height: 150 }}
                source={{ uri: novel.cover }}
                resizeMode="contain"
              />
            </View>
            <View style={{ flex: 1, flexDirection: 'column' }}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={styles.title} numberOfLines={3}>
                  {novel.title}
                </Text>
                <Icon
                  type="ionicon"
                  style={styles.heartIcon}
                  name={iconHeart}
                  size={26}
                  underlayColor="white"
                  onPress={_onHeartPress}
                />
              </View>
              <View>
                <Text>Status: {novel.status}</Text>
                <Text>Volume number: {volumeNumber}</Text>
              </View>
            </View>
          </View>
          <View style={{ paddingTop: 25 }}>
            <Divider />
            <View
              style={{
                paddingTop: 5,
                marginLeft: 10,
                marginRight: 10,
                paddingBottom: 5
              }}
            >
              <SegmentedControlIOS
                selectedIndex={selectedIndex}
                values={['Information', 'Volume']}
                onValueChange={val => this.setState({ segmentIndex: val })}
              />
            </View>
            <Divider />
            <View style={{ paddingTop: 5 }}>{this._renderSegment()}</View>
          </View>
        </View>
      </ScrollView>
    )
  }

  _renderRefreshControl = () => {
    return (
      <RefreshControl
        refreshing={this.props.refreshing}
        onRefresh={this.getData}
      />
    )
  }

  _renderSegment = () => {
    if (this.state.segmentIndex === 'Information') {
      return this._renderInformation()
    }
    return this._renderVolume()
  }

  _renderInformation = () => {
    const { categories } = this.props.novel

    return (
      <View>
        {categories.length === 0 ? (
          <View style={{ alignItems: 'center', flex: 1, marginBottom: 5 }}>
            <Text>No categories found</Text>
          </View>
        ) : (
          <View style={{ marginLeft: 10, marginRight: 10 }}>
            <CategorieList categories={categories} />
          </View>
        )}
        <Divider />
        {this._renderNextInformation()}
      </View>
    )
  }

  _renderNextInformation = () => {
    const { synopsis, date, author } = this.props.novel
    return (
      <View>
        <Synopsis synopsis={synopsis} />
        <Divider />
        <NovelInformation updateDate={date} author={author} />
        <Divider />
      </View>
    )
  }

  _renderVolume = () => {
    const { series, one_off } = this.props.novel
    const { _onChapterPress } = this.props

    if (one_off)
      return (
        <OneShotVolumeComponent
          series={series}
          _onChapterPress={_onChapterPress}
        />
      )
    else
      return (
        <NormalVolumeComponent
          series={series}
          _onChapterPress={_onChapterPress}
        />
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    top: 15,
    flex: 1,
    height: 150,
    right: 10
  },
  image: {
    maxWidth: 150,
    maxHeight: 150
  },
  title: {
    height: 150,
    width: 170
  },
  heartIcon: {
    right: -20
  }
})
