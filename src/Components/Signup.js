import React from "react"
import { getPost } from '../request'

export class Signup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: false
        }
        this.handleClick = this.handleClick.bind(this)
        
    }

    handleClick(e) {
        e.preventDefault();
        getPost("http://localhost:8000", {
            username: this.user.value,
            password: this.password.value
        })
        this.setState({
            registered: true
        })
    }
    render() {
        return (
            <div className="Signup">
                <h1>Sign Up</h1>
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
                                <button type="submit" className="btn btn-dark" onClick={this.handleClick}>Sign Up</button>
                            </form>

                        </div>
                    </div>
                </div>

            </div>
            
                {this.state.registered ? window.location.href="/signin" : console.log("failed")}            

            </div>

        )
    }
}