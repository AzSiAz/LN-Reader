import React from 'react'
import { View, Text, ScrollView, WebView, AsyncStorage } from 'react-native'
import { StackNavigator, NavigationActions } from 'react-navigation'
import HTML from 'react-native-render-html'
import { Icon } from 'react-native-elements'

import LoadingComponent from './../components/LoadingComponent'
import ErrorComponent from './../components/ErrorComponent'


class ReadingScreen extends React.PureComponent {
    static navigationOptions = ({navigation}) => ({
        title: navigation.state.params.title,
        headerRight: <Icon 
            type='ionicon' 
            name='ios-more'
            style={{marginRight: 15}}
            underlayColor='#EFEFF2'
            size={36} 
            onPress={navigation.state.params.more} 
        />,
        headerLeft: <Icon
            type='ionicon'
            name='ios-close'
            style={{marginLeft: 15}}
            underlayColor='#EFEFF2'
            size={36} 
            onPress={navigation.state.params.back} 
        />
    })

    state = {
        html: '',
        isFetching: true,
        error: undefined,
        y: 0
    }

    async componentDidMount() {
        const { navigation } = this.props

        navigation.setParams({ 
            more: this.more,
            back: this.goBack
        })

        try {
            const data = await AsyncStorage.getItem(navigation.state.params.page)
            const scrollPosition = JSON.parse(data).scrollPosition

            this.setState(prevState => ({
                ...prevState, y: scrollPosition
            }))
        }
        catch(e) {
            console.log('No scrollPosition stored')
        }
    }

    goBack = async () => {
        const { navigation } = this.props
        const { y } = this.state

        await AsyncStorage.setItem(navigation.state.params.page, JSON.stringify({
            scrollPosition: y
        }))

        navigation.dispatch(NavigationActions.back())
    }

    more = () => {
        alert('More tapped')
    }

    async componentWillMount() {
        try {
            const { page } = this.props.navigation.state.params
            const fetched = await fetch(`https://api.azsiaz.tech/chapter/query/?chapter=${page}`)
            const html = await fetched.text()

            this.setState((prevState) => {
                return { ...prevState, html: html, isFetching: false }
            })
        }
        catch(e) {
            this.setState((prevState) => {
                return { ...prevState, error: e.message, isFetching: false }
            })
        }
    }

    _renderers = {
        
    }

    htmlStyles = {
        br: {
            display: 'none'
        },
        p: {
            marginTop: 5,
            marginBottom: 0
        }
    }

    render() {
        const { isFetching, error, y } = this.state
        const { title } = this.props.navigation.state.params

        if (isFetching) return <LoadingComponent name={title} />
        if (error) return <ErrorComponent error={error} />

        return (
            <ScrollView
                style={{backgroundColor:'white'}}
                scrollEventThrottle={16}
                onScroll={this._onScroll}
                contentOffset={{x: 0, y: y}}
            >
                <View style={{flex: 1, marginLeft: 15, marginRight: 15}}>
                    <HTML 
                        html={this.state.html}
                        renderers={this._renderers}
                        htmlStyles={this.htmlStyles}
                    />
                </View>
            </ScrollView>
        )
    }

    _onScroll = (ev) => {
        const y = ev.nativeEvent.contentOffset.y
        this.setState((prevState) => ({
            ...prevState, y: y
        }))
    }
}

export default StackNavigator({
    ReadingScreen: { screen: ReadingScreen }
})
