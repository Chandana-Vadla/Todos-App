// Write your code here
import {Component} from 'react'
import './index.css'

class TodoItem extends Component {
  render() {
    const {todo, deleteTodo} = this.props
    const {title, id} = todo
    return (
      <li className="todo-container">
        <p className="title">{title}</p>
        <div className="btn-container">
          <button
            type="button"
            className="deleteBtn"
            onClick={() => deleteTodo(id)}
          >
            Delete
          </button>
        </div>
      </li>
    )
  }
}

export default TodoItem
//             onClick={() => deleteTodo(id)}
