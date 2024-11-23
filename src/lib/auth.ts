import { firebaseAuth } from '$lib/firebase';
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth';

// Sign-in function
export async function login(email: string, password: string) {
	try {
		const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
	} catch (error) {
		console.error('Login error:', error);
		throw error;
	}
}

export function signUp(email: string, password: string) {
	return createUserWithEmailAndPassword(firebaseAuth, email, password);
}

// Sign-out function
export async function logout() {
	await signOut(firebaseAuth);
}
