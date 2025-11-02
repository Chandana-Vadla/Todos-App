import {Component} from 'react'
import './index.css'
import TodoItem from '../TodoItem'

class SimpleTodos extends Component {
  state = {
    todoList: [],
    inputTodoTitle: '',
    todoCount: 0,
  }

  deleteTodo = id => {
    this.setState(prevState => ({
      todoList: prevState.todoList.filter(eachTodo => eachTodo.id !== id),
    }))
  }

  onInputChange = event => {
    this.setState({
      inputTodoTitle: event.target.value,
    })
  }

  addTodoItem = () => {
    const {inputTodoTitle, todoCount, todoList} = this.state
    if (inputTodoTitle.trim() === '') return

    // Split title and number
    const parts = inputTodoTitle.trim().split(' ')
    const lastPart = parts[parts.length - 1]
    const count = isNaN(lastPart) ? 1 : parseInt(lastPart)
    const title = isNaN(lastPart)
      ? inputTodoTitle
      : parts.slice(0, -1).join(' ')

    const newTodos = Array.from({length: count}, (_, i) => ({
      id: todoCount + i + 1,
      title,
      completed: false,
    }))

    this.setState({
      todoList: [...todoList, ...newTodos],
      inputTodoTitle: '',
      todoCount: todoCount + count,
    })
  }

  toggleComplete = id => {
    this.setState(prevState => ({
      todoList: prevState.todoList.map(todo =>
        todo.id === id ? {...todo, completed: !todo.completed} : todo,
      ),
    }))
  }

  render() {
    const {todoList, inputTodoTitle} = this.state

    return (
      <div className="bg-container">
        <div className="todo-box">
          <h1 className="heading">Simple Todos</h1>
          <div className="add-todo-container">
            <input
              value={inputTodoTitle}
              type="text"
              onChange={this.onInputChange}
              placeholder="Enter title or 'Buy Apples 3'"
              className="input-box"
            />
            <button
              type="button"
              className="add-btn"
              onClick={this.addTodoItem}
            >
              Add
            </button>
          </div>
          <ul className="todo-list-container">
            {todoList.map(eachTodo => (
              <TodoItem
                todo={eachTodo}
                deleteTodo={this.deleteTodo}
                toggleComplete={this.toggleComplete}
                key={eachTodo.id}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default SimpleTodos
