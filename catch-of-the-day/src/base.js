import Rebase from 're-base';
import firebase from 'firebase';

const config = {
	apiKey: 'AIzaSyBg_IU7oyPfAY-0Bswlttzr_QGq5lzD-ZU',
	authDomain: 'catch-of-the-day-33bb8.firebaseapp.com',
	databaseURL: 'https://catch-of-the-day-33bb8.firebaseio.com',
	storageBucket: '',
	messagingSenderId: '673992855706'
};

const firebaseApp = firebase.initializeApp(config);
const base = Rebase.createClass(firebaseApp.database());

//this is a named export
export { firebaseApp };

//this is a default export
export default base;
