import { firebaseDB } from 'utils/firebase';
import {
	setDoc,
	getDoc,
	doc,
	updateDoc,
	deleteDoc,
} from 'firebase/firestore';
import { FIREBASE_COLLECTIONS_NAME } from 'utils/constant';

const addNewUser = async (user, userUid) => {
	if (!user) return null;

	const res = await setDoc(doc(firebaseDB, FIREBASE_COLLECTIONS_NAME.users, userUid), user);

	return res;
};

const updateUserData = async (userUid, userData) => {
	if (!userUid) return null;
	if (!userData) return null;

	const userRef = doc(firebaseDB, FIREBASE_COLLECTIONS_NAME.users, userUid);
	const res = await updateDoc(userRef, userData);

	return res;
};

const getUser = async id => {
	if (!id) return null;

	const snap = await getDoc(doc(firebaseDB, FIREBASE_COLLECTIONS_NAME.users, id));

	if (snap.exists()) {
		return snap.data();
	}

	return null;
};

const USERS_API = {
	addNewUser,
	updateUserData,
	getUser,
};

export default USERS_API;
