import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth"
import { auth } from "../../firebase/firebase_init"
import { AuthContext } from "./AuhContext"
import { useEffect, useState } from "react"

const provider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const registerUser = (email, password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signedUser = (email, password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const handleGoogleSigned = () =>{
        return signInWithPopup(auth, provider)
    }
    const updateUserProf = (profile) =>{
        return updateProfile(auth.currentUser, profile)
    }

    const signOutUser = () =>{
        setLoading(false)
        return signOut(auth)
    }

    const passReset = (email) =>{
        return sendPasswordResetEmail(auth, email)
    }
    useEffect(() =>{
        const unSubscribe = onAuthStateChanged(auth, (currentUser) =>{
            setUser(currentUser)
            setLoading(false)
        })

        return () =>{
            unSubscribe()
        }
    }, [])

    const authInfo = {
        user,
        loading,
        registerUser,
        signedUser,
        handleGoogleSigned,
        signOutUser,
        passReset,
        updateUserProf
    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    )
}
export default AuthProvider;