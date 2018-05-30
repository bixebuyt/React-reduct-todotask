import React, { Component } from 'react';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
import _ from 'lodash';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isDisplayForm: false,
      workEdit: null,
      updatedList : [],
      filter: {
        name: '',
        stt: -1
      },
      valueSearch: '',
      valueSort: ''
    }
    this.onGenerateData = this.onGenerateData.bind(this);
  }
  onToggleForm = () => {
    this.setState({
      isDisplayForm: !this.state.isDisplayForm
    })
  }
   onGenerateData() {
    var uuid = require('uuid-random');
    var tasks = [
      {
        id: uuid(),
        name: 'angular',
        stt: true
      },
      {
        id: uuid(),
        name: 'react native',
        stt: true
      },
      {
        id: uuid(),
        name: 'vueJs',
        stt: false
      }
    ];
    this.setState({
      tasks: tasks
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  // Add tasks after windown reload //
  componentWillMount() {
    if ( localStorage && localStorage.getItem('tasks')) {
      var tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks: tasks
      })
    }
  }
  // Close and Open Form //
  onCloseForm = () => {
    this.setState({
      isDisplayForm: !this.state.isDisplayForm
    })
  }
  // Add Work //
  onSubmit = (data) => {
    var tasks = this.state.tasks;
    var uuid = require('uuid-random');
    var idEdit = data.id;
    if ( data.id !== '' ) {
        var idEdit = data.id;
        var index = _.findIndex(tasks, function(e) {
            return e.id === idEdit;
        });
        var valStt = data.stt === "true" ? true : false;
        tasks[index].name = data.name;
        tasks[index].stt = valStt;
        this.setState({
          tasks: tasks
        });
    }else {
      data.id = uuid();
      if ( data.name !== '' ) {
          tasks.push(data)
      }
      this.setState({
        tasks: tasks
      });
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  // Change status //
  onUpdateStt = (id) => {
    var tasks = this.state.tasks;
    var index = _.findIndex(tasks, function(e) {
        return e.id === id;
    });
    tasks[index].stt = !tasks[index].stt;
    this.setState({
      tasks: tasks
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  // Delete Work //
  deleteWork = (id) => {
    var tasks = this.state.tasks;
    var deleteItem = _.remove(tasks, function(o) {
      return o.id !== id;
    })
    this.setState({
      tasks: deleteItem
    })
    localStorage.setItem('tasks', JSON.stringify(deleteItem));
  }
  // Update Work //
  onUpdate = (id) => {
    var tasks = this.state.tasks;
    var index = _.findIndex(tasks, function(e) {
        return e.id === id;
    });
    var workEdit = tasks[index];
    this.setState({
      workEdit: workEdit,
      isDisplayForm: true
    })
  }
  // Input Filter //
  onFilter = (filterName, filterStt) => {
    filterStt = parseInt(filterStt);
    this.setState({
      filter : {
        name: filterName,
        stt: filterStt
      }
    })
  }
  // handleSeach //
  handleSeach = (valueSearch) => {
    this.setState({
      valueSearch: valueSearch
    })
  }
  // handleSort //
  handleSort = (event) => {
    if ( event === '1' || event === '0' ) {
      event = parseInt(event);
    }
    if ( event === 0 ) {
      event = 'desc';
    }
    else if ( event === 1 ) {
      event = 'asc';
    }
    this.setState({
      valueSort: event
    })
  }
  render() {
    var {tasks,filter,valueSearch, valueSort} = this.state;
    // handleSort //
    console.log(valueSort);
    var tasks = _.orderBy(tasks, [ (typeof valueSort) === 'string' ? 'name': 'stt' ], [valueSort]);
    // HANDLE FILTER FORM //
    if (filter) {
      if (filter.name) {
        var tasks = tasks.filter(function(item) {
          var valueItem = item.name;
          return valueItem.toLowerCase().indexOf(filter.name.toLowerCase()) > -1
        })
      }
      if (filter.stt != null) {
        var tasks = tasks.filter(function(item) {
            var valueItem = item.stt;
            if (filter.stt === -1) {
                return tasks
            }else if (filter.stt === 0) {
              return item.stt === false
            }else if (filter.stt === 1) {
              return item.stt === true
            }
        })
      }
    }
    // HANDLE SEARCH FORM //
    if (valueSearch != null) {
      var tasks = tasks.filter(function(item) {
        var valueSearchName = item.name;
        return valueSearchName.toLowerCase().indexOf(valueSearch.toLowerCase()) > -1
      })
    }else if (valueSearch === null) {
      tasks = tasks
    }
    // HANDLE SHOW TASK FORM //
    var isDisplayForm = this.state.isDisplayForm;
    var elmTaskForm = "";
    if ( isDisplayForm ) {
      elmTaskForm = <TaskForm
                     onCloseForm={this.onCloseForm}
                     onSubmit={this.onSubmit}
                     onWorkEdit = {this.state.workEdit}
                    />
    }
    return (
      <div className="App">
        <div className="container">
                <div className="text-center">
                    <h1>Quản Lý Công Việc</h1>
                    <hr/>
                </div>
                <div className="row">
                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                        { elmTaskForm }
                    </div>
                    <div className={ isDisplayForm === true ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12' }>
                        <button type="button" className="btn btn-primary" onClick={this.onToggleForm} >
                            <span className="fa fa-plus mr-5"></span>Thêm Công Việc
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={this.onGenerateData}
                        >
                            <span className="fa fa-plus mr-5"></span>Generate Data
                        </button>
                        <br />
                        <br />
                        <div className="row mt-15">
                            <Control
                              handleSeach = {this.handleSeach}
                              handleSort = {this.handleSort}
                            />
                            <br />
                            <br />
                            <br />
                        </div>
                        <div className="row mt-15">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                              <TaskList
                                onUpdateStt = {this.onUpdateStt}
                                deleteWork = {this.deleteWork}
                                tasks= { tasks }
                                onUpdate = { this.onUpdate }
                                onFilter = { this.onFilter }
                              />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      </div>
    );
  }
}

export default App;
