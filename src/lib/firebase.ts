import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth, type Auth } from 'firebase/auth';

const config = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const firebaseApp = initializeApp(config);
const firebaseAuth = getAuth(firebaseApp);
const firebaseDatabase = getDatabase(firebaseApp);

// export the firebase app
export { firebaseApp, firebaseAuth, firebaseDatabase };
