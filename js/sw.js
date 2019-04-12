"use script";
self.addEventListener("install", event => {
  self.skipWaiting();
});

self.addEventListener("push", event => {
  const options = {};
  event.waitUntil(
    self.registration.showNotification("Data Processed from", options)
  );
});
