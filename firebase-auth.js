// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDF7dufa5a2c5CEwWpKu4Pv3522puajXfM",
	authDomain: "scholarhub-ba462.firebaseapp.com",
	projectId: "scholarhub-ba462",
	storageBucket: "scholarhub-ba462.appspot.com",
	messagingSenderId: "858961732292",
	appId: "1:858961732292:web:5b9168b711e2f893f21f91"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function showMessage(message, divId) {
	var messageDiv = document.getElementById(divId);
	messageDiv.style.display = "block";
	messageDiv.innerHTML = message;
	messageDiv.style.opacity = 0;
	setTimeout(function() {
		messageDiv.style.opacity = 0;
	}, 5000);
}

// Function that creates accounts in Firebase
const signUp = document.getElementById('createAccount');
signUp.addEventListener('click', (event) => {
	event.preventDefault();
	const email = document.getElementById('email').value;
	const password = document.getElementById('password').value;
	const firstName = document.getElementById('first_name').value;
	const lastName = document.getElementById('last_name').value;

	const auth = getAuth();
	const db = getFirestore();

	createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			const user = userCredential.user;
			const userData = {
				email: email,
				firstName: firstName,
				lastName: lastName
			};
			const docRef = doc(db, "users", user.uid);
			setDoc(docRef, userData)
				.then(() => {
					window.location.href = 'login.html';
				})
				.catch((error) => {
					console.error("Error writing document", error);
				});
		})
		.catch((error) => {
			const errorCode = error.code;
			if(errorCode == 'auth/email-already-in-use') {
				showMessage('Email address already exists!', 'signUpMessage');
			}

			else {
				showMessage('Unable to create user', "signUpMessage");
			}
		})
});

// Function that allows a registered user to log in
const signIn = document.getElementById('submitSignIn');
document.addEventListener('click', (event) => {
	event.preventDefault();
	const email = document.getElementById('email').value;
	const password = document.getElementById('password').value;
	const auth = getAuth();
	//setPersistence(auth, browserSessionPersistence)

	signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			showMessage('login successful', 'signInMessage');
			const user = userCredential.user;
			localStorage.setItem('loggedInUserId', user.uid);
			window.location.href='AddNewCourse.html';
		})
		.catch((error) => {
			const errorCode = error.code;
			if(errorCode =='auth/invalid-credential') {
				showMessage('Incorrect email or password', 'signInMessage');
			}
			else {
				showMessage('Account does not exist', 'signInMessage');
			}
		})
})



const addCourse = document.getElementById('submitNewCourse');
document.addEventListener('click', (event) => {
	event.preventDefault();
	const courseName = document.getElementById('courseName').value;
	const courseURL = document.getElementById('websiteUrl').value;
	const certificateTrack = document.getElementById('certificateTrack').value;
	const courseDetails = document.getElementById('courseDetails').value;
	const currentlyEnrolled = document.getElementById('currentlyEnrolled').value;
	const completedCourse = document.getElementById('completed').value;
	const dateCompleted = document.getElementById('completedDate').value;

	const auth = getAuth();
	const user = firebase.auth().currentUser;
	const db = getFirestore();

	const courseData = {
		Name: courseName,
		Website: courseURL,
		Track: certificateTrack,
		Details: courseDetails,
		Current: currentlyEnrolled,
		Completed: completedCourse,
		dateCompleted: dateCompleted
	}

	const docRef = doc(db, "courses", user.uid);
		setDoc(docRef, courseData)
			then(() => {
				window.location.href = "CompletedCourses.html";
			})
			.catch((error) => {
				console.error("Error writing document", error);
			});
});

