import { ObjectType, Field } from 'type-graphql';


@ObjectType({description: "This represents average response time about websites in a day"})
class WebsiteSpeedEntity {
	
	@Field(type => String)
	date : number

	@Field(type => Number)
	average_melliseconds : number

}

@ObjectType({description: "This represents average response time about websites"})
class websiteAverageTimeInDaySchema {

	@Field(type => String, { nullable: false})
	website_id: string;

	@Field(type => String, { nullable: false})
	user_id : string;

	@Field(type => String, { nullable: false})
	website_name : string;

	@Field(type => [WebsiteSpeedEntity], {nullable: true})
	website_speed_last_ten_days: [WebsiteSpeedEntity];

	@Field(type => [String], {nullable: true})
	labels : string[];

	@Field(type => [String], {nullable: true})
	data : string[];

}

export { websiteAverageTimeInDaySchema }; 