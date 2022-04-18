import React, { Component } from 'react';
import CreateTask from '../CreateTask'
import '../../App.css';
import { createTask, getAllUsers } from '../services/services'


class Sprints extends Component {

  state = {
    task: {id: '', sprint: 1, taskDescription: '' },
    numberOfTasks: 0
  }

  createTask = (e) => {
    createTask(this.state.task)
      .then(response => {
        console.log(response);
        
        this.setState({numberOfTasks: this.state.numberOfTasks + 1})
    });
  }

  onChangeForm = (e) => {
    let task = this.state.task
    if (e.target.name === 'taskDescription') {
        task.taskDescription = e.target.value;
        console.log("adding: " + task.taskDescription);
    }
    else if (e.target.name === 'sprintNum') {
        task.sprint = e.target.value;
        console.log("adding task to sprint num: " + task.sprint)
    }
    else if (e.target.name === 'id') {
      task.id = e.target.value;
      console.log("adding task to id: " + task.id)
    }
    this.setState({task})
  }

  onChangeCombo = (e) => {
    let task = this.state.task
    task.id = e.value;
    task.sprint = e.value;
    console.log(task);
  }

  getAllUsers = () => {                                             // FIX ME
    getAllUsers()
      .then(users => {
        console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH")
        console.log(users)
        this.setState({users: users})
      });
  }


  render() {
   // getAllUsers();

    
    return (
      <CreateTask
        onChangeForm={this.onChangeForm}
        createTask={this.createTask}
        onChangeCombo={this.onChangeCombo}
      />
    );
  }
}

export default Sprints;