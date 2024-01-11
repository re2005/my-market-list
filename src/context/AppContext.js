'use client'

import {createContext, useContext, useEffect, useState} from 'react';

import {getAuth, onAuthStateChanged} from 'firebase/auth';
import firebase_app from '@/firebase/config';
import getData from "@/firebase/getData";
import {child, onValue, push, remove, set, get} from "firebase/database";

const auth = getAuth(firebase_app);

export const AppContext = createContext({});

export const useAuthContext = () => useContext(AppContext);

export const AuthContextProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingList, setLoadingList] = useState(true);
  const [list, setList] = useState(null);
  const [listSuggest, setListSuggest] = useState({});
  const [listFriends, setListFriends] = useState(null);
  const [currentUid, setCurrentUidState] = useState(null);

  function setCurrentUid(uid) {
    localStorage.setItem('CURRENT_UID', uid);
    setCurrentUidState(uid);
  }

  function getTotalSuggestAmount(suggest) {
    let current;
    if (!listSuggest[suggest] || !listSuggest[suggest].amount) {
      current = 1;
    } else {
      current = listSuggest[suggest].amount + 1;
    }
    return current;
  }

  async function addItem(item) {
    const docRef = getData(currentUid);
    try {
      const list = child(docRef, 'list');
      const newItem = push(list);
      await set(newItem, item);

      const listSuggestion = child(docRef, 'list_suggest'+ '/' + item);
      await set(listSuggestion, {
        value: item,
        amount: getTotalSuggestAmount(item)
      });
    } catch (error) {
      console.log(error);
    } finally {
      console.log('Item added', item);
    }
  }

  async function addFriend(uid, email) {
    const docRef = getData(currentUid + '/friends');
    try {
      const list = child(docRef, uid);
      await set(list, email);
    } catch (error) {
      console.log(error);
    } finally {
      console.log('Friend added', uid);
    }
  }

  async function removeItem(item, fromList) {
    const docRef = getData(currentUid);
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
    setLoadingList(true);
    if (!currentUid) {
      return;
    }

    const docRef = getData(currentUid);

    // Unsubscribe from the previous listener
    const previousListener = onValue(docRef, function (snapshot) {
      const data = snapshot.val();
      if (data) {
        const { list, list_suggest } = data;
        setList(list);
        setListSuggest(list_suggest);
      }
      setLoadingList(false);
    });

    // Clean up the listener when the component unmounts or currentUid changes
    return () => previousListener();
  }, [currentUid, user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const storedUid = localStorage.getItem('CURRENT_UID');
        await setCurrentUidState(storedUid || user.uid);

        const docRef = getData(user.uid + '/friends');
        const snapshot = await get(docRef);
        setListFriends(snapshot.val());

      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AppContext.Provider value={{
      user,
      listFriends,
      loadingList,
      loading,
      list,
      listSuggest,
      addItem,
      removeItem,
      addFriend,
      setCurrentUid,
      currentUid
    }}>
      {children}
    </AppContext.Provider>
  );
};
