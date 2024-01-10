'use client'

import React, {useEffect} from "react";
import UiSignUp from "@/components/UiSignUp";
import {useAuthContext} from "@/context/AppContext";
import {useRouter} from 'next/navigation';

export default function Signup() {
  const {user}: any = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [router, user]);

  return (
    <section
      className='flex justify-center mt-4 lg:mt-4 gap-4 lg:gap-10'>
      <UiSignUp/>
    </section>
  )
}
