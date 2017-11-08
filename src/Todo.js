import React, { Component } from 'react';
import './css/App.css';
import './css/bootstrap.css';

import axios from 'axios';

class Todo extends Component {
  constructor(){
    super();

    this.state = {
      data: [],
      title: '',
      status: ''
    }
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState();
  }

  onSubmit = (e) => {
    const { title, status } = this.state;

    axios.post('/api/todo', { title, status})
    .then((data_content)=>{
      this.setState({data: data_content.data})
    })
    .catch(function(){
    })
  }

  componentWillMount() {
    this.getData()
  }

  render() {
    return (
      <div className="container">
        <div className="header">
          <h4>To Do List.</h4> 
        </div>
        <div className="paper"> 
          {this.state.data.map((data,i) => {
            return (
            <div className="content" key={i}>
              <button onClick={(e) => this.deleteData(e, data.id)}>&#x2716;</button>
              <li>
              { data.status === "inactive" ?
                <a href="#" onClick={(e) => this.changeStatusActive(e, data.id)}><strike>{data.title}</strike></a>
              :
                <a href="#" onClick={(e) => this.changeStatusInactive(e, data.id)}>{data.title}</a>
              }
               
              </li>  
              <hr></hr>
            </div> 
            )
          })}
          <form onSubmit={this.onSubmit}>
            <input type="text" name="title" onChange={this.onChange} placeholder="Add To Do List..."></input>
            <input type="hidden" name="status" value="active" onChange={this.onChange}></input>
            <input type="submit"></input>
          </form>
        </div>
      </div>
    );
  }
  
  deleteData(e, id) {
    e.preventDefault();
    axios.delete('/api/delete/' + id)
    .then((data_content) => {
      this.setState({data: data_content.data})
    })
    .catch(() =>{

    })
  }

  changeStatusInactive(e, id) {
    e.preventDefault();
    axios.put('/api/mark/set/inactive/' + id)
    .then((data_content) => {
      this.setState({data: data_content.data})
    })
    .catch(() =>{

    })
  }

  changeStatusActive(e, id){
    e.preventDefault();
    axios.put('/api/mark/set/active/' + id)
    .then((data_content) => {
      this.setState({data: data_content.data})
    })
    .catch(() =>{

    })
  }

  getData() {
    axios.get('/api/todo')
    .then((data_content) => {
      this.setState({data: data_content.data})
    })
    .catch(() =>{

    })
  }
}

export default Todo;
