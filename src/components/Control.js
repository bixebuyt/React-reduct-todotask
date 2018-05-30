import React, { Component } from 'react';
import Search from '../components/Search';
import Sort from '../components/Sort';

class Control extends Component {
  render() {
    return (
        <div>
          <Search handleSeach={this.props.handleSeach} />
          <Sort handleSort={this.props.handleSort} />
        </div>
    )
  }
}
export default Control;
