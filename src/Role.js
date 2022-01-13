import React from 'react'
import { Dashboard } from './Components/Dashboard/Dashboard'
import {Blog} from './Components/Blog/Blog'
export class Role extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            admin: this.props.admin,
            user: this.props.user
        }
    }
    render(){
        return(
<div>
    <Dashboard id={this.state.admin} />
    <Blog id={this.state.user} />
</div>
        )
    }

}