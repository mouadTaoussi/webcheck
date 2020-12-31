import { Resolver,Query , Arg } from 'type-graphql';
import { websiteAverageTimeInDaySchema } from './typedefinitions.graphql';
import CheckWebsitesService from '../.././Check/Check.service';

@Resolver(of => websiteAverageTimeInDaySchema)
class websiteResolver {
	@Query(returns => [websiteAverageTimeInDaySchema])
	public async getAverageResponseTimeForUserWebsites(@Arg('user_id') user_id:string):Promise<any> {

	}
	@Query(returns => websiteAverageTimeInDaySchema)
	public async getAverageResponseTimeForWebsite(@Arg('website_id') website_id:string):Promise<any> {

	}
} 

export { websiteResolver };