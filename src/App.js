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
      workEdit: null
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
        name: 'Angular',
        stt: true
      },
      {
        id: uuid(),
        name: 'React Native',
        stt: true
      },
      {
        id: uuid(),
        name: 'VueJs',
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
  // //
   componentWillReceiveProps(nextProps) {
     console.log(nextProps);
   }
  render() {
    var tasks = this.state.tasks;
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
                            <Control />
                            <br />
                            <br />
                            <br />
                        </div>
                        <div className="row mt-15">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                              <TaskList
                                onUpdateStt = {this.onUpdateStt}
                                deleteWork = {this.deleteWork}
                                tasks={ tasks }
                                onUpdate = { this.onUpdate }
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
