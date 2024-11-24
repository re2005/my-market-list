import { firebaseAuth } from '$lib/firebase';
import {
	signInWithEmailAndPassword,
	signOut,
	createUserWithEmailAndPassword,
	sendPasswordResetEmail
} from 'firebase/auth';

// Sign-in function
export async function login(email: string, password: string) {
	try {
		return signInWithEmailAndPassword(firebaseAuth, email, password);
	} catch (error) {
		console.error('Login error:', error);
		throw error;
	}
}

export function signUp(email: string, password: string) {
	return createUserWithEmailAndPassword(firebaseAuth, email, password);
}
export function forgotPassword(email: string) {
	return sendPasswordResetEmail(firebaseAuth, email);
}

// Sign-out function
export async function logout() {
	await signOut(firebaseAuth);
}
