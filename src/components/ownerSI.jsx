import { useState, useEffect } from 'react'
import { auth, db } from './firebase'

function OwnerSignIn({ props }) {

    const[eName, setEName] = useState('')
    const[email, setEmail] = useState('')
    const[pass, setPass] = useState('')
    const[curUser, setUser] = useState({})

    const clear = () => {
        setEName('')
        setEmail('')
        setPass('')
    }

    const handleSubmit = () => {
        auth.signInWithEmailAndPassword(email, pass).then(user => {
            if(user) {
                let next = false
                setUser(user)
                db.ref('Owners').get().then(val => {
                    val.forEach(value => {
                        console.log(value.val().Info.Email, email, value.val().Info.Password, pass)
                        if(value.val().Info.Email == email && value.val().Info.Password == pass) {
                            next = true
                        }
                    })
                    clear()
                    if(next) props.history.push("/ownerInfo")
                    else alert("The user does not exist")
                })
            }
            else setUser(user)
        })
    }

    useEffect(() => {
        if(Object.keys(curUser).length !== 0) localStorage.setItem("oLToken", curUser.user.uid)
    }, [curUser])

    return (
        <div>
            <table>
                <tr>
                    <td>Enterprise name</td>
                    <td><input value={eName} type="text" placeholder="Enterprise Name" onChange={e => setEName(e.target.value)}/></td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td><input value={email} type="email" placeholder="Email" onChange={e => setEmail(e.target.value)}/></td>
                </tr>
                <tr>
                    <td>Password</td>
                    <td><input value={pass} type="password" placeholder="Password" onChange={e => setPass(e.target.value)}/></td>
                </tr>
                <input onClick={handleSubmit} type="submit" value="Submit"/>
            </table>
        </div>
    )
}

export default OwnerSignIn