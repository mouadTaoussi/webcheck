const staticVersion = "static-1";
const dynamicVersion = "dynamic-1";

const StaticAssets = [
	"/index.html",
	"/favicon.ico",
	"/logo.ico",
	"/robots.txt",
	"/surveyapp.design.system.css",
	"/js/about.22213c69.js",
	"/js/app.e823ca7b.js",
	"/js/chunk-vendors.909d6cc3.js",
	"/css/app.6ab951e3.css",
	"/img/fa-brands-400.39dc5116.svg",
	"/img/fa-regular-400.dc2561f4.svg",
	"/img/fa-solid-900.7ed0b094.svg",
	"/img/footerBackground.0b933aa7.svg",
	"/img/login&registerBackground.132ad4d6.svg",
	"/img/LoginSection.7fdef3d2.svg",
	"/img/logo_green.db12017d.svg",
	"/img/logo_light.9d3a344c.svg",
	"/img/Notifications.7106193d.svg",
	"/img/undraw_Confirmation_re_b6q5.7d3fd5c2.svg",
	"/img/fundraw_Reviewed_docs_re_9lmr.b4e94261.svg",
	"/img/undraw_windows_q9m0.f2bf142b.svg",
	"/img/websitesStatus.5112a66f.svg",
	"/fonts/fa-brands-400.067595ad.woff2",
	"/fonts/fa-brands-400.57dcda6f.eot",
	"/fonts/fa-brands-400.9ec698d1.ttf",
	"/fonts/fa-brands-400.b564da88.woff",
	"/fonts/fa-regular-400.3351f435.eot",
	"/fonts/fa-regular-400.4165c268.woff2",
	"/fonts/fa-regular-400.73cf49a2.woff",
	"/fonts/fa-regular-400.a0e3ac82.ttf",
	"/fonts/fa-solid-900.55eb2a60.woff2",
	"/fonts/fa-solid-900.75f38a15.ttf",
	"/fonts/fa-solid-900.89e02bae.eot",
	"/fonts/fa-solid-900.cdfec5cf.woff",
];

this.oninstall = (event)=>{

	// Cach static assets
	console.log('Installed');
	event.waitUntil( 
		caches.open(staticVersion).then((cach)=>{
			return cach.addAll(StaticAssets);
		})
	 )
}

this.onactivate = (event)=>{

	// Delete old version assets
	event.waitUntil(
		caches.keys().then((keys)=>{
			const keysToDelete = keys.filter((key)=>{
				return key !== staticVersion && key !== dynamicVersion
			})

			for (var i = 0; i < keysToDelete.length; i++) {
				caches.delete(keysToDelete[i]);
			}
		})
		)
	console.log('Activated');
}

this.onfetch = (event)=>{

	if (event.request.includes('/auth') || event.request.includes('/check')){
		event.respondWith(fetch(event.request));
	}
	else {
		// stale and revalidate caching strategy 
		event.respondWith(
			fetch(event.request).then((responseFromServer)=>{
				return caches.open(dynamicVersion).then((cach)=>{
					cach.put(e.request,responseFromServer.clone());
					return responseFromServer;
				})
			})
			.catch((err)=>{
				return caches.match(event.request).then((responseFromCach)=>{
					return responseFromCach
				});
			})
		)
		console.log('Fetched');

	}
}

this.onpush = (event)=>{
	// Data received from server via push service
	const data = event.data.json();
	// Push a notification
	self.registration.showNotification(data.title, {
		body : "Website link: " + data.url,
		icon : "/logo.ico"
	});
}

this.onsync = (event)=>{
	if (event.tag == 'loginSync') {
	    event.waitUntil(doSomeStuff());
	}else if (event.tag == 'registerSync') {
		event.waitUntil(doSomeStuff());
	}else if (event.tag == 'addWebsiteSync') {
		event.waitUntil(doSomeStuff());
	}else if (event.tag == 'deleteWebsiteSync') {
		event.waitUntil(doSomeStuff());
	}else if (event.tag == 'clearLogsSync') {
		event.waitUntil(doSomeStuff());
	}else if (event.tag == 'saveUserInfoSync') {
		event.waitUntil(doSomeStuff());
	}else if (event.tag == 'saveUserSettingsSync') {
		event.waitUntil(doSomeStuff());
	}
}