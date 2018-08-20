import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native';

export default class Divider extends Component {
    render() {
        return (
            <View
                style={{
                    marginTop: this.props.marginTop || 0,
                    width: '100%',
                    borderBottomColor: '#efefef',
                    borderBottomWidth: StyleSheet.hairlineWidth
                }}
            />
        )
    }
}
