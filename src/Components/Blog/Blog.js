import React from 'react'
import './styles.css'
import { Link } from 'react-router-dom'

export class Blog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            user: [],
            user: ""
        }
        this.fetchPost = this.fetchPost.bind(this)
        this.fetchUser = this.fetchUser.bind(this)
    }
    async fetchPost() {
        const request = await fetch('http://localhost:8000/post');
        const allData = await request.json();
        console.log("login state", allData)
        this.setState({
            posts: allData
        })
    }
    async fetchUser() {
        const requestUser = await fetch('http://localhost:8000/user');
        const allUser = await requestUser.json();
        console.log(allUser);

        this.setState({
            users: allUser
        })
        const request = await fetch('http://localhost:8000/current');
        const res = await request.json();
        console.log(res.username)
        this.setState({
            user: res.username
        })
        
    }

    componentDidMount() {
        this.fetchPost()
        this.fetchUser()
        
    }


    render() {
        return (
            <div>
                
                <div className="post">
                    <h1>THE BLOG</h1>
                    {this.state.posts.map(post => {
                        return (
                            <div className="post1 card" key={post.id}>
                                <Link to={`/post/${this.state.user}/to/${post.id}`}>

                                    <h2 className="sub-title">{post.title}</h2>

                                </Link>
                                <p className="summary">{post.content}</p>
                            </div>
                        )
                    })}



                </div>
            </div>
        )
    }
}