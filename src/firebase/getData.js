import {getDatabase, ref} from "firebase/database";
import firebase_app from "./config";

export default function getData(uuid) {
    const db = getDatabase(firebase_app);
    return ref(db, uuid);
}
