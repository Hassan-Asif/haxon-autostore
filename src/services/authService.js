import {
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth'

import { auth } from '../firebase/config'

export const login = async (email, password) => {
  await setPersistence(auth, browserLocalPersistence)

  return signInWithEmailAndPassword(
    auth,
    email,
    password
  )
}

export const logout = () => {
  return signOut(auth)
}