'use client'

import UiList from '@/components/UiList'
import UiItemInput from "@/components/UiItemInput";
import {useAuthContext} from "@/context/AppContext";
import UiLogin from "@/components/UiLogin";
import {signOutUser} from "@/firebase/auth";
import Image from "next/image";
import {useSearchParams} from "next/navigation";
import UiFriendRequest from "@/components/UiFriendRequest";
import React from "react";
import UiQrCode from "@/components/UiQrCode";
import Link from "next/link";

export default function Home() {
  const {user, loading, listFriends, setCurrentUid, currentUid}: any = useAuthContext();
  const searchParams = useSearchParams();

  const search = searchParams.get('friend');
  const urlQuery = (search as string)?.replace(/\?friend=/, '').split(';') ?? [];
  const hasFriendQuery = urlQuery.length === 2 && isValidEmail(urlQuery[1]) ? urlQuery : [];

  function isValidEmail(email: string) {
    const emailRegex = /^[\w%+.-]+@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return emailRegex.test(email);
  }

  function handleListChange(event: any) {
    setCurrentUid(event.target.value);
  }

  return (
    <>
      {loading && <div className='absolute w-full flex top-40'>
        <Image src='/loading.svg' alt='loading' width={90} height={90} className='mx-auto'/>
      </div>
      }
      <section
        className={`flex justify-center mt-4 lg:mt-4 gap-4 lg:gap-10 transition ${loading ? 'opacity-0' : 'opacity-100'}`}>
        {user ? <div className='flex flex-col gap-10 w-full px-5 items-center'>
          <UiFriendRequest hasFriendQuery={hasFriendQuery}/>
          <UiItemInput/>
          <UiList/>

          <div className='flex flex-col gap-3 items-center justify-center'>
            <div className='flex items-center gap-4'>
              <p>
                {user.email.replace(/@.*/, '')}
              </p>
              <button onClick={() => signOutUser()}
                      className='text-xs bg-red-400 rounded px-2 py-1 text-white font-bold'>
                Logout
              </button>
            </div>
            <div className='flex items-center gap-2'>
              Your lists
              <select onChange={(event) => handleListChange(event)}
                      value={currentUid}
                      className='bg-white border border-gray-300 rounded px-2 py-1 text-xs'>
                <option value={user.uid}>My list</option>
                {listFriends && Object.keys(listFriends).map((friend: any) => (
                  <option key={friend} value={friend}>{listFriends[friend]}</option>
                ))}
              </select>
            </div>
          </div>

          <UiQrCode user={user}/>

        </div> : <div><UiLogin/> <hr className='mt-4 mb-6'/> <Link href='/signup' className='border rounded p-2 font-bold flex justify-center'>Sign Up</Link></div>}
    </section>
    </>
  )
}
