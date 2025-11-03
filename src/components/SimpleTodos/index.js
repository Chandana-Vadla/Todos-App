import {Component} from 'react'
import './index.css'
import TodoItem from '../TodoItem'

const initialTodosList = [
  {
    id: 1,
    title: 'Book the ticket for today evening',
    completed: false,
  },
  {
    id: 2,
    title: 'Rent the movie for tomorrow movie night',
    completed: false,
  },
  {
    id: 3,
    title: 'Confirm the slot for the yoga session tomorrow morning',
    completed: false,
  },
  {
    id: 4,
    title: 'Drop the parcel at Bloomingdale',
    completed: false,
  },
  {
    id: 5,
    title: 'Order fruits on Big Basket',
    completed: false,
  },
  {
    id: 6,
    title: 'Fix the production issue',
    completed: false,
  },
  {
    id: 7,
    title: 'Confirm my slot for Saturday Night',
    completed: false,
  },
  {
    id: 8,
    title: 'Get essentials for Sunday car wash',
    completed: false,
  },
]

class SimpleTodos extends Component {
  state = {
    todoList: initialTodosList,
    inputTodoTitle: '',
    todoCount: initialTodosList.length,
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
    const parsedNumber = Number(lastPart)
    const count = Number.isNaN(parsedNumber) ? 1 : parsedNumber
    const title = Number.isNaN(parsedNumber)
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
