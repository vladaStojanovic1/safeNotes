import * as actions from '../types';

/*********  Sign Up action */
export const signUp = data => async (dispatch, getState, { getFirebase, getFirestore }) => {

    const firebase = getFirebase();
    const firestore = getFirestore();

    dispatch({ type: actions.AUTH_START });
    console.log(firebase);

    try {
        const res = await firebase
            .auth()
            .createUserWithEmailAndPassword(data.email, data.password)

        /*** Send the verification email */
        const user = firebase.auth().currentUser;
        await user.sendEmailVerification();

        await firestore
            .collection('users')
            .doc(res.user.uid)
            .set({
                firstName: data.firstName,
                lastName: data.lastName,
                initials: `${data.firstName[0]}${data.lastName[0]}`
            })
        dispatch({ type: actions.AUTH_SUCCESS });

    } catch (error) {
        dispatch({ type: actions.AUTH_FAIL, payload: error.message })
    }
    dispatch({ type: actions.AUTH_END })
}


/*********** Logout Action */
export const logout = () => async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    try {
        await firebase.auth().signOut();
    } catch (error) {
        console.log(error.message);
    }
    dispatch({ type: actions.AUTH_END })
}


/******** Login Action */
export const login = (data) => async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    dispatch({ type: actions.AUTH_START })
    try {
        await firebase
            .auth()
            .signInWithEmailAndPassword(data.email, data.password)

        dispatch({ type: actions.AUTH_SUCCESS })
    } catch (error) {
        dispatch({ type: actions.AUTH_FAIL, payload: error.message })
    }
}


/******** Verify Email Action */
export const verifyEmail = () => async (dispatch, getState, { getFirebase }) => {

    const firebase = getFirebase();
    dispatch({ type: actions.VERIFY_START });
    try {
        const user = firebase.auth().currentUser;
        await user.sendEmailVerification();
        dispatch({ type: actions.VERIFY_SUCCESS });
    } catch (error) {
        dispatch({ type: actions.VERIFY_FAIL, payload: error.message });
    }
}


/********* Edit Profile Action */
export const editProfile = (data, image) => async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const userEmail = getState().firebase.auth.email;
    const user = firebase.auth().currentUser;
    const userId = getState().firebase.auth.uid;

    dispatch({ type: actions.PROFILE_START })
    try {

        if (image) {
            const storageRef = firebase.storage().ref();
            const storageChild = storageRef.child(image.name);
            const postCover = await storageChild.put(image);
            const downloadURL = await storageChild.getDownloadURL();
            const fileRef = postCover.ref.location.path;

            await firestore
                .collection('users')
                .doc(userId)
                .set({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    cover: downloadURL,
                    fileRef: fileRef,
                    initials: `${data.firstName[0]}${data.lastName[0]}`
                })
        } else {
            await firestore
                .collection('users')
                .doc(userId)
                .set({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    initials: `${data.firstName[0]}${data.lastName[0]}`
                })
        }
        // Update email
        if (data.email !== userEmail) {

            await user.updateEmail(data.email)
        }


        // Update Password
        if (data.password.length > 0) {
            console.log('update pass');
            await user.updatePassword(data.password)
        }

        dispatch({ type: actions.PROFILE_SUCCESS })
    } catch (error) {
        dispatch({ type: actions.PROFILE_FAIL, payload: error.message })
    }
}
