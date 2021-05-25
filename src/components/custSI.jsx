import { useEffect, useState } from 'react'
import { auth, db } from './firebase'

function CustSignIn({ props }) {

    const[name, setName] = useState('')
    const[email, setEmail] = useState('')
    const[pass, setPass] = useState('')
    const[curUser, setUser] = useState({})

    const clear = () => {
        setName('')
        setEmail('')
        setPass('')
    }

    const handleSubmit = () => {
        let next = false
        auth.signInWithEmailAndPassword(email, pass).then(user => {
            if(user) {
                setUser(user)
                db.ref('Users').get().then(val => {
                    val.forEach(value => {
                        console.log(value.val().Email, email, value.val().Password, pass)
                        if(value.val().Email == email && value.val().Password == pass) {
                            next = true
                        }
                    })
                    clear()
                    if(next) props.history.push("/custDash")
                    else alert("The user does not exist")
                })
            }
            else setUser(user)
        })
        .catch(err => {
            console.log(err)
            alert(err.message)
            clear()
        })
    }

    useEffect(() => {
        if(Object.keys(curUser).length !== 0) localStorage.setItem("cLToken", curUser.user.uid)
    }, [curUser])

    return (
        <div>
            <table>
                <tr>
                    <td>Name</td>
                    <td><input value={name} type="text" placeholder="Name" onChange={e => setName(e.target.value)}/></td>
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

export default CustSignIn