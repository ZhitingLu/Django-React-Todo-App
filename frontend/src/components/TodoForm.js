import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";

const backendServer = "http://127.0.0.1:8001/";

const TodoForm = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [completed, setCompleted] = useState(false);

    // creat a new todo
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title) {
            alert("Please provide a title for the new todo");
            return;
        }
        if (!description) {
            alert("Please provide a description");
            return;
        }

            axios.post(`${backendServer}api/todos/`, {
            title: title,
            description: description,
            completed: completed,
        }).then((res) => {
            const { data } = res;
            console.log(data);
            setTitle("");
            setDescription("");
            setCompleted(false);
            //TODO: try to reload using hooks
        }).catch(() => {
                alert("Something went wrong");
            })
    };

    return <Form onSubmit={handleSubmit}>
        <Form.Group  className="mb-4">
            <Form.Label>Title</Form.Label>
            <Form.Control placeholder="New Todo Title"
                         value={title}
                         onChange={e => setTitle(e.target.value)}
            />
        </Form.Group>
        <Form.Group className="mb-4">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea"
                         row={5}
                         placeholder="Click to write a new todo description..."
                         value={description}
                         onChange={e => setDescription(e.target.value)}
            />
        </Form.Group>
         <Button type="submit">
                Add
         </Button>
    </Form>
}

export default TodoForm;