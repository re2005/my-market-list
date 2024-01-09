'use client'

import UiList from '@/components/UiList'
import UiItemInput from "@/components/UiItemInput";
import {useAuthContext} from "@/context/AppContext";
import UiLogin from "@/components/UiLogin";
import {signOutUser} from "@/firebase/auth";
import Image from "next/image";
import {useSearchParams} from "next/navigation";
import UiFriendRequest from "@/components/UiFriendRequest";
import React, {useState} from "react";
import CloseIcon from "@/assets/close.svg";

export default function Home() {
  const {user, loading, addFriend}: any = useAuthContext();
  const [isQrCodeVisible, setIsQrCodeVisible] = useState(false);

  console.log(user);

  const searchParams = useSearchParams();
  const search = searchParams.get('friend')
  const hasFriendQuery = search?.replace(/\?friend=/, '').split(';') ?? [];
  const qrCodeElement = document.getElementById('qr-code') as any;

  function closeQrCode() {
    qrCodeElement.innerHTML = '';
    setIsQrCodeVisible(false);
  }

  function shareQrCode() {
    const options = {
      width: 200,
      height: 200,
      type: 'svg',
      data: `https://mymarketlist.vercel.app?friend=${user.uid};${user.email}`,
      image: 'https://mymarketlist.vercel.app/my-market-list-logo.svg',
      dotsOptions: {
        type: 'rounded'
      },
      backgroundOptions: {
        color: '#ffffff',
      },
      imageOptions: {
        crossOrigin: 'anonymous',
        margin: 2,
        imageSize: 0.3,
      }
    }

    import('qr-code-styling').then(({default: QRCodeStyling}) => {
      const qrCode = new QRCodeStyling(options as any);

      qrCodeElement.innerHTML = '';
      qrCode.append(qrCodeElement);
      setIsQrCodeVisible(true);
    });
  }

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

          <UiFriendRequest hasFriendQuery={hasFriendQuery}/>

        <div className='flex gap-3 items-center justify-center'>
          <p>
            {user.email.replace(/@.*/, '')}
          </p>
          <button onClick={() => signOutUser()} className='text-xs bg-red-400 rounded px-2 py-1 text-white font-bold'>Logout
          </button>
        </div>
          <div className='flex flex-col gap-4' id='qr-share'>
            <button className='text-xs border px-2 p-1 rounded-2xl flex items-center gap-3 justify-center hover:bg-emerald-400'
                    onClick={() => shareQrCode()}>
              Request access
            </button>
            <div id='qr-code'/>
            {isQrCodeVisible &&
              <button onClick={() => closeQrCode()}><CloseIcon className='h-5 w-5 text-gray-500'/>
              </button>}
          </div>
      </div> : <UiLogin/>}
    </section>
    </>
  )
}
