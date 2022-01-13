import React, { useEffect, useState } from 'react'
import { getPost } from '../../request'
import ReactDOM from 'react-dom'
function Post({ match }) {
    let viewMode;
    const [post, setPost] = useState({})
    const [message, setMessage] = useState("")
    useEffect(async () => {
        getPost("http://localhost:8000/single", {
            user: match.params.user,
            post_id: match.params.postid
        }).then((res) => {
            console.log(res);
            if (typeof res === "string") {
                setMessage(res)
                viewMode = (
                    <div>
                        {message}
                    </div>
                )
            } else {
                setPost(res)
                console.log(res.title);
                viewMode = (
                    <div className="post card">
                        <h2 className="sub-title">{res.title}</h2>
                        <p className="summary">{res.content}</p>
                    </div>
                )

            }

            ReactDOM.render(viewMode, document.getElementById("view"))
        })


    }, [])





    return (
        <div>
            <h1>Single Post View</h1>
            <div id="view"></div>
        </div>
    )

}

export default Post;