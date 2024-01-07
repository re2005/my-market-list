'use client'

import useViewportSize from "@/hooks/useScreen";
import Image from "next/image";

export default function UiHeader() {
  const { size } = useViewportSize();

  return (<header className='green-gradient-bg flex items-center gap-4 justify-center py-5 shadow-2xl'>
    <Image src='/my-market-list-logo.svg' alt='My Grocery List' className='w-[30px] lg:w-[60px]' width={60} height={60}/>
    <h1 className={`text-2xl lg:text-4xl text-white font-bold`}>
      My Grocery List
    </h1>
  </header>);
}
