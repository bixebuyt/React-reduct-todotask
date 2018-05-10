import React, { Component } from 'react';
import Search from '../components/Search';
import Sort from '../components/Search';

class Control extends Component {
  render() {
    return (
        <div>
          <Search />
          <Sort />
        </div>
    )
  }
}
export default Control;
