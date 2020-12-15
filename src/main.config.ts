// import dotenv from 'dotenv'; 

// dotenv.config({ path: './.env' });

// console.log(process.env.EMAIL)
// console.log(process.env.VAPID_PUBLIC_KEY)

type Config = {
	email                : string | undefined,
	password             : string | undefined,
	database_connection  : string | undefined,
	vapid_public_key     : string | undefined,
	vapid_private_key    : string | undefined,
	port_dev             : string | number | undefined,
	port                 : string | number | undefined
}
 
const application_config : Config  = {
	email                : process.env.EMAIL,
	password             : process.env.PASSWORD,
	database_connection  : process.env.DATABASE_CONNECTION,
	vapid_public_key     : process.env.VAPID_PUBLIC_KEY,
	vapid_private_key    : process.env.VAPID_PRIVATE_KEY,
	port_dev             : process.env.PORT_DEV,
	port                 : process.env.PORT
}

export default application_config;