import { Resolver,Query , Arg, Field, ObjectType } from 'type-graphql';
import { websiteAverageTimeInDaySchema } from './typedefinitions.graphql';
import CheckWebsitesService from '../.././Check/Check.service';
import { verify } from 'jsonwebtoken';
import application_config  from '../.././main.config';

@Resolver(of => websiteAverageTimeInDaySchema)
class websiteResolver {

	private websiteService: any;
	constructor(){
		this.websiteService = new CheckWebsitesService();
	}

	@Query(() => [websiteAverageTimeInDaySchema]) 
	public async getAverageResponseTimeForUserWebsites(@Arg('user_token') user_token:string){
		// Find the appropriate user that owns this token
		const user:any = await verify(user_token, application_config.jwt_secret! );
		// console.log(user)
		const dataWebsites: { status:number, data:any } = await this.websiteService.getAverageTimeForWebsite(undefined, user.id) // @ERROR

		// separate date and average time and put them in 2 arrays
		for (var i = 0; i < dataWebsites.data.length; i++) {

			var labels : string[] = [];
			var data : number[] = [];

			// Push values and dates to a separate variables to use them in the chat
			for ( var io = 0; io < dataWebsites.data[i].website_speed_last_ten_days.length; io++ ) 
			{
				labels.push(dataWebsites.data[i].website_speed_last_ten_days[io].date);
				data.push(dataWebsites.data[i].website_speed_last_ten_days[io].average_melliseconds);
			} 
			// console.log(labels)
			// console.log(data)
			dataWebsites.data[i].labels = labels;
			dataWebsites.data[i].data = data;
		}
		return dataWebsites.data;
	}
	@Query(() => websiteAverageTimeInDaySchema)
	public async getAverageResponseTimeForWebsite(@Arg('website_id') website_id:string) {
		const data = await this.websiteService.getAverageTimeForWebsite(website_id, undefined )
		// separate date and average time and put them in 2 arrays


		return data.data;
	}
}

export { websiteResolver };
// user_id = 5fbf816a29ec217de058f153
// website_id = 5fd7d15162b5c53be42efd52