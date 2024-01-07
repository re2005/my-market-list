'use client'

import {useState} from "react";
import {signIn} from "@/firebase/auth";

export default function Page() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleForm = async (event: any) => {
    event.preventDefault()

    const {result, error} = await signIn(email + '@gmail.com', password);

    if (error) {
      return console.log(error)
    }
  }

  return (
    <div className="form-wrapper">
      <p>
        Sign in to your account
      </p>
      <form onSubmit={handleForm} className='flex flex-col gap-4 mt-6'>
        <div className='flex flex-col gap-3'>
          <label htmlFor="user" className='flex gap-3 items-center'>
            <p>list name:</p>
            <input onChange={(e) => setEmail(e.target.value)} required name="user" id="user"
                   placeholder="mylist" className='text-black border p-3 rounded'/>
          </label>
          <label htmlFor="password" className='flex gap-3 items-center'>
            <p>Password</p>
            <input onChange={(e) => setPassword(e.target.value)} required type="password" name="password"
                   id="password" placeholder="password" className='text-black border p-3 rounded'/>
          </label>
        </div>
        <button type="submit" className='green-gradient-bg rounded p-2 text-white font-bold'>Sign up</button>
      </form>
    </div>);
}
