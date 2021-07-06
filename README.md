<p align="center">
  <img src="https://github.com/mouadTaoussi/checkwebsite/blob/master/wc-front-end/src/assets/LogoOfReadme.svg"/>
</p>
<!-- <p align="center">
  <img src="https://github.com/mouadTaoussi/checkwebsite/blob/master/wc-front-end/src/assets/DashboardPreviewOfReadme.svg"/>
</p> -->

<h6 align="center">
	<strong>An application that check website if it down and stopped working or not! and notify the website's owner to get it fixed ASAP 😎</strong>
</h6>

#  Get Up and running in local env

## Note : Front-end and the Back-end are deployed separately (vercel-heroku).
<p>There are some of the configurations related to cors</p>

### Clone the repo

```
git clone https://github.com/mouadTaoussi/checkwebsite.git
```
```
cd checkwebsite
```

### Install the dependencies

```
npm install
```

### Create ``.env`` file and add those elements within your credentiels below:
<p>But before that, you need to generate vapid keys for use in webpush protocol !!!</p>

```
web-push generate-vapid-keys [--json]
```

```
touch .env && nano .env
```
```
EMAIL = xxxxxxxxxxxxxxxxxx
PASSWORD = xxxxxxxxxxxxxxx
DATABASE_CONNECTION = xxxx
VAPID_PUBLIC_KEY = xxxxxxx
VAPID_PRIVATE_KEY = xxxxxx
PORT_DEV = 8000
INDEV = development
JWT_SECRET = xxxxxxxxxxxxx

```

### Edit ``main.config.ts`` file
<p>You must edit this file to specify the front end origin (where you deployed the front end app) that's allowed to access your backend server.</p>

```
nano src/main.config.ts
```
```js
const application_config : Config  = {
	email                : process.env.EMAIL,
	password             : process.env.PASSWORD,
	database_connection  : process.env.DATABASE_CONNECTION,
	vapid_public_key     : process.env.VAPID_PUBLIC_KEY,
	vapid_private_key    : process.env.VAPID_PRIVATE_KEY,
	port_dev             : process.env.PORT_DEV,
	port                 : process.env.PORT,
	jwt_secret           : process.env.JWT_SECRET,
	// Edit those :
	// front_end_origin     : "http://localhost:8080", <-- if you are in local development
	// front_end_origin     : "*", <-- if you allowed all origins accecing your back-end server
	// front_end_origin     : "https://yourfrontendappdomain.com", <-- if you deployed the frontend to a different hosting service
	// front_end_origin     : "/", <-- if your frontend app and the back-end server are in the same host
	websites_limit       : 6,
}

```

### if you deployed the front-end and the back-end to same host
## uncomment that code in ``main.ts`` file:

```
app.use('/',express.static(  __dirname + "/../wc-front-end/dist"));
```

## then comment out that snippet below:

```js
// app.get('/',(req:Request, res:Response)=>{
//	res.redirect('https://webcheck.vercel.app');
// });
```

### compile the code

```
npm run compile
```

### run app locally

```
npm run dev
```

### run app when it is in prod

```
npm run start
```

## Front-end setup

```
cd wc-front-end
```

```
npm install
```

### Edit ``api.config.js``

```
nano api.config.js
```
```js
const api_config = {
	apiPath   : "https://yourbackendappdomain.com/"  // API Origin <SERVER SIDE ENDPOINT> 
	// apiPath   : "http://localhost:8000/" <-- if your app in local env
	// apiPath   : "/" <-- if your frontend app and the back-end server are in the same host
}
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your unit tests

```
npm run test:unit
```

### Lints and fixes files

```
npm run lint
```

## Note: You can use this library to run those servers <a href="https://www.npmjs.com/package/concurrently">concurrently</a>
<p>Instead of opening up multiple terminal tabs to run compiling and the server and the front-end proccesses</p>

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).