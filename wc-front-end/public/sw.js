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
	// console.log(event.request)
	if ( event.request.method === "POST" ){
		// event.respondWith(fetch(event.request));
		// console.log(1);
	}
	else {
		// stale and revalidate caching strategy 
		event.respondWith(
			fetch(event.request).then((responseFromServer)=>{
				return caches.open(dynamicVersion).then((cach)=>{
					cach.put(event.request,responseFromServer.clone());
					return responseFromServer;
				})
			})
			.catch((err)=>{
				return caches.match(event.request).then((responseFromCach)=>{
					return responseFromCach || caches.match('/');
				});
			})
		)
		// console.log(2)
	}
}
// e.respondWith(
			
// 	fetch(e.request).then((response)=>{
// 		return caches.open(dynamicAssets).then((cach)=>{
// 			cach.put(e.request,response.clone());
// 			return response;
// 		})
// 	})
// 	.catch((err)=>{
// 		return caches.match(e.request).then((cach)=>{
// 			return cach || caches.match('/');
// 		})
// 	})
	
// )
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
	// Database version
	const databaseVersion = 1;

	if (event.tag == 'loginSync') {
	    event.waitUntil(function(){
	    	const result = openIndexeddb("loggingUser", "backgroundSync", databaseVersion)
	    });
	}else if (event.tag == 'registerSync') {
		event.waitUntil(function(){
			const result = openIndexeddb("registeringUser", "backgroundSync", databaseVersion)
		});
	}else if (event.tag == 'addWebsiteSync') {
		event.waitUntil(function(){
			const result = openIndexeddb("addingWebsite", "backgroundSync", databaseVersion)
		});
	}else if (event.tag == 'deleteWebsiteSync') {
		event.waitUntil(function(){
			const result = openIndexeddb("deletingUser", "backgroundSync", databaseVersion)
		});
	}else if (event.tag == 'clearLogsSync') {
		event.waitUntil(function(){
			const result = openIndexeddb("clearingLogs", "backgroundSync", databaseVersion)
		});
	}else if (event.tag == 'saveUserInfoSync') {
		event.waitUntil(function(){
			const result = openIndexeddb("savingUser", "backgroundSync", databaseVersion)
		});
	}else if (event.tag == 'deleteUserSync') {
		event.waitUntil(function(){
			const result = openIndexeddb("deletingUser", "backgroundSync", databaseVersion)
		});
	}else if (event.tag == 'saveUserSettingsSync') {
		event.waitUntil(function(){
			const result = openIndexeddb("savingUserSettings", "backgroundSync", databaseVersion)
		});
	}
}

// let   finalResult    = null;
// function openIndexeddb(objectStore, databaseName,databaseVersion) {
// 	// Open up indexeddb for reading and deleting
// 	const request = indexedDB.open(databaseName,databaseVersion);
// 	let result = null;

// 	request.onupgradeneeded = (event)=>{ // Block scope problem in this event !!!!
// 		// Getting database
// 	 	const opening_result = event.target.result;
// 	 	// Create object store
// 	 	opening_result.createObjectStore(objectStore, {keyPath: "email"});
// 	 // 	// Onep a new transaction for CRUD ops
// 	 // 	const tx = opening_result.transaction(objectStore, "readwrite");
// 	 // 	// Get the object store to read data from it
// 		// result = tx.objectStore(objectStore);
// 	}
// 	request.onsuccess = (event)=>{ // Block scope problem in this event !!!!
// 		// Getting database
// 		const opening_result = event.target.result;
// 		// Opne a new transaction for CRUD ops
// 		const tx = opening_result.transaction(objectStore, "readwrite");
// 		// Get the object store to read data from it
// 		result = tx.objectStore(objectStore);
// 	}
// 	request.onerror = (event)=>{
// 		result = "Error!";
// 	}
// 	finalResult = result;
// 	return finalResult;
// }; 
// console.log(openIndexeddb("ddd","xxx",1));
// // tx.onerror = e => alert( ` Error! ${e.target.error}  `)
// // const pNotes = tx.objectStore("personal_notes");
// // pNotes.add(note);

// let   finalResult    = null;
// function openIndexeddb(objectStore, databaseName,databaseVersion) {
// 	// Open up indexeddb for reading and deleting
// 	const request = indexedDB.open(databaseName,databaseVersion);
//     let result = null; 
// 	function g() { result = 2 } g();
//     finalResult = result;
// 	return finalResult;
// }; 
// console.log(openIndexeddb("ddd","xxx",1));