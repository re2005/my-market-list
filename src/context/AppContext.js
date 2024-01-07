'use client'

import {createContext, useContext, useEffect, useState} from 'react';

import {getAuth, onAuthStateChanged} from 'firebase/auth';
import firebase_app from '@/firebase/config';
import getData from "@/firebase/getData";
import {child, onValue, push, remove, set} from "firebase/database";

const auth = getAuth(firebase_app);

export const AppContext = createContext({});

export const useAuthContext = () => useContext(AppContext);

export const AuthContextProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingList, setLoadingList] = useState(true);
  const [list, setList] = useState(null);
  const [listSuggest, setListSuggest] = useState(null);

  async function addItem(item) {
    const docRef = getData(user.uid);
    try {
      const list = child(docRef, 'list');
      const newItem = push(list);
      await set(newItem, item);
    } catch (error) {
      console.log(error);
    } finally {
      console.log('Item added', item);
    }
  }

  async function removeItem(item) {
    const docRef = getData(user.uid);
    try {
      const list = child(docRef, 'list' + '/' + item);
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
          const {list, list_suggest} = snapshot.val();
          setList(list);
          setListSuggest(list_suggest);
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
    <AppContext.Provider value={{user, loadingList, loading, list, listSuggest, addItem, removeItem}}>
      {children}
    </AppContext.Provider>
  );
};
