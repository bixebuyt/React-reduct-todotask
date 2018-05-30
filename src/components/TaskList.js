import React, { Component } from 'react';
import TaskItem from './TaskItem';

class TaskList extends Component {
  constructor(props){
    super(props);
      this.state = {
        filterName: "",
        filterStt: -1
    }
  }
  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.props.onFilter( name === 'filterName' ? value: this.state.filterName,
                         name === 'filterStt' ? value: this.state.filterStt );
    this.setState({
      [name]: value
    })
  }
  render() {
    var tasks = this.props.tasks;
    var { filterName, filterStt } = this.state;
    var elmTasks = tasks.map((task, index) => {
      return <TaskItem
                key = {index}
                index = {index}
                task = {task}
                onUpdateStt = {this.props.onUpdateStt}
                deleteWork = {this.props.deleteWork}
                onUpdate = {this.props.onUpdate}
              />
    });
    return (
        <div>
          <table className="table table-bordered table-hover">
              <thead>
                  <tr>
                      <th className="text-center">STT</th>
                      <th className="text-center">Tên</th>
                      <th className="text-center">Trạng Thái</th>
                      <th className="text-center">Hành Động</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td></td>
                      <td>
                          <input
                            type="text"
                            value={ filterName }
                            onChange={this.onChange}
                            name="filterName"
                            className="form-control" />
                      </td>
                      <td>
                          <select
                            name="filterStt"
                            value={ filterStt }
                            onChange={this.onChange}
                            className="form-control">
                              <option value="-1">Tất Cả</option>
                              <option value="0">Ẩn</option>
                              <option value="1">Kích Hoạt</option>
                          </select>
                      </td>
                      <td></td>
                  </tr>
                  { elmTasks }
              </tbody>
          </table>
        </div>
    );
  }
}

export default TaskList;
