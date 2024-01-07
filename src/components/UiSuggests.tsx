'use client'

import React, {useEffect, useState} from 'react';

const SuggestList = ({suggestsList, item, onAddItem}: any) => {
  const [suggests, setSuggests]: any = useState([]);

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
            <li key={index} onClick={() => addItem(suggest)} className='flex items-center gap-5 rounded-xl justify-between hover:bg-green-100 px-3 py-1 cursor-pointer'>
              {suggest}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SuggestList;
