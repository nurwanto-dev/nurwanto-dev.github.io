importScripts('https://www.gstatic.com/firebasejs/7.14.6/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.6/firebase-messaging.js');


importScripts("https://www.gstatic.com/firebasejs/7.16.1/firebase-app.js");
importScripts(
    "https://www.gstatic.com/firebasejs/7.16.1/firebase-messaging.js",
);
// For an optimal experience using Cloud Messaging, also add the Firebase SDK for Analytics.
importScripts(
    "https://www.gstatic.com/firebasejs/7.16.1/firebase-analytics.js",
);

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
    messagingSenderId: "AAAAXbJOKyE:APA91bHqDdRRd3q0kcKpTyKdMYeF2d-V0iJO2_CeQIPG7JFESjtdAOY62Qd4cFoxDyk8LwqQYV-mUcYb6mFZEuw5EGrJZ3xEdqkjExHV1m8A2Fdseot-QaiVWWp5RmhxmiUaRiuy30sO",
    apiKey: "AIzaSyASge5lPlgcAu8Ewv5PiI0wOKfmnOTZWaE",
    projectId: "trackmylocationupdated-m-a7ce4",
    appId: "1:402423425825:web:98b9434db60b8b73e06c60",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    console.log(
        "[firebase-messaging-sw.js] Received background message ",
        payload,
    );
    // Customize notification here
    const notificationTitle = "Background Message Title";
    const notificationOptions = {
        body: "Background Message body.",
        icon: "/itwonders-web-logo.png",
    };

    return self.registration.showNotification(
        notificationTitle,
        notificationOptions,
    );
});