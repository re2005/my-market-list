'use client'

import React, {useEffect, useState} from 'react';
import {useAuthContext} from "@/context/AppContext";

const SuggestList = ({suggestsList, item, onAddItem}: any) => {
  const [suggests, setSuggests]: any = useState([]);
  const {removeItem}: any = useAuthContext()

  useEffect(() => {
    if (!item || item.length < 2) {
      setSuggests([]);
      return;
    }

    const query = item.toLowerCase();

    const filteredSuggests = Object.keys(suggestsList)
      .filter((suggestKey) => suggestKey.toLowerCase().indexOf(query) !== -1)
      .sort((a, b) => suggestsList[b].amount - suggestsList[a].amount)
      .map((suggestKey) => suggestsList[suggestKey].value);

    setSuggests(filteredSuggests);
  }, [item, suggestsList]);

  const addItem = (suggest: string) => {
    onAddItem(suggest);
  };

  return (
    <div className='absolute flex justify-center w-full top-14'>
      {suggests.length !== 0 && (
        <ul className="w-full  md:w-[430px] h-[184px] overflow-scroll flex flex-col gap-2 shadow border rounded-2xl px-2 py-1 bg-gray-50 left-10 right-10 top-14">
          {suggests.map((suggest: string, index: number) => (
            <li key={index}
                className='flex items-center gap-5 rounded-xl justify-between hover:bg-green-100 px-3 py-1'>
              <button onClick={() => addItem(suggest)} className='flex flex-1 pl-1'>{suggest}</button>
              <button onClick={() => removeItem(suggest, 'list_suggest')}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-300" fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SuggestList;
