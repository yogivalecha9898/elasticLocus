import OwnerSignIn from './ownerSI'
import OwnerSignUp from './ownerSU'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

function User({ props }) {

    console.log(props)

    return (
        <div>
        <Router>
            <Switch>
                <Route path='/owner' render={() => {
                return (
                    <>
                    <Link to='/ownerSI'>Sign In</Link>
                    <Link to='/ownerSU'>Sign Up</Link>
                    </>
                )
                }}/>
                <Route render={() => <OwnerSignIn props={props}/>} path='/ownerSI' />
                <Route render={() => <OwnerSignUp props={props} />} path='/ownerSU' />
            </Switch>
        </Router>
        </div>
    )
}

export default User