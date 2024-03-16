
import {useState, useReducer} from 'react'

const  ACTIONS = {
  ADD_TODO: 'addTodo',
  COMPLETE_TODO: 'completeTodo',
  DELETE_TODO: 'deleteTodo'

}
function reducer(todos, action) {
    switch (action.type) {
      case ACTIONS.ADD_TODO:
        return [...todos, newTodo(action.payload.name)]

      case ACTIONS.COMPLETE_TODO:
        return todos.map((todo) => {
          if (todo.name === action.payload.name) {
            return {
            ...todo,
                completed:!todo.completed
            }
            }
            return todo
          })
          
      case ACTIONS.DELETE_TODO:
        return todos.filter((todo) => todo.name!== action.payload.name)

      default:
        return newItem
    }

}

function newTodo(name){
  return {id: Date.now(), name: name, completed: false}

}

function ToDoList() {

    const [todos, dispatch] = useReducer(reducer, [])
    const [name, setName] = useState('');
  // const [newItem, setNewItem] = useState('');
  // const [showInput1, setShowInput1] = useState(false);
  // const [showInput2, setShowInput2] = useState(false);
  // const [input1Value, setInput1Value] = useState('');
  // const [input2Value, setInput2Value] = useState('');

  function handleSubmit(e){
    e.preventDefault()
    dispatch({type: ACTIONS.ADD_TODO, payload: {name: name}});
    setName('')
  }

  

  

  return (
    <>
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} className="text-black" onChange={e=> setName(e.target.value)}/>
      <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 ml-2"
        >
          Add
        </button>
    </form>

    <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center mb-2">
            <span style={{ color: todo.completed ? '#AAA' : "#000"}}>{todo.name}</span>
            <button
              onClick={() => dispatch({type:ACTIONS.DELETE_TODO, payload: {name: todo.name}})}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 ml-2"
            >
              Remove
            </button>
            <button
              onClick={() => dispatch({type:ACTIONS.COMPLETE_TODO, payload: {name: todo.name}})}
              className="bg-green-500 text-white font-bold py-1 px-4 ml-2"
            >
              Complete
            </button>
          </li>
        ))}
      </ul>
      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={showInput1}
            onChange={(e) => setShowInput1(e.target.checked)}
            className="form-checkbox"
          />
          <span className="ml-2">Show Input 1</span>
        </label>
      </div>

      {showInput1 && (
        <div className="mb-4">
          <input
            type="text"
            value={input1Value}
            onChange={handleInput1Change}
            placeholder="Enter value for Input 1"
            className="border border-gray-300 px-2 py-1 w-full"
          />
        </div>
      )}
    
    </>
    
  );


}

export default ToDoList