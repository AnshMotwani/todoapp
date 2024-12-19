import cb from "./img/cb.png";
import ecb from "./img/ecb.png";
import db from "./img/delete.png";

export default function Todo(props) {
    const { todo, setTodos } = props;

    const updateTodo = async (todoId, todoStatus) => {
        const res = await fetch(`/api/todos/${todoId}`, {
            method: "PUT",
            body: JSON.stringify({ status: todoStatus }),
            headers: {
                "Content-Type": "application/json"
            },
        });

        const json = await res.json();
        if (json.acknowledged) {
            setTodos(currentTodos => {
                return currentTodos.map((currentTodo) => {
                    if (currentTodo._id === todoId) {
                        return { ...currentTodo, status: !currentTodo.status };
                    }
                    return currentTodo;
                });
            });
        }
    };

    const deleteTodo = async (todoId) => {
        const res = await fetch(`/api/todos/${todoId}`, {
            method: "DELETE"
        });
        const json = await res.json();
        if (json.acknowledged) {
            setTodos(currentTodos => {
                return currentTodos
                    .filter((currentTodo) => (currentTodo._id !== todoId));
            })
        }

    };


    return (
        <div className="todo">
            <p>{todo.todo}</p>
            <div className="mutations">
                <button
                    className="todo__status"
                    onClick={() => updateTodo(todo._id, todo.status)}>
                    <img src={(todo.status ? cb : ecb)} alt="Status" />
                </button>
                <button
                    className="todo__delete"
                    onClick={() => deleteTodo(todo._id)}>
                    <img src= {db} alt="Delete" />
                </button>
            </div>
        </div>
    )
}