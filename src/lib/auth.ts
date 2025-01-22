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
export async function forgotPassword(email: string) {
	return sendPasswordResetEmail(firebaseAuth, email);
}

// Sign-out function
export async function logout() {
	await signOut(firebaseAuth);
}

export function isValidEmail(email: string) {
	const emailRegex = /^[\w%+.-]+@([\w-]+\.)+[a-zA-Z]{2,7}$/;
	return emailRegex.test(email);
}
