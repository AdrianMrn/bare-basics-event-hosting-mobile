import '../Config'
import DebugConfig from '../Config/DebugConfig'
import React, { Component } from 'react'
import RootContainer from './RootContainer'
import { Root } from "native-base";

import Store from '../Services/Store';

class App extends Component {
  render() {
    return (
      <Root>
        <Store.Container>
          <RootContainer />
        </Store.Container>
      </Root>
    )
  }
}

// allow reactotron overlay for fast design in dev mode
export default DebugConfig.useReactotron
  ? console.tron.overlay(App)
  : App
