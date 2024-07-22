import React, { Component } from 'react';
import axios from 'axios';
import './index.css';

class AssessmentForm extends Component {
  state = {
    taskName: '',
    description: '',
    message: ''
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { taskName, description } = this.state;

    if (!taskName || !description) {
      this.setState({ message: 'All fields are required.' });
      return;
    }

    axios.post('http://localhost:5000/assessments', { taskName, description })
      .then(response => {
        this.setState({ message: 'Assessment task submitted!', taskName: '', description: '' });
      })
      .catch(error => {
        this.setState({ message: 'Submission failed. Please try again.' });
      });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="form">
        <label>
          Task Name:
          <input type="text" name="taskName" value={this.state.taskName} onChange={this.handleChange} />
        </label>
        <label>
          Description:
          <textarea name="description" value={this.state.description} onChange={this.handleChange}></textarea>
        </label>
        <button type="submit">Submit</button>
        {this.state.message && <p>{this.state.message}</p>}
      </form>
    );
  }
}

export default AssessmentForm;
