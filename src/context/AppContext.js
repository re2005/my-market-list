'use client'

import {createContext, useContext, useEffect, useState} from 'react';

import {getAuth, onAuthStateChanged} from 'firebase/auth';
import firebase_app from '@/firebase/config';
import getData from "@/firebase/getData";
import {child, onValue, push, remove, set} from "firebase/database";
import {useSearchParams} from "next/navigation";

const auth = getAuth(firebase_app);

export const AppContext = createContext({});

export const useAuthContext = () => useContext(AppContext);

export const AuthContextProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingList, setLoadingList] = useState(true);
  const [list, setList] = useState({});
  const [listSuggest, setListSuggest] = useState({});

  function getTotal(suggest) {
    let current;
    if (!listSuggest[suggest] || !listSuggest[suggest].amount) {
      current = 1;
    } else {
      current = listSuggest[suggest].amount + 1;
    }
    return current;
  }

  async function addItem(item) {
    const docRef = getData(user.uid);
    try {
      const list = child(docRef, 'list');
      const newItem = push(list);
      await set(newItem, item);

      const listSuggestion = child(docRef, 'list_suggest'+ '/' + item);
      await set(listSuggestion, {
        value: item,
        amount: getTotal(item)
      });
    } catch (error) {
      console.log(error);
    } finally {
      console.log('Item added', item);
    }
  }

  async function addFriend(item) {
    const docRef = getData(user.uid + '/friends');
    try {
      const list = child(docRef, item);
      await set(list, true);
    } catch (error) {
      console.log(error);
    } finally {
      console.log('Friend added', item);
    }
  }

  async function removeItem(item, fromList) {
    const docRef = getData(user.uid);
    try {
      const list = child(docRef, fromList + '/' + item);
      await remove(list);
    } catch (error) {
      console.log(error);
    } finally {
      console.log('Item removed', item);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        const docRef = getData(user.uid);
        onValue(docRef, function (snapshot) {
          const data = snapshot.val();
          if (data) {
            const { list, list_suggest, friends } = data;
            setList(list);
            setListSuggest(list_suggest);
          }
          setLoadingList(false);
        });

      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AppContext.Provider value={{user, loadingList, loading, list, listSuggest, addItem, removeItem, addFriend}}>
      {children}
    </AppContext.Provider>
  );
};
