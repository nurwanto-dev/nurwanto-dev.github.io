// if('serviceWorker' in navigator){
//   navigator.serviceWorker.register('/sw.js')
//     .then(reg => console.log('service worker registered'))
//     .catch(err => console.log('service worker not registered', err));
// }

// "use strict";

// const notificationButton = document.getElementById("enableNotifications");
// let swRegistration = null;

// initializeApp();

// function initializeApp() {
//   if ("serviceWorker" in navigator ) {
//     console.log("Service Worker and Push is supported");

//     //Register the service worker
//     navigator.serviceWorker
//       .register("/sw.js")
//       .then(swReg => {
//         console.log("Service Worker is registered", swReg);
//         swRegistration = swReg;
//       })
//       .catch(error => {
//         console.error("Service Worker Error", error);
//       });
//   } else {
//     console.warn("service not running");
//     notificationButton.textContent = "service not work";
//   }

//   if("PushManager" in window){

//   }else{
//     console.warn("Push messaging is not supported");
//     notificationButton.textContent = "Push Not Supported";
//   }

// }

// function displayNotification() {
//   if (window.Notification && Notification.permission === "granted") {
//     notification();
//   }
//   // If the user hasn't told if he wants to be notified or not
//   // Note: because of Chrome, we are not sure the permission property
//   // is set, therefore it's unsafe to check for the "default" value.
//   else if (window.Notification && Notification.permission !== "denied") {
//     Notification.requestPermission(status => {
//       if (status === "granted") {
//         notification();
//       } else {
//         alert("You denied or dismissed permissions to notifications.");
//       }
//     });
//   } else {
//     // If the user refuses to get notified
//     alert(
//       "You denied permissions to notifications. Please go to your browser or phone setting to allow notifications."
//     );
//   }
// }

// function notification() {
//   const options = {
//     body: "Testing Our Notification",
//     icon: "./bell.png"
//   };
//   swRegistration.showNotification("PWA Notification!", options);
// }

const check = () => {
  if (!("serviceWorker" in navigator)) {
    throw new Error("No Service Worker support!");
  }
  if (!("PushManager" in window)) {
    throw new Error("No Push API Support!");
  }
};

const registerServiceWorker = async () => {
  const swRegistration = await navigator.serviceWorker.register("/sw.js");
  console.log('first', swRegistration)
  return swRegistration;
};

const requestNotificationPermission = async (swRegistration) => {
  const permission = await window.Notification.requestPermission();
  // value of permission can be 'granted', 'default', 'denied'
  // granted: user has accepted the request
  // default: user has dismissed the notification permission popup by clicking on x
  // denied: user has denied the request.

  // if (permission && Notification.permission === "granted") {
  //   // If it's okay let's create a notification
  //   notification(swRegistration);
  // }

  // Otherwise, we need to ask the user for permission
  if (permission !== "denied") {
    Notification.requestPermission(status => {
      if (status === "granted") {
        //notification(swRegistration);

      } else {
        alert("You denied or dismissed permissions to notifications.");
      }
    });
  } else {
    // If the user refuses to get notified
    alert(
      "You denied permissions to notifications. Please go to your browser or phone setting to allow notifications."
    );
  }
};


function notification(swRegistration) {
  const options = {
    body: "Testing Our Notification",
    icon: "./bell.png"
  };
  console.log('ini masuk', swRegistration)
  swRegistration.showNotification("PWA Notification!", options);
}

const main = async () => {
  check();
  const swRegistrations = await registerServiceWorker();
  console.log(swRegistrations, 'oy')
  requestNotificationPermission(swRegistrations);

};

main(); //we will not call main in the beginning.
