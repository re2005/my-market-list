'use client'

import UiList from '@/components/UiList'
import UiItemInput from "@/components/UiItemInput";
import {useAuthContext} from "@/context/AppContext";
import UiLogin from "@/components/UiLogin";
import UiSignUp from "@/components/UiSignUp";
import {signOutUser} from "@/firebase/auth";
import Image from "next/image";

export default function Home() {
  const {user, loading}: any = useAuthContext();

  return (
    <>
      {loading && <div className='absolute w-full flex top-40'>
        <Image src='/loading.svg' alt='loading' width={90} height={90} className='mx-auto'/>
      </div>
      }
      <section
        className={`flex justify-center mt-10 lg:mt-14 gap-4 lg:gap-10 transition ${loading ? 'opacity-0' : 'opacity-100'}`}>
        {user ? <div className='flex flex-col gap-10 w-full px-5 items-center'>
        <UiItemInput/>
        <UiList/>

        <div className='flex gap-3 items-center justify-center'>
          <p>
            {user.email.replace(/@.*/, '')}
          </p>
          <button onClick={() => signOutUser()} className='text-xs bg-red-400 rounded px-2 py-1 text-white font-bold'>Logout
          </button>
        </div>
      </div> : <UiLogin/>}
    </section>
    </>
  )
}
