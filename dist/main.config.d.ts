declare type Config = {
    email: string;
    password: string;
    database_connection: string;
};
declare const application_config: Config;
export default application_config;
