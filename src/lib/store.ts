import { get as storeGet, writable } from 'svelte/store';
import { get, onValue, ref, child, push, set, remove } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseDatabase, firebaseAuth } from '$lib/firebase';

import type { User } from 'firebase/auth';

export const user = writable<User | null>(null);
export const loading = writable(true);
export const loadingList = writable(true);
export const list = writable([]);
export const listSuggest = writable<{ [key: string]: { amount: number } }>({});
export const listFriends = writable(null);
export const currentUid = writable<string | null>(null);

const getTotalSuggestAmount = (suggest: string) => {
	let current;
	if (!storeGet(listSuggest)[suggest] || !storeGet(listSuggest)[suggest].amount) {
		current = 1;
	} else {
		current = storeGet(listSuggest)[suggest].amount + 1;
	}
	return current;
};

// Functions to interact with Firebase
export const addItem = async (item: string) => {
	const uid = storeGet(currentUid);
	if (!uid) return;
	const docRef = getData(uid);
	try {
		const list = child(docRef, 'list');
		const newItem = push(list);
		await set(newItem, item);

		const matchSuggestion = child(docRef, 'list_suggest' + '/' + item);
		await set(matchSuggestion, {
			value: item,
			amount: getTotalSuggestAmount(item)
		});
	} catch (error) {
		console.log(error);
	} finally {
		console.log('Item added', item);
	}
};

export const removeItem = async (item: any, fromList: any) => {
	const uid = storeGet(currentUid);
	if (!uid) return;
	const docRef = getData(uid);
	try {
		const listRef = child(docRef, `${fromList}/${item}`);
		await remove(listRef);
	} catch (error) {
		console.error('Error removing item:', error);
	}
};

export const addFriend = async (uid: string, email: string) => {
	// const docRef = child(firebaseDatabase, `users/${$currentUid}/friends`);
	// try {
	// 	const listRef = child(docRef, uid);
	// 	await set(listRef, email);
	// } catch (error) {
	// 	console.error('Error adding friend:', error);
	// }
};

function getData(uuid: string) {
	return ref(firebaseDatabase, uuid);
}

// Listen to authentication changes
onAuthStateChanged(firebaseAuth, async (firebaseUser) => {
	loading.set(true);
	if (firebaseUser) {
		user.set(firebaseUser);
		currentUid.set(firebaseUser.uid);
		const friendsRef = getData(`${firebaseUser.uid}/friends`);
		const snapshot = await get(friendsRef);
		listFriends.set(snapshot.val());
	} else {
		user.set(null);
	}
	loading.set(false);
});

// Subscribe to changes in the current user's list
currentUid.subscribe((uid) => {
	if (!uid) return;

	loadingList.set(true);
	const docRef = getData(uid);
	const unsubscribe = onValue(docRef, (snapshot) => {
		const data = snapshot.val();
		if (data) {
			list.set(data.list);
			listSuggest.set(data.list_suggest);
		}
		loadingList.set(false);
	});

	return () => unsubscribe();
});
