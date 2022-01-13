import React from "react"
import { getPost } from '../request'



export class Signin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: false,
            role: 'role',
            id: "",
            username: ""
        }
        this.handleClick = this.handleClick.bind(this)
        this.checkRole = this.checkRole.bind(this)
        this.currentRole = this.currentRole.bind(this)
    }

    handleClick(e) {
        e.preventDefault();
        getPost("http://localhost:8000/signin", {
            username: this.user.value,
            password: this.password.value
        })

        this.checkRole()

    }

    async checkRole() {
        const request = await fetch('http://localhost:8000/signin');
        const allData = await request.json();
        console.log("login state", allData)
        this.setState({
            loggedIn: allData.loggedIn,
            role: allData.role,
            id: allData.id,
            username: allData.username
        })
        if (this.state.loggedIn) {
            if (this.state.role === 'admin') {
                console.log(this.state.id);
                window.location.href = `/dashboard/${this.state.id}`
            } else {
                window.location.href = `/blog/${this.state.id}`
            }

        } this.currentRole()
    }

    currentRole(){
        getPost("http://localhost:8000/current", {
            id: this.state.id,
            username: this.state.username

        })
    }
    render() {
        return (
            <div className="Signin">
                <h1>Sign In</h1>
                <div className="row">

                    <div className="col-sm-8">
                        <div className="card">
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>Username</label>
                                        <input className="form-control" name="username" ref={(user) => this.user = user} />
                                    </div>
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input type="password" className="form-control" name="password" ref={(password) => this.password = password} />
                                    </div>
                                    <button type="submit" className="btn btn-dark" onClick={this.handleClick}>Sign In</button>
                                </form>

                            </div>
                        </div>
                    </div>

                </div>
                
            </div>


        )
    }
}