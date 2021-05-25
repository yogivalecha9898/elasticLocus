import CustSignIn from './custSI'
import CustSignUp from './custSU'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { db } from './firebase'

function User({ props }) {

    return (
        <div>
            <Router>
                <Switch>
                    <Route path='/user' render={() => {
                    return (
                        <>
                        <Link to='custSI'>Sign In</Link>
                        <Link to='custSU'>Sign Up</Link>
                        </>
                    )
                    }}/>
                    <Route render={() => <CustSignIn props={props}/>} path='/custSI' />
                <Route render={() => <CustSignUp props={props} />} path='/custSU' />
                </Switch>
            </Router>
        </div>
    )
}

export default User