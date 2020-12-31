import { ObjectType, Field } from 'type-graphql';


@ObjectType()
class WebsiteSpeedEntity {
	
	@Field(type => String)
	date : number

	@Field(type => Number)
	value : number

}
@ObjectType({description: "This represents average response time about websites"})
class websiteAverageTimeInDaySchema {

	@Field(type => String, { nullable: false})
	website_id: string;

	@Field(type => String, { nullable: false})
	user_id : string;

	@Field(type=> [WebsiteSpeedEntity], {nullable: false})
	website_speed_last_ten_days: [{date: string, value: number}]

}

export { websiteAverageTimeInDaySchema };