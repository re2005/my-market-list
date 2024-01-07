'use client'

import {useState} from "react";
import signIn from "@/firebase/signIn";

export default function Page() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleForm = async (event: any) => {
    event.preventDefault()

    const {result, error} = await signIn(email, password);

    if (error) {
      return console.log(error)
    }
  }
  return (<div className="wrapper">
    <div className="form-wrapper">
      <h1 className="mt-60 mb-30">Sign up</h1>
      <form onSubmit={handleForm} className="form">
        <label htmlFor="email">
          <p>Email</p>
          <input onChange={(e) => setEmail(e.target.value)} required name="email" id="email"
                 placeholder="example@mail.com" className={'text-black'}/>
        </label>
        <label htmlFor="password">
          <p>Password</p>
          <input onChange={(e) => setPassword(e.target.value)} required type="password" name="password"
                 id="password" placeholder="password" className={'text-black'}/>
        </label>
        <button type="submit">Sign up</button>
      </form>
    </div>
  </div>);
}
