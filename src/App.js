import React, { Component } from 'react';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isDisplayForm: true
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
        stt: 'true'
      },
      {
        id: uuid(),
        name: 'React Native',
        stt: 'true'
      },
      {
        id: uuid(),
        name: 'VueJs',
        stt: 'false'
      }
    ];
    this.setState({
      tasks: tasks
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  componentWillMount() {
    if ( localStorage && localStorage.getItem('tasks')) {
      var tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks: tasks
      })
    }
  }
  onCloseForm = () => {
    this.setState({
      isDisplayForm: !this.state.isDisplayForm
    })
  }
  onSubmit = (data) => {
    var tasks = this.state.tasks;
    var uuid = require('uuid-random');
    data.id = uuid();
    if ( data.name !== '' ) {
        tasks.push(data)
    }
    this.setState({
      tasks: tasks
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  onUpdateStt = (datas) => {
    console.log(datas);
  }
  render() {
    var tasks = this.state.tasks;
    var isDisplayForm = this.state.isDisplayForm;
    var elmTaskForm = "";
    if ( isDisplayForm ) {
      elmTaskForm = <TaskForm
                     onCloseForm={this.onCloseForm}
                     onSubmit={this.onSubmit}
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
                                tasks={ tasks }
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
