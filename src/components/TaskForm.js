import React, { Component } from 'react';

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      stt: false
    }
  }
  onCloseForm = () => {
    this.props.onCloseForm()
  }
  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value
    })
  }
  handleClear = () => {
    this.setState({
      name: '',
      stt: false
    })
  }
  onHandleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state);
  }
  render() {
    return (
        <div className="panel panel-warning">
            <div className="panel-heading">
                <h3 className="panel-title">Thêm Công Việc</h3>
                <a onClick={this.onCloseForm}><img src="../../../assets/images/icon-close.png" alt="icon Close" /></a>
            </div>
            <div className="panel-body">
                <form onSubmit={this.onHandleSubmit}>
                    <div className="form-group">
                        <label>Tên :</label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          value={this.state.name}
                          onChange={this.onChange} />
                    </div>
                    <label>Trạng Thái :</label>
                    <select
                      className="form-control"
                      name="stt"
                      value={this.state.stt}
                      onChange={this.onChange} >
                          <option value='true'>Kích Hoạt</option>
                          <option value='false'>Ẩn</option>
                    </select>
                    <br/>
                    <div className="text-center">
                        <button type="submit" className="btn btn-warning">Thêm</button>&nbsp;
                        <button type="button" onClick={this.handleClear} className="btn btn-danger">Hủy Bỏ</button>
                    </div>
                </form>
            </div>
        </div>
    )
  }
}
export default TaskForm;
