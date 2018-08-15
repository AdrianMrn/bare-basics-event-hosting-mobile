import '../Config'
import DebugConfig from '../Config/DebugConfig'
import React, { Component } from 'react'
import RootContainer from './RootContainer'

import Store from '../Services/Store';

class App extends Component {
  render() {
    return (
      <Store.Container>
        <RootContainer />
      </Store.Container>
    )
  }
}

// allow reactotron overlay for fast design in dev mode
export default DebugConfig.useReactotron
  ? console.tron.overlay(App)
  : App
