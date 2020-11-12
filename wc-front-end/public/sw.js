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

	// Push a notification
	console.log('Pushed');
}