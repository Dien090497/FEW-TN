import firebase from 'firebase/app';
import 'firebase/messaging';
import {uploadTokenFirebase} from "./network/AuthService";
import DataLocal from "./functions/dataLocal";

const firebaseConfig = {
    apiKey: "AIzaSyDjSKFRfwAXtY2Xqwmh9n8u5Nt3QNCRQbg",
    authDomain: "few-tn.firebaseapp.com",
    projectId: "few-tn",
    storageBucket: "few-tn.appspot.com",
    messagingSenderId: "543894763023",
    appId: "1:543894763023:web:2ee9daa02adb977834957a",
    measurementId: "${config.measurementId}"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

export const getToken = (isToken,setTokenFound) => {
    if (isToken) return
    return messaging.getToken({vapidKey: 'BASrzyWyoZsslGq3phz5z3KpkCpU8WnQy0rNrehmvOa7PEpiMCyY0owvUTxNUuevoWNWdyXGmo0hR88WAK_3qWE'}).then((currentToken) => {
        if (currentToken) {
            uploadTokenFirebase({
                token: currentToken,
                id_admin: DataLocal.id_admin
            },{
                success: res=>{
                    console.log('current token for client: ', currentToken);
                    setTokenFound(true);
                }
            })
        } else {
            console.log('No registration token available. Request permission to generate one.');
            setTokenFound(false);
            // shows on the UI that permission is required
        }
    }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // catch error while creating client token
    });
}

export const onMessageListener = () =>
    new Promise((resolve) => {
        messaging.onMessage((payload) => {
            resolve(payload);
        });
    });
