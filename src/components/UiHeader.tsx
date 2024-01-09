'use client'

import Image from "next/image";

export default function UiHeader() {

  return (<header className='green-gradient-bg flex items-center gap-4 justify-center py-5 shadow-2xl'>
    <Image src='/my-market-list-logo.svg' alt='My Market List' className='w-[30px] lg:w-[60px]' width={60} height={60}/>
    <h1 className={`text-2xl lg:text-4xl text-white font-bold`}>
      My Market List
    </h1>
  </header>);
}
