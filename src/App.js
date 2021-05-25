import User from './components/cust'
import Owner from './components/owner'
import OwnerInfo from './components/ownerInfo'
import { useState } from 'react'
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom'
import OwnerSignIn from './components/ownerSI'
import CustSignIn from './components/custSI'
import CustDashboard from './components/custDash'

function App() {

  return (
    <div>

      <Router>
          <Switch>
            <Route exact path='/' render={() => {
              return (
                <>
                  <Link to='/user'>user</Link>
                  <Link to='/owner'>Owner</Link>
                </>
              )
            }}/>
            <Route render={(props) => <User props={props} />} path='/user' />
            <Route render={(props) => <Owner props={props}/>} path='/owner' />
            <Route render={(props) => localStorage.getItem('cSToken') ? <CustSignIn props={props} />:<Redirect to="/" />} path='/custSI'/>
            <Route render={(props) => localStorage.getItem('oSToken') ? <OwnerSignIn props={props} />:<Redirect to="/" />} path='/ownerSI'/>
            <Route render={(props) => localStorage.getItem('oLToken') ? <OwnerInfo props={props} />:<Redirect to="/" />} path='/ownerInfo'/>
            <Route render={(props) => localStorage.getItem('cLToken') ? <CustDashboard props={props} />:<Redirect to="/" />} path='/custDash'/>
          </Switch>
      </Router>
    </div>
  )
}

export default App