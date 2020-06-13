import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'

const config = {
	apiKey: "AIzaSyA_ejfvJKN5sqo6kLcvW8utvndouYCkVYM",
    authDomain: "open-ac634.firebaseapp.com",
    databaseURL: "https://open-ac634.firebaseio.com",
    projectId: "open-ac634",
    storageBucket: "open-ac634.appspot.com",
    messagingSenderId: "595539199345",
    appId: "1:595539199345:web:cb28a0466af8a9b9a9a2d0",
    measurementId: "G-SHP21RNECK"
}

class Firebase {
	constructor() {
		app.initializeApp(config)
		this.auth = app.auth()
		this.db = app.firestore()
	}

	login(email, password) {
		return this.auth.signInWithEmailAndPassword(email, password)
	}

	logout() {
		return this.auth.signOut()
	}

	async register(name, email, password) {
		await this.auth.createUserWithEmailAndPassword(email, password)
		return this.auth.currentUser.updateProfile({
			displayName: name
		})
	}

	addGithub(github) {
		if(!this.auth.currentUser) {
			return alert('Not authorized')
		}

		return this.db.doc(`users/${this.auth.currentUser.uid}`).set({
			github
		})
	}

	isInitialized() {
		return new Promise(resolve => {
			this.auth.onAuthStateChanged(resolve)
		})
	}

	getCurrentUsername() {
		return this.auth.currentUser && this.auth.currentUser.displayName
	}

	async getCurrentUserGithub() {
		const github = await this.db.doc(`users/${this.auth.currentUser.uid}`).get()
		return github.get('github')
	}
}

export default new Firebase()