import { firebaseAuth } from '$lib/firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

// Sign-in function
export async function login(email: string, password: string) {
	try {
		const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
	} catch (error) {
		console.error('Login error:', error);
		throw error;
	}
}

// Sign-out function
export async function logout() {
	await signOut(firebaseAuth);
}
