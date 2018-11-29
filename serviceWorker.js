
var CACHE = 'cryptic-cache';
var precacheFiles = [
	'./',
    './index.html',
	'./assets/logo.png',
	'./assets/sidebar-logo.png',
	'./css/containers.css',
	'./css/structure.css',
	'./css/media.css',
	'./css/sidebar.css',
  './css/pillbar.css',
  './css/tabs.css',
	'./css/productreg.ttf',
	'./css/productbold.ttf',
	'./icons/css/all.css',
	'./icons/webfonts/fa-brands-400.ttf',
	'./icons/webfonts/fa-regular-400.ttf',
	'./icons/webfonts/fa-solid-900.ttf',
	'./registerWorker.js',
  './scripts/sidebar.js',
  './scripts/tabs.js',
	'./scripts/ticket.js',
	'./vendor/bootstrap/css/bootstrap.min.css',
	'./vendor/bootstrap/js/bootstrap.bundle.min.js',
	'./vendor/jquery/jquery.min.js',
	'./vendor/react/react.js',
  './vendor/react/react-dom.js',
  './vendor/redux/redux.js',
  './vendor/redux/react-redux.js',
	'./manifest.json'
    ];

//Install stage sets up the cache-array to configure pre-cache content
self.addEventListener('install', function(evt) {
  console.log('Service worker is being installed.');
  evt.waitUntil(precache().then(function() {
    console.log('Skip waiting on install');
    return self.skipWaiting();
  }));
});


//allow sw to control the current page
self.addEventListener('activate', function(event) {
  console.log('Claiming clients for current page');
  return self.clients.claim();
});

self.addEventListener('fetch', function(evt) {
  console.log('Service worker is serving the asset.'+ evt.request.url);
  evt.respondWith(fromCache(evt.request).catch(fromServer(evt.request)));
  evt.waitUntil(update(evt.request));
});


function precache() {
  return caches.open(CACHE).then(function (cache) {
    return cache.addAll(precacheFiles);
  });
}

function fromCache(request) {
  //we pull files from the cache first thing so we can show them fast
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  });
}

function update(request) {
  //this is where we call the server to get the newest version of the 
  //file to use the next time we show view
  return caches.open(CACHE).then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response);
    });
  });
}

function fromServer(request){
  //this is the fallback if it is not in the cache to go to the server and get it
  return fetch(request).then(function(response){ return response});
}
