import { firebaseDB } from 'utils/firebase';
import {
	setDoc,
	getDoc,
	doc,
	updateDoc,
	deleteField,
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
	// const res = await userRef.update(userData);

	return res;
};

const deleteUserData = async (userUid, template) => {
	if (!userUid) return null;
	if (!template) return null;

	const userRef = doc(firebaseDB, FIREBASE_COLLECTIONS_NAME.users, userUid);
	const res = await updateDoc(userRef, {
		[template]: deleteField(),
	});

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
	deleteUserData,
};

export default USERS_API;
