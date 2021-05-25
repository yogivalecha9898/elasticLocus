import { useEffect, useState } from 'react'
import { auth, db } from './firebase'

function CustSignUp({ props }) {

    console.log(props)

    const[email, setEmail] = useState('')
    const[name, setName] = useState('')
    const[pass, setPass] = useState('')
    const[num, setNum] = useState('')
    const[VRNnum, setVRNNum] = useState('')

    const[curUser, setUser] = useState({})

    const handleSubmit = ()=> {
        const info = {
            Name: name,
            Email: email,
            Password: pass,
            MobileNumber: num,
            Vehicle: VRNnum
        }

        auth.createUserWithEmailAndPassword(email, pass).then((user) => {
            if(user) {
                setUser(user)
                db.ref('Users').push(info)
                props.history.push("/custSI")
            } else console.log(user)
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        if(Object.keys(curUser).length !== 0) localStorage.setItem("cSToken", curUser.user.uid)
    }, [curUser])

    return (
        <form>
            <table>
                    <tr>
                        <td>Name</td>
                        <td><input value={name} type="text" placeholder="Owner Name" onChange={(e) => setName(e.target.value)}/></td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td><input value={email} type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/></td>
                    </tr>
                    <tr>
                        <td>Password</td>
                        <td><input value={pass} type="password" placeholder="Password" onChange={(e) => setPass(e.target.value)}/></td>
                    </tr>
                    <tr>
                        <td>Number</td>
                        <td><input value={num} type="text" placeholder="Number" onChange={(e) => setNum(e.target.value)}/></td>
                    </tr>
                    <tr>
                        <td>Vehicle Registration Number</td>
                        <td><input value={VRNnum} type="text" placeholder="VRN" onChange={(e) => setVRNNum(e.target.value)}/></td>
                    </tr>
                </table>
            <input onClick={handleSubmit} type="button" value="Next"/>
        </form>
    )
}

export default CustSignUp