import { get as storeGet, writable } from 'svelte/store';
import { get, onValue, ref, child, push, set, remove } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseDatabase, firebaseAuth } from '$lib/firebase';

import type { User } from 'firebase/auth';

export const user = writable<User | null>(null);
export const loading = writable(true);
export const loadingList = writable(true);
export const list = writable([]);
export const listSuggest = writable<Record<string, { value: string; amount: number }>>({});
export const listFriends = writable(null);
export const listInvites = writable(null);
export const currentUid = writable<string | null>(null);

function getData(uuid: string) {
	return ref(firebaseDatabase, uuid);
}

const getTotalSuggestAmount = (suggest: string) => {
	let current;
	if (
		!storeGet(listSuggest) ||
		!storeGet(listSuggest)[suggest] ||
		!storeGet(listSuggest)[suggest].amount
	) {
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

function isValidFirebaseUid(uid: string) {
	const firebaseUidRegex = /^[a-zA-Z0-9]{28}$/;
	return firebaseUidRegex.test(uid);
}

export const removeFriend = async (uid: string) => {
	const ownerUid = storeGet(user)?.uid;
	if (!ownerUid) return;
	if (!isValidFirebaseUid(uid)) {
		console.warn('Invalid UUID');
		return;
	}
	try {
		const docRef = getData(`${ownerUid}/friends`);
		const listRef = child(docRef, uid);
		await remove(listRef);
	} catch (error) {
		console.warn('Error removing friend:', error);
	}
};

export const addFriend = async (uid: string, email: string) => {
	if (!isValidFirebaseUid(uid)) {
		console.warn('Invalid UUID');
		return;
	}
	const ownerUser = storeGet(user);
	if (!ownerUser) return;
	try {
		// Add to the owner's friends list
		const docRef = getData(`${ownerUser.uid}/friends`);
		const listRef = child(docRef, uid);
		await set(listRef, email);

		// Add to general invites
		const sharedLists = getData(`sharedLists/${uid}`);
		const sharedListsRef = child(sharedLists, ownerUser.uid);
		await set(sharedListsRef, ownerUser.email);
	} catch (error) {
		console.warn('Error adding friend:', error);
	}
};

export function confirmFriend(friend: { [key: string]: string }) {
	console.log('confirmFriend', friend);
	const ownerUser = storeGet(user);
	if (!ownerUser || !friend) return;

	// Add to the owner's friends list
	const docRef = getData(`${ownerUser.uid}/friends`);
	const listRef = child(docRef, Object.keys(friend)[0]);
	set(listRef, Object.values(friend)[0]);

	// Remove from general invites
	const sharedLists = getData(`sharedLists/${ownerUser.uid}`);
	const sharedListsRef = child(sharedLists, Object.keys(friend)[0]);
	remove(sharedListsRef);
}

// SUbscribe into sharedLists
function listenToSharedLists() {
	const sharedLists = getData('sharedLists');
	const unsubscribe = onValue(sharedLists, (snapshot) => {
		listInvites.set(snapshot.val());
	});
	return unsubscribe;
}

function listenToFriendsList(uid: string) {
	const friendsRef = getData(`${uid}/friends`);
	const unsubscribe = onValue(friendsRef, (snapshot) => {
		listFriends.set(snapshot.val());
	});
	return unsubscribe;
}

// Listen to authentication changes
onAuthStateChanged(firebaseAuth, async (firebaseUser) => {
	loading.set(true);
	if (firebaseUser) {
		user.set(firebaseUser);
		currentUid.set(firebaseUser.uid);

		// Get and Friends list
		listenToFriendsList(firebaseUser.uid);

		// Get shared lists
		listenToSharedLists();
	} else {
		user.set(null);
	}
	loading.set(false);
});

// Subscribe to changes in the current user's list
let unsubscribe: (() => void) | null = null;

currentUid.subscribe((uid) => {
	if (unsubscribe) {
		unsubscribe();
		unsubscribe = null;
	}

	if (!uid) return;

	loadingList.set(true);
	const docRef = getData(uid);
	unsubscribe = onValue(docRef, (snapshot) => {
		const data = snapshot.val();
		if (data) {
			list.set(data.list);
			listSuggest.set(data.list_suggest);
		}
		loadingList.set(false);
	});
});
