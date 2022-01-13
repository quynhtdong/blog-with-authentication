import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import { getPost } from '../../request'
import './styles.css'
import { Update } from './Update'


export const Posts = (props) => {

    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetchPost()
        fetchUser()
    }, [props.data])

    let prevPost;
    const handleUpdate = (e, prevTitle, prevContent, id) => {
        prevPost = {
            id: id,
            title: prevTitle,
            content: prevContent
        }
        ReactDOM.render(<Update post={prevPost} />, document.getElementById("update"))

    }


    const handleDelete = async (post) => {
        getPost("http://localhost:8000/deleteOne", {
            title: post.title
        })
        fetchPost()
    }

    const handleSelect = (e, id) => {

        console.log("chosen:", e.target.innerHTML);
        console.log("post-id", id);
        getPost("http://localhost:8000/auth", {
            username: e.target.innerHTML,
            post_id: id
        })
        .then(() => {
            fetchPost()
        })
    }

    const handleCancel = (user, id) => {
        getPost("http://localhost:8000/cancel", {
            username: user,
            post_id: id

        })
        .then(() => {
            fetchPost()
        })
        
    }

    const fetchPost = async () => {
        const requestPost = await fetch('http://localhost:8000/post');
        const allPost = await requestPost.json();
        console.log("login state", allPost)
        setPosts(allPost)

    }

    const fetchUser = async () => {
        const requestUser = await fetch('http://localhost:8000/user');
        const allUser = await requestUser.json();
        console.log(allUser);

        setUsers(allUser)
    }

    return (
        <div className="Posts">
            <div className="post">
                <div id="update"></div>

                {posts.map(post => {
                    return (
                        <div className="post1 card" id="post" key={post.id}>
                            <h2 className="sub-title">{post.title}</h2>
                            <p className="summary">{post.content}</p>
                            <button className="btn btn-success" onClick={(e) => { handleUpdate(e, post.title, post.content, post.id) }}>Update</button>
                            <button className="btn btn-outline-danger" onClick={() => { handleDelete(post) }}>Delete</button>
                            <DropdownButton id="dropdown-basic-button" title="Who can view this?">
                                {users.map(user => {
                                    return (
                                        <Dropdown.Item onClick={(e) => handleSelect(e, post.id)} key={user._id}>{user.username}</Dropdown.Item>

                                    )
                                })}

                            </DropdownButton>

                            <ul id="auth">
                                {post.users.map(user => {
                                    return (
                                        <li>{user}  <button id="cancel" className="btn btn-outline-danger" onClick={() => { handleCancel(user, post.id) }}>X</button></li>
                                    )
                                })}
                            </ul>
                        </div>

                    )

                })}
            </div>
        </div>
    )
}