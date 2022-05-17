import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import './Home.css'
import {getAllPostTodo, updateTodo} from "../../redux/store/todoSlice";



const Home = () => {

    const auth = useSelector(state => state.auth)
    const todos = useSelector(state => state.todos.todos)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllPostTodo())
    },[dispatch])

    const [isEdit, setIsEdit] = useState(false)
    const [id, setId] = useState(null)
    const [updateTitle, setUpdateTitle] = useState("")


    return (
        <div className="container">
                {
                    todos.map(todo => {
                        let cls = ["row flex todos-item"]
                        if(todo.status) {
                            cls.push('status-main')
                        }
                        return (
                            <div className={cls.join(" ")} key={todo.id}>
                                {todo.rename === true ? <p className="col todos-text">{todo?.title} <span style={{color: 'red', fontSize: '10px'}} className="rename">изменено админом</span></p> :<p className="col todos-text">{todo?.title}</p>}


                                { auth.name === 'admin' ?
                                    <i className="col todos-text material-icons blue-text home"
                                        onClick={() => {
                                                 setIsEdit(true)
                                                 setId(todo.id)
                                        }}
                                    >
                                        create
                                    </i> : ""

                                }

                                {isEdit && id === todo.id && (
                                    <>

                                        <input
                                            type="text"
                                            className="col todos-text home-input"
                                            placeholder={todo.title}
                                            onChange={(e) => setUpdateTitle(e.target.value)}
                                            style={{color: "black"}}

                                        />
                                        <i className="col todos-text material-icons blue-text home-edit"
                                           onClick={(e) => {
                                               e.preventDefault()
                                               dispatch(updateTodo({ title: updateTitle, rename: true, id: todo.id }))
                                               setIsEdit(false)
                                           }
                                           }
                                        >
                                            check
                                        </i>
                                    </>
                                )}
                                <p className="col todos-text-name">{todo.User?.name}</p>
                                <p className="col todos-text-email">{todo.User?.email}</p>
                            </div>
                        )
                    })
                }
        </div>
    );
};

export default Home;
