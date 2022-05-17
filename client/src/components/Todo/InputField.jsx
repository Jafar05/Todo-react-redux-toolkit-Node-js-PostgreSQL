import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {addNewTodo, deleteTodo, getAllPost, toggleStatus} from "../../redux/store/todoSlice";
import Pagination from "./Pagination";
import './InputField.css'
import {useNavigate} from "react-router-dom";
const InputField = () => {

    const dispatch = useDispatch()
    const todos = useSelector(state => state.todos.todos)
    const auth = useSelector(state => state.auth)
    const navigate = useNavigate();


    const [text, setText] = useState('')

    const [pages, setPages] = useState(1)
    const [countPages] = useState(3)

    const lastIndex = pages * countPages
    const firstIndex = lastIndex - countPages
    const currentIndex = todos.slice(firstIndex, lastIndex)

    const clickHandler = (e) => {
        e.preventDefault()
        for(let i = 0; i < currentIndex.length; i++) {
            return currentIndex[i]
        }
    }

    const paginate = pageNumber => setPages(pageNumber)
    const nextPage = () => setPages(prev => prev + 1)
    const prevPage = () => setPages(prev => prev - 1)

    const handleSubmit = () => {
        dispatch(addNewTodo(text))
        setText('');
    }

    useEffect(() => {
        dispatch(getAllPost())
    },[dispatch])


    useEffect(() => {
        if(!auth.id) {
            navigate('/')
        }
    },[auth.id, navigate])


    const [concatData, setConcatData] = useState([])


  const sortData = () => {
    const newArr = currentIndex.map(el => el)
    const sortData = newArr.sort((a,b) => a.id - b.id)
      setConcatData(sortData)
  }

  useEffect(() => {
      setConcatData(currentIndex)
  },[])



    return (
        <>
            <div className="container">
                <div className="main-page">
                    <h3>Добавить задачу</h3>
                    <form className="form form-login">
                        <div className="row">
                            <div className="input-field col s12">
                                <input type="text" name="input" placeholder="Задача" value={text} onChange={(e) => setText(e.target.value)}/>
                            </div>
                        </div>
                        <div>
                            <button className="waves-effect waves-light btn blue" onClick={handleSubmit}>Добавить</button>
                        </div>
                    </form>
                        <h3>Активные задачи</h3>
                    {/*<button className="btn" onClick={sortData}>sort</button>*/}

                    <div className="todos">
                        {currentIndex.map((todo) => {
                            let cls = ["row flex todos-item"]
                            if(todo.status) {
                                cls.push('status')
                            }


                            return (
                                <div className={cls.join(" ")} key={todo.id}>
                                    <div className="col todos-text">{todo?.title}</div>
                                    <div className="col todos-buttons">
                                        <span><i className="material-icons blue-text status" checked={todo.status} onClick={() => dispatch(toggleStatus(todo.id))}>check</i></span>
                                        <i className="material-icons red-text" onClick={() => dispatch(deleteTodo(todo.id))}>delete</i>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>



                 <Pagination
                    countPages={countPages}
                    totalResult={todos.length}
                    paginate={paginate}
                    nextPage={nextPage}
                    prevPage={prevPage}
                    className="pagination"
                />
        </>
    );
};

export default InputField;
