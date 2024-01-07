'use client'

import UiList from '@/components/UiList'
import UiItemInput from "@/components/UiItemInput";
import {useAuthContext} from "@/context/AppContext";
import UiSignIn from "@/components/UiSignIn";
import {signOutUser} from "@/firebase/auth";

export default function Home() {
  const {user}: any = useAuthContext();

  return (
    <section className="flex justify-center mt-10 lg:mt-20 gap-4 lg:gap-10">
      {user ? <div className='flex flex-col gap-10'>
      <UiItemInput/>
        <UiList/>
        <div className='flex gap-3 items-center justify-center'>
          <p>
            {user.email.replace(/@.*/, '')}
          </p>
          <button onClick={() => signOutUser()} className='text-xs bg-red-400 rounded px-2 py-1 text-white font-bold'>Logout
          </button>
        </div>
      </div> : <UiSignIn/>}
    </section>
  )
}
