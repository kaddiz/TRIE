import React, { Component, PropTypes } from 'react'
import AppProd from './App.prod'

export default class App extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  render() {
    return (
      <AppProd>
          {this.props.children}

      </AppProd>
    );
  }
}
