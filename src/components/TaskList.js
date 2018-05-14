import React, { Component } from 'react';
import TaskItem from './TaskItem';

class TaskList extends Component {
  render() {
    var tasks = this.props.tasks;
    var elmTasks = tasks.map((task, index) => {
      return <TaskItem
                key={index}
                index={index}
                task={task}
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
                          <input type="text" className="form-control" />
                      </td>
                      <td>
                          <select className="form-control">
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
