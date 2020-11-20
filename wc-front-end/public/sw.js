this.oninstall = (event)=>{

	// Cach static assets
	console.log('Installed');
}

this.onactivate = (event)=>{

	// Delete old version assets
	console.log('Activated');
}

this.onfetch = (event)=>{

	// stale and revalidate caching strategy 
	console.log('Fetched');
}

this.onpush = (event)=>{
	// Data received from server via push service
	const data = event.data.json();
	// Push a notification
	self.registration.showNotification(data.title, {
		body : "Your website is currently down and not working!",
		icon : "/logo.ico"
	});
}