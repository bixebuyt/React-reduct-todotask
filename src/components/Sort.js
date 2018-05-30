import React, { Component } from 'react';

class Sort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textSort: 'Sắp Xếp'
    }
  }
  handleSort = (event) => {
     this.props.handleSort(event.currentTarget.dataset.id);
     this.setState({
       textSort: event.currentTarget.dataset.id
     })
  }
  render() {
    var {textSort} = this.state;
    if ( textSort === 'asc' ) {
      textSort = 'A - Z';
    }else if ( textSort === 'desc' ) {
      textSort = 'Z - A';
    }else if ( textSort === '1' ) {
      textSort = 'Trạng thái kích hoạt';
    }else if ( textSort === '0' ){
      textSort = 'Trạng thái ẩn';
    }
    return (
      <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
          <div className="dropdown">
              <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                  {textSort} <span className="fa fa-caret-square-o-down ml-5"></span>
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                  <li onClick={this.handleSort} data-id="asc" >
                      <a role="button">
                          <span className="fa fa-sort-alpha-asc pr-5">
                              Tên A-Z
                          </span>
                      </a>
                  </li>
                  <li onClick={this.handleSort} data-id="desc">
                      <a role="button">
                          <span className="fa fa-sort-alpha-desc pr-5">
                              Tên Z-A
                          </span>
                      </a>
                  </li>
                  <li role="separator" className="divider"></li>
                  <li onClick={this.handleSort} data-id={1} ><a role="button">Trạng Thái Kích Hoạt</a></li>
                  <li onClick={this.handleSort} data-id={0}><a role="button">Trạng Thái Ẩn</a></li>
              </ul>
          </div>
      </div>
    )
  }
}
export default Sort;
