import React, {useState} from "react";
import ListGroup from "react-bootstrap/ListGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {MdCheckBox, MdCheckBoxOutlineBlank, MdDelete, MdEdit} from "react-icons/md";
import axios from "axios";
import Form from "react-bootstrap/Form";

const backendServer = "http://127.0.0.1:8001/";

const TodoList = ({todos = [], setTodos}) => {
    const [show, setShow] = useState(false);
    const [id, setId] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleClose = () => {
        setShow(false);
    };

    const handleDelete = (id) => {
        axios.delete(`${backendServer}api/todos/${id}/`)
            .then(() => {
                const newTodos = todos.filter(t => {
                    return t.id !== id
                });
                setTodos(newTodos);
            }).catch(() => {
            alert("Something went wrong");
        })
    };

    const handleUpdate = async (id, value) => {
        return axios.patch(`${backendServer}api/todos/${id}/`, value)
            .then((res) => {
                let {data} = res;
                const newTodos = todos.map(t => {
                    if (t.id === id) {
                        return data;
                    }
                    return t;
                })
                setTodos(newTodos);
            }).catch(() => {
                alert("Something went wrong");
            })
    }

    const renderListGroupItem = (t) => {
        return <ListGroup.Item key={t.id} className="d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-center">
                <span style={{
                    marginRight: "12px", cursor: "pointer"
                }} onClick={() => {
                    handleUpdate(t.id, {
                        completed: !t.completed,
                    }).then()
                }}>
                    {t.completed === true ? <MdCheckBox/> : <MdCheckBoxOutlineBlank/>}
                </span>
                <ul>
                    <h2>{t.title}</h2>
                    <p>
                        {t.description}
                    </p>
                </ul>


            </div>
            <div>
                <MdEdit style={{
                    cursor: "pointer",
                    marginRight: "12px"
                }} onClick={() => {
                    // reset the state value when the edit modal is activated
                    setId(t.id);
                    setTitle(t.title);
                    setDescription(t.description);
                    setShow(true);
                }}/>
                <MdDelete style={{
                    cursor: "pointer"
                }} onClick={() => {
                    handleDelete(t.id);
                }}/>
            </div>
        </ListGroup.Item>
    }
    // const handleInputChange = (e) => {
    //     // const name = e.target.name;
    //     // const value = e.target.value;
    //     // Using object destructuring to extract the name and the value attributes from our inputs:
    //     const {name, value} = e.target;
    //     // updating our values state object with the existing values by using the setValues() function and the spread operator:
    //     setValues({
    //         values,
    //         [name]: value,
    //     });
    // };

    const handleSaveChanges = async () => {
        await handleUpdate(id, {title: title, description: description});
        console.log(id);
        handleClose();
    }

    const completedTodos = todos.filter(t => t.completed === true);
    const incompleteTodos = todos.filter(t => t.completed === false);

    return <div>
        <div className="mb-2 mt-4">
            Uncompleted Todos: ({incompleteTodos.length})
        </div>
        <ListGroup>
            <ListGroup.Item>
                {incompleteTodos.map(renderListGroupItem)}
            </ListGroup.Item>
        </ListGroup>
        <div className="mb-2 mt-4">
            Completed Todos: ({completedTodos.length})
        </div>
        <ListGroup>
            <ListGroup.Item>
                {completedTodos.map(renderListGroupItem)}
            </ListGroup.Item>
        </ListGroup>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Todo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Label>Title</Form.Label>
                <FormControl value={title}
                             onChange={e => setTitle(e.target.value)}
                />
                <Form.Label>Description</Form.Label>
                <FormControl as="textarea"
                             value={description}
                             onChange={e => setDescription(e.target.value)}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSaveChanges}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
}

export default TodoList;