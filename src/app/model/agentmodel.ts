export class AgentModel{
    constructor (private agentCode? : string, private agentName? : string, private location? : string, private agentCombine? : string){}

    get AgentCode (){
        return this.agentCode;
    }
    set AgentCode (agentCode : string){
        this.agentCode = agentCode;
    }

    get AgentName (){
        return this.agentName;
    }
    set AgentName (agentName : string){
        this.agentName = agentName;
    }

    get Location (){
        return this.location;
    }
    set Location (location : string){
        this.location = location;
    }

    get AgentCombine (){
        return this.agentCombine;
    }
    set AgentCombine (agentCombine : string){
        this.agentCombine = agentCombine;
    }
}