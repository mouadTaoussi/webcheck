import CheckWebsiteController from "./Check.controller";
import { scheduleJob } from 'node-schedule';
import { schedule } from 'node-cron'; 

// Init the jobs
const checkWebsitesJob = new CheckWebsiteController().checkEveryWebsiteExists;
const calculteAverageResponseOfWebsite = new CheckWebsiteController().calculateAverageResponseOfWebsite;

// Run <checkEveryWebsiteExists> Job every 1.5 minutes
setInterval(checkWebsitesJob, 90000);/*90000*/

// setInterval(()=>{console.log(1)},1000)
// setInterval(checkWebsitesJob, 1000);
// setInterval(()=>{console.log(1)},2000)

// Job that collects response times in the day to calculate the average time taken 
// to finish response and display the average for each day in a graph report to the user
// or the website owner
// scheduleJob({hour: 14, minute: 30, dayOfWeek: 0}, calculteAverageResponseOfWebsite);
// scheduleJob({hour: 0, minute: 0, dayOfWeek: 0}, ()=>{console.log(1)});
// setInterval(calculteAverageResponseOfWebsite, 2000);

// Run a job every day at 00:05AM
schedule('05 00 * * *', calculteAverageResponseOfWebsite);