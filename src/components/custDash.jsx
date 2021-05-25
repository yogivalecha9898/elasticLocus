import { auth } from './firebase'

function CustDashboard({ props }) {

    const signOut = () => {
        auth.signOut().then(() => {
            localStorage.removeItem("cLToken")
            props.history.push("/")
        })
    }

    return (
        <div>
            Hello this will have the information
            <button onClick={signOut}>Sign Out</button>
        </div>
    )
}

export default CustDashboard