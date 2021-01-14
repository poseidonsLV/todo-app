import React, { Component } from "react";
import "../styles/TodoList.css";

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      newValue: "",
    };
    this.submitUpdate = this.submitUpdate.bind(this);
    this.editTask = this.editTask.bind(this);
  }

  editTask() {
    this.setState({ editing: true });
  }

  submitUpdate(id) {
    if (this.state.newValue.length < 1) return;
    this.setState({
      editing: false,
    });
    this.props.editTask(id, this.state.newValue);
  }

  render() {
    const { id, task, done } = this.props.todo;
    const { doneTask, deleteTask } = this.props;
    return (
      <div className="todolist">
        <i
          onClick={() => {
            doneTask(id);
          }}
          className={`fas fa-check ${done === true && "active"}`}
        />
        {this.state.editing ? (
          <>
            <form className="editingForm">
              <input
                value={this.state.newValue}
                className="editingInput"
                onChange={(e) =>
                  this.setState({
                    newValue: e.target.value,
                  })
                }
                placeholder={task}
              />
              <button
                type="submit"
                className="editingButton"
                onClick={() => this.submitUpdate(id)}
              >
                Update
              </button>
              <button
                className="editingButton"
                onClick={() => this.setState({ editing: false })}
              >
                Exit
              </button>
            </form>
          </>
        ) : (
          <>
            <p className={`task ${done === true && "active"}`}>{task}</p>
            <div className="right">
              <i onClick={this.editTask} id="edit" class="fas fa-pen"></i>
              <i
                onClick={() => {
                  deleteTask(id);
                }}
                id="delete"
                className="fas fa-trash"
              ></i>
            </div>
          </>
        )}
      </div>
    );
  }
}
