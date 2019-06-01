class Client {

  static host = process.env.REACT_APP_API_HOST;
  static resultAsJson = res => res.json();
  static defaultErrorCallback = err => console.error(JSON.stringify(err));

  static fetchTasksInList(listId, onFulfilled, onRejected = this.defaultErrorCallback) {
    fetch(`${this.host}/lists/${listId}/tasks`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    }).then(this.resultAsJson).then(onFulfilled).catch(onRejected);
  }

  static saveTask(listId, taskToSave, onFulfilled, onRejected = this.defaultErrorCallback) {
    fetch(`${this.host}/lists/${listId}/tasks`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(taskToSave)
    }).then(this.resultAsJson).then(onFulfilled).catch(onRejected);
  }

  static updateTask(listId, index, updatedTask, onFulfilled, onRejected = this.defaultErrorCallback) {
    fetch(`${this.host}/lists/${listId}/tasks/${index}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(updatedTask)
    }).then(this.resultAsJson).then(onFulfilled).catch(onRejected);
  }

  static deleteTask(listId, index, onFulfilled, onRejected = this.defaultErrorCallback) {
    fetch(`${this.host}/lists/${listId}/tasks/${index}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    }).then(onFulfilled).catch(onRejected);
  }

  static fetchMembersInTeam(teamId, onFulfilled, onRejected = this.defaultErrorCallback) {
    fetch(`${this.host}/teams/${teamId}/members`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    }).then(this.resultAsJson).then(onFulfilled).catch(onRejected);
  }

  static fetchTeamLists(teamId, onFulfilled, onRejected = this.defaultErrorCallback) {
    fetch(`${this.host}/teams/${teamId}/lists`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    }).then(this.resultAsJson).then(onFulfilled).catch(onRejected);
  }

  static createList(owner, id, listName, onFulfilled, onRejected = this.defaultErrorCallback) {
    fetch(`${this.host}/${owner}s/${id}/lists`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: listName
    }).then(this.resultAsJson).then(onFulfilled).catch(onRejected);
  }

  static createTeam(team, onFulfilled, onRejected = this.defaultErrorCallback) {
    fetch(`${this.host}/teams`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(team)
    }).then(this.resultAsJson).then(onFulfilled).catch(onRejected);
  }
}

export default Client