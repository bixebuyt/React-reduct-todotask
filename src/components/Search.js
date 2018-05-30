import React, { Component } from 'react';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueInput: ""
    }
  }
  inputSearch = (event) => {
    this.setState({
      valueInput: event.target.value
    })
  }
  handleSeach = (valueSearch) => {
    this.props.handleSeach(this.state.valueInput);
  }
  render() {
    return (
      <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
          <div className="input-group">
              <input onChange={this.inputSearch} value={this.state.valueInput} type="text" className="form-control" placeholder="Nhập từ khóa..." />
              <span className="input-group-btn">
                <button onClick={this.handleSeach} className="btn btn-primary" type="button">
                    <span className="fa fa-search mr-5">Tìm</span>
                </button>
              </span>
          </div>
      </div>
    )
  }
}
export default Search;
