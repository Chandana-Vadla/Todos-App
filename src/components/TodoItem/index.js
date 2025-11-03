import {Component, createRef} from 'react'
import './index.css'

class TodoItem extends Component {
  textareaRef = createRef()

  constructor(props) {
    super(props)
    const {todo} = props
    this.state = {
      isEditing: false,
      text: todo.title,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {text} = this.state
    if (prevState.text !== text) {
      this.adjustTextareaHeight()
    }
  }

  adjustTextareaHeight = () => {
    const textarea = this.textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }

  setText = event => {
    this.setState({text: event.target.value}, this.adjustTextareaHeight)
  }

  handleEditClick = () => {
    this.setState({isEditing: true}, this.adjustTextareaHeight)
  }

  handleSaveClick = () => {
    this.setState({isEditing: false})
  }

  render() {
    const {todo, deleteTodo, toggleComplete} = this.props
    const {id, completed} = todo
    const {text, isEditing} = this.state

    return (
      <li className="todo-item">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => toggleComplete(id)}
          className="todo-checkbox"
        />

        {isEditing ? (
          <textarea
            ref={this.textareaRef}
            className="todo-text editable"
            value={text}
            onChange={this.setText}
            rows={1}
          />
        ) : (
          <p className={`todo-text ${completed ? 'completed' : ''}`}>{text}</p>
        )}

        <div className="todo-buttons">
          <button
            type="button"
            className={`edit-button ${isEditing ? 'save' : ''}`}
            onClick={isEditing ? this.handleSaveClick : this.handleEditClick}
          >
            {isEditing ? 'Save' : 'Edit'}
          </button>

          <button
            type="button"
            className="delete-button"
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
