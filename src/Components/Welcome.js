import React from 'react';
import {Link} from 'react-router-dom'
import './styles.css'

export class Welcome extends React.Component{
render(){
    return(
        <div className="Welcome">
        <h1>Welcome to The Blog</h1>

        <Link to="/signin"> 
        <button className="btn btn-dark">Sign In</button>
        </Link>
    
        <Link to="/signup">
        <button className="btn btn-dark">Sign Up</button>
        </Link>

        </div>
    )
}
}