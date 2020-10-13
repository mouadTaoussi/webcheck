type Config = {
	mongodb_connection: string
	port              : number
}
 

const application_config: Config  = {
	mongodb_connection : "mongodb://localhost:27017/websitecheck",
	port               : 8000

}


export default application_config;