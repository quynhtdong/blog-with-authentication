import React from 'react'
import { getPost } from '../../request'

export class Update extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            id: this.props.post.id,
            title: this.props.post.title,
            content: this.props.post.content,
        }

        this.handleContent = this.handleContent.bind(this)
        this.handleTitle = this.handleTitle.bind(this)
        this.handleSave = this.handleSave.bind(this)
    }

    handleTitle = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    handleContent = (e) => {
        this.setState({
            content: e.target.value
        })
    }

    handleSave = async () => {
        console.log("hello ok");
        const request = await fetch('http://localhost:8000/current');
        const res = await request.json();
        console.log(res.id);

        console.log("my info:", this.state.id, this.state.title, this.state.content);
        window.location.href = `/dashboard/${res.id}`

        // setTimeout(function () {
           await getPost("http://localhost:8000/update", {
            id: this.state.id,
            title: this.state.title,
            content: this.state.content
        })
        console.log(100);
        // }, 10000);
        
    }

    render() {
        return (
            <div className="form-group">
                <h1>Edit</h1>

                <label ><h6>Title</h6></label>
                <input type="text" className="form-control" name="title" defaultValue={this.state.title} onChange={(e) => this.handleTitle(e)} />
                <label ><h6>Post</h6></label>
                <textarea name="post" className="form-control" rows="8" cols="50" defaultValue={this.state.content} onChange={(e) => this.handleContent(e)}></textarea>
                <button className="btn btn-primary" type="submit" onClick={() => { this.handleSave() }}>Save</button>
            </div>
        )
    }

}