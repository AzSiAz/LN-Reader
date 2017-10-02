import React from 'react'
import { Text, View } from 'react-native'

export default class NovelInformationComponent extends React.PureComponent {
    render() {
        const { updateDate, author } = this.props

        return (
            <View style={{ marginLeft: 18, marginRight: 18, marginTop: 5 }}>
                <Text style={{ fontSize: 18, marginBottom: 5 }}>Novel Information:</Text>
                <Text style={{ marginBottom: 5 }}>Source: Baka-Tsuki</Text>
                <Text style={{ marginBottom: 5 }}>Update Date: {updateDate}</Text>
                <Text style={{ marginBottom: 5 }}>Author: {author}</Text>
            </View>
        )
    }
}
