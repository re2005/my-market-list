import React, {useEffect, useState} from 'react';
import {useAuthContext} from "@/context/AppContext";
import {useRouter} from "next/navigation";

interface FriendRequestProps {
  hasFriendQuery: string[];
}

const FriendRequest: React.FC<FriendRequestProps> = ({ hasFriendQuery }) => {
  const {addFriend}: any = useAuthContext()
  const router = useRouter();

  const [isAccepted, setIsAccepted] = useState(false);

  function addFriendHandler() {
    addFriend(hasFriendQuery[0], hasFriendQuery[1]);
    setIsAccepted(true);
    router.push('/');
  }

  return (
    <>
      {!isAccepted && hasFriendQuery.length === 2 &&
        <div className='flex flex-col gap-4 bg-emerald-400 w-full text-white rounded-2xl p-4'>
          <p className='text-center'>
            Would you like
            <br/><strong>{hasFriendQuery[1]}</strong><br/>
            to join this list
          </p>
          <div className='flex items-center justify-center gap-6'>
            <button onClick={() => router.push('/')}
                    className='rounded p-2 font-bold flex justify-center border border-gray-300 text-white'>
              Ignore
            </button>
            <button onClick={() => addFriendHandler()}
                    className='rounded p-2 font-bold flex justify-center bg-white text-emerald-500 px-6'>
              Accept
            </button>
          </div>
        </div>
      }
    </>
  );
};

export default FriendRequest;
