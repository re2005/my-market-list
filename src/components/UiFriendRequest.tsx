import React, {useState} from 'react';
import {useAuthContext} from "@/context/AppContext";

interface FriendRequestProps {
  hasFriendQuery: string[];
}

const FriendRequest: React.FC<FriendRequestProps> = ({ hasFriendQuery }) => {
  const {addFriend}: any = useAuthContext()

  const [isAccepted, setIsAccepted] = useState(false);

  function addFriendHandler() {
    addFriend(hasFriendQuery[0]);
    setIsAccepted(true);
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
          <button onClick={() => addFriendHandler()} className='rounded p-2 font-bold flex justify-center bg-white text-emerald-500'>
            Accept
          </button>
        </div>
      }
    </>
  );
};

export default FriendRequest;
