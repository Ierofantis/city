console.log("Service Worker Loaded...");

self.addEventListener("push", e => {
  const data = e.data.json();
  console.log("Push Recieved...");
  self.registration.showNotification(data.title, {
    body: "Danger",
    icon: "https://cdn.imgbin.com/18/12/10/imgbin-computer-icons-others-ju4HUS4TFWweV2TsTfx7twKmy.jpg"
  });
});