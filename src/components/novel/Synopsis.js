import React from 'react'
import { View, Text } from 'react-native'

export default class SynopsisComponent extends React.PureComponent {

    render() {
        const { synopsis } = this.props

        return (
            <View style={{ marginLeft: 18, marginRight: 18, marginTop: 5, marginBottom: 5 }}>
                <Text style={{ fontSize: 18 }}>
                Synopsis:
                </Text>
                <Text style={{ marginTop: 5 }}>
                {synopsis}
                </Text>
            </View>
        )
    }
}
