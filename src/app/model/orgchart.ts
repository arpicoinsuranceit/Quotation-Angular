export class OrgChartDto {
    id : string;
	name : string;
	location : string;
	locationName : string;
	designation : string;
	desCod : string;
    childs = new Array<OrgChartDto>();
}