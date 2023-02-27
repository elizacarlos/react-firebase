import { auth, googleProvider } from "../config/firebase"
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth"
import { useState } from "react"

export const Auth = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  console.log(auth?.currentUser?.email)
  const handleSigin = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
    } catch (error) {
      console.error(error)
    }
  }

  const handleSiginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (error) {
      console.error(error)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <input
        placeholder="Enter Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Enter Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSigin}>Sign In</button>
      <button onClick={handleSiginWithGoogle}>Sign in with Google</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}
