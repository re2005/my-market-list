'use client'

import {useAuthContext} from "@/context/AppContext";
import {FormEvent, useState} from "react";
import SuggestList from "@/components/UiSuggests";

export default function UiItemInput() {
  const {addItem, listSuggest, loading}: any = useAuthContext();
  const [inputValue, setInputValue] = useState('');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onAddItem(inputValue);
  }

  function onAddItem(item: string) {
    addItem(item);
    setInputValue('');
  }

  return (
    <div className={`w-full ${loading ? 'pointer-events-none' : ''}`}>
      <form onSubmit={handleSubmit} className="flex gap-3 justify-center">
        <label>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            required
            name="item"
            placeholder="Strawberries"
            className="border rounded-2xl px-3 py-2 text-black shadow lg:w-72"
          />
        </label>
        <button
          type="submit"
          className="green-gradient-bg text-white text-lg px-3 rounded-2xl border border-gray-200 shadow"
        >
          Add
        </button>
      </form>
      <SuggestList
        suggestsList={listSuggest}
        item={inputValue}
        onAddItem={onAddItem}
      />
    </div>
  );
}
