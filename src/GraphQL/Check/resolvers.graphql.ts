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
		const user = await verify(user_token, application_config.jwt_secret! );
		// console.log(user)
		const data = await this.websiteService.getAverageTimeForWebsite(undefined, user.id)
		return data.data;
	}
	@Query(() => websiteAverageTimeInDaySchema)
	public async getAverageResponseTimeForWebsite(@Arg('website_id') website_id:string) {
		const data = await this.websiteService.getAverageTimeForWebsite(website_id, undefined )
		return data.data;
	}
}

export { websiteResolver };
// user_id = 5fbf816a29ec217de058f153
// website_id = 5fd7d15162b5c53be42efd52