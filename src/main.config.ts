type Config = {
	email               : string,
	password            : string,
	database_connection : string,
	vapid_publicKey     : string,
	vapid_private_key   : string
}
 
const application_config: Config  = {
	email               : process.env.EMAIL,
	password            : process.env.PASSWORD,
	database_connection : process.env.DATABASE_CONNECTION,
	vapid_publicKey     : process.env.VAPID_PUBLIC_KEY,
	vapid_private_key   : process.env.VAPID_PRIVATE_KEY

}

export default application_config;