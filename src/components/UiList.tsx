'use client'

import {useAuthContext} from "@/context/AppContext";
import React from "react";
import Image from "next/image";
import CloseIcon from "@/assets/close.svg";

export default function UiList() {
  const {loadingList, list, removeItem}: any = useAuthContext()
  return (
    <div className="w-full md:w-[420px]">
      {loadingList && <Image src='/loading.svg' alt='loading' width={90} height={90} className='mx-auto'/>}
      <div className="">
        <ul className='grid gap-3'>
          {list ? Object.keys(list).reverse().map((item: any) => {
            return (
              <li key={item} className='flex items-center gap-5 border border pl-4 p-2 rounded-xl justify-between'>
                <p>{list[item]}</p>
                <button onClick={() => removeItem(item, 'list')}>
                  <CloseIcon className='h-6 w-6 text-red-300'/>
                </button>
              </li>
            )
          }) : <p className='text-center'>Your list is empty.</p>}
        </ul>
      </div>
    </div>
  );
}
