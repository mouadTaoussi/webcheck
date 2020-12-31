import CheckWebsiteController from "./Check.controller";
import { scheduleJob } from 'node-schedule';

// Init the jobs
const checkWebsitesJob = new CheckWebsiteController().checkEveryWebsiteExists;
const calculteAverageResponseOfWebsite = new CheckWebsiteController().calculateAverageResponseOfWebsite;

// Run <checkEveryWebsiteExists> Job every 1.5 minutes
setInterval(checkWebsitesJob, 90000);
// setInterval(()=>{console.log(1)},2000)

// Run a job every day at 2:30PM
// Job that collects response times in the day to calculate the average time taken 
// to finish response and display the average for each day in a graph report to the user
// or the website owner
scheduleJob({hour: 14, minute: 30, dayOfWeek: 0}, calculteAverageResponseOfWebsite);
setInterval(calculteAverageResponseOfWebsite, 2000);