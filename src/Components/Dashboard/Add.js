import React from 'react'
import './styles.css'
import { Posts } from './Posts'
import { getPost } from '../../request'

export class Add extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
        this.handleClick = this.handleClick.bind(this)

    }

    handleClick(e) {
        e.preventDefault()
        getPost("http://localhost:8000/postDB", {
            title: this.title.value,
            content: this.content.value
        })
        this.fetchPost()
    }

    async fetchPost() {
        const request = await fetch('http://localhost:8000/post');
        const allData = await request.json();
        console.log("login state", allData)
        this.setState({
            data: allData
        })
    }

  

    render() {
        return (
            <div className="Add">

                <div className="form-group">
                    <h1>Make a new Post!</h1>

                    <label ><h6>Title</h6></label>
                    <input type="text" className="form-control" name="title" ref={(title) => this.title = title} />
                    <label ><h6>Post</h6></label>
                    <textarea name="post" className="form-control" rows="8" cols="50" ref={(content) => this.content = content}></textarea>
                    <button className="btn btn-info" type="submit" onClick={this.handleClick}>Publish</button>

                </div>

                <Posts data={this.state.data}  />
            </div>
        )
    }
}