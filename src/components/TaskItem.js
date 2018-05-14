import React, { Component } from 'react';

class TaskItem extends Component {
  handleUpdateStt = () => {
    this.props.onUpdateStt(this.props.task.id)
  }
  handleDeleteWork = () => {
    this.props.deleteWork(this.props.task.id);
  }
  handleUpdate = () => {
    this.props.onUpdate(this.props.task.id);
  }
  render() {
    var task = this.props.task;
    var index = this.props.index + 1;
    return (
          <tr>
              <td>{index}</td>
              <td>{task.name}</td>
              <td className="text-center">
                <span onClick={this.handleUpdateStt} className={ task.stt === true ? 'label label-success' : 'label label-warning' } >
                    {task.stt === true ? 'Kích hoạt' : 'Ẩn'}
                </span>
              </td>
              <td className="text-center">
                  <button onClick = {this.handleUpdate} type="button" className="btn btn-warning">
                      <span className="fa fa-pencil mr-5"></span>Sửa
                  </button>
                  &nbsp;
                  <button onClick = {this.handleDeleteWork} type="button" className="btn btn-danger">
                      <span className="fa fa-trash mr-5"></span>Xóa
                  </button>
              </td>
          </tr>
    );
  }
}

export default TaskItem;
