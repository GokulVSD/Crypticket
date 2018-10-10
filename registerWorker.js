//This is the service worker with the Cache-first network

if (navigator.serviceWorker.controller) {
  console.log('active service worker found, no need to register')
} else {

//Register the ServiceWorker
  navigator.serviceWorker.register('serviceWorker.js', {
    scope: './'
  }).then(function(reg) {
    console.log('Service worker has been registered for scope:'+ reg.scope);
  });
}