import React, {useEffect} from 'react';
import Context from './context';
import TodoList from './Todo/TodoList';
import AddTodo from './Todo/AddTodo';
import Loader from './Loader';

function App() {
    let [todos, setTodos] = React.useState([])
    let [loading, setLoading] = React.useState(true)

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos/?_limit=10')
            .then(response => response.json())
            .then(todos => {
                setTimeout(() => {
                    setTodos(todos)
                    setLoading(false)
                }, 2000)
            })
    }, [])

    function toggleTodo(id) {
        setTodos(
            todos = todos.map(todo => {
                if (todo.id === id) {
                    todo.completed = !todo.completed
                }
                return todo
            }))
    }

    function removeTodo(id) {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    function addTodo(title) {
        setTodos(todos.concat([{
            title,
            id: Date.now(),
            completed: false
        }]))
    }

    return (
        <Context.Provider value={{removeTodo}}>
            <div className="wrapper">
                <h1>React tutorial</h1>
                <AddTodo onCreate={addTodo}/>
                {loading && <Loader/>}
                {todos.length ? (
                    <TodoList todos={todos} onToggle={toggleTodo}/>
                ) : loading ? null : (
                    <p>No todos :)</p>
                )}
            </div>
        </Context.Provider>
    )
}

export default App
