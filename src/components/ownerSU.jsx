import { useState, useEffect } from "react"
import { auth, db } from './firebase'

function OwnerSignUp({ props }) {

    const[Info, setInfo] = useState({})
    const[info1, setInfo1] = useState([])

    const[curUser, setUser] = useState({}) 

    const[value, setValue] = useState(0)
    const[email, setEmail] = useState('')
    const[oName, setOName] = useState('')
    const[pass, setPass] = useState('')
    const[eName, setEName] = useState('')
    const[service, setService] = useState('')
    const[num, setNum] = useState('')

    const[click, setClick] = useState('')

    const[country, setCountry] = useState('')
    const[street, setStreet] = useState('')
    const[city, setCity] = useState('')
    const[state, setState] = useState('')
    const[pin, setPin] = useState('')

    const handleSubmit1 = () => {
        if(email && pass) {
            const info = {
                OwnerName: oName,
                Email: email,
                Password: pass,
                EnterpriseName: eName,
                Services: service,
                MobileNumber: num
            }
            setInfo(info)
            setOName('')
            setEName('')
            setEmail('')
            setNum('')
            setService('')
            setPass('')
            setValue(value+1)
        } else {
            alert("Please fill all the values correctly")
        }
    }

    const handleSubmit2 = () => {
        if(click === "true") setValue(value+1)
        else {

        }
    }

    const handleSubmit3 = () => {
        if(country) {
            const address = {
                Country: country,
                State: state,
                City: city,
                Pin: pin,
                Street: street
            }
            
            const combined = { Info, address }
            console.log(combined)

            auth.createUserWithEmailAndPassword(Info.Email, Info.Password)
            .then(user => {
                if(user) {
                    console.log(user)
                    db.ref('Owners').push(combined)
                    setUser(user)
                    props.history.push('/ownerSI')
                } else setUser(user)
            })
            .catch(err => console.log(err))
                    
            setCountry('')
            setCity('')
            setPin('')
            setStreet('')
            setState('')
            setValue(2)
        } else alert("gaand marao")
    }

    useEffect(() => {
        if(Object.keys(curUser).length !== 0) localStorage.setItem("oSToken", curUser.user.uid)
    }, [curUser])

    if(value === 0) {
        return (
            <form>
                <table>
                    <tr>
                        <td>Email</td>
                        <td><input value={email} type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/></td>
                    </tr>
                    <tr>
                        <td>Owner Name</td>
                        <td><input value={oName} type="text" placeholder="Owner Name" onChange={(e) => setOName(e.target.value)}/></td>
                    </tr>
                    <tr>
                        <td>Password</td>
                        <td><input value={pass} type="password" placeholder="password" onChange={(e) => setPass(e.target.value)}/></td>
                    </tr>
                    <tr>
                        <td>Enterprise Name</td>
                        <td><input value={eName} type="text" placeholder="Enterprise Name" onChange={(e) => setEName(e.target.value)}/></td>
                    </tr>
                    <tr>
                        <td>Services</td>
                        <td><input value={service} type="text" placeholder="Bikes/Cars" onChange={(e) => setService(e.target.value)}/></td>
                    </tr>
                    <tr>
                        <td>Mobile Number</td>
                        <td><input value={num} type="text" placeholder="Number" onChange={(e) => setNum(e.target.value)}/></td>
                    </tr>
                </table>
                <input type="button" value="Next" onClick={handleSubmit1}/>
            </form>
        )
    } else {
        return (
            <>
                <button onClick={() => {
                    setValue(value-1)
                    setClick("false")
                }}>
                    Go Back
                </button>
                {value === 1 ? 
                    <div>
                        <form>
                            <h1>Do you want to add a location customers can visit, like a store or office?</h1>
                            <h3>This location will show up on locus and Search when customers are looking for your business</h3>
                            <input type="radio" name="val" value="true" onClick={e => setClick(e.target.value)}/>Yes
                            <input type="radio" name="val" value="false" onClick={e => setClick(e.target.value)}/>No
                            <input type="button" value="Next" onClick={handleSubmit2}/>
                         </form>
                         {click}
                     </div>:<div></div>
                }
                {value === 2 ?
                    <div>
                        <h1>What's the address?</h1>
                        <form>
                            <input value={country} type="text" placeholder="Country" onChange={e => setCountry(e.target.value)}/>
                            <input value={street} type="text" placeholder="Street Address" onChange={e => setStreet(e.target.value) }/>
                            <input value={city} type="text" placeholder="City" onChange={e => setCity(e.target.value)}/>
                            <input value={pin} type="text" placeholder="Pincode" onChange={e => setPin(e.target.value)} />
                            <input value={state} type="text" placeholder="State" onChange={e => setState(e.target.value)} />
                            <input type="button" value="Submit" onClick={handleSubmit3}/>
                        </form>
                    </div>:<div></div>
                }
            </>
        )
    }
}

export default OwnerSignUp