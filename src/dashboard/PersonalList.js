import React, {Component} from 'react';
import './Lists.css';
import AddTask from "./AddTask";

class PersonalList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.saveTask = this.saveTask.bind(this);
  }

  saveTask(taskName) {
    console.log('saving...');
  }

  render() {
    return (
      <div id="personal-list">
        <div className="list-container">
          <AddTask saveTask={this.saveTask} />
        </div>
      </div>
    )
  }
}

export default PersonalList