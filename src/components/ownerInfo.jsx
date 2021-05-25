import { auth } from './firebase'

function OwnerInfo({ props }) {

    const signOut = () => {
        auth.signOut().then(() => {
            localStorage.removeItem("oLToken")
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

export default OwnerInfo