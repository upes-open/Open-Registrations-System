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
		var user = this.auth.currentUser;
			user.sendEmailVerification().then(function() {
			// Email sent.
			}).catch(function(error) {
			// An error happened.
			});
		return this.auth.currentUser.updateProfile({
			displayName: name
		})
	}
	getEmailStatus(){
		return this.auth.currentUser.emailVerified
	}
	addDetails(github,phone,dob,linkedin,twitter,university) {
		if(!this.auth.currentUser) {
			return alert('Not authorized')
		}

		return this.db.doc(`users/${this.auth.currentUser.uid}`).set({
			github: github,
			phone: phone,
			dob: dob,
			linkedin: linkedin,
			twitter: twitter,
			university: university,

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
	async getCurrentUserLinkedin() {
		const github = await this.db.doc(`users/${this.auth.currentUser.uid}`).get()
		return github.get('linkedin')
	}
	async getCurrentUserPhone() {
		const github = await this.db.doc(`users/${this.auth.currentUser.uid}`).get()
		return github.get('phone')
	}
	async getCurrentUserDOB() {
		const github = await this.db.doc(`users/${this.auth.currentUser.uid}`).get()
		return github.get('dob')
	}
	async getCurrentUserTwitter() {
		const github = await this.db.doc(`users/${this.auth.currentUser.uid}`).get()
		return github.get('twitter')
	}
	async getCurrentUserUniversity() {
		const github = await this.db.doc(`users/${this.auth.currentUser.uid}`).get()
		return github.get('university')
	}
}

export default new Firebase()