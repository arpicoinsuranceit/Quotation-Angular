export class CodeTransferHelperModel{

    constructor(private pprNum?: string,private branch?: string,private agentCode?: string,private agentName?: string,private designation?: string){
    }

    get PprNo(){
        return this.pprNum;
    }

    set PprNo(pprNum:string){
        this.pprNum=pprNum;
    }

    get AgentCode(){
        return this.agentCode;
    }

    set AgentCode(agentCode:string){
        this.agentCode=agentCode;
    }

    get Branch(){
        return this.branch;
    }

    set Branch(branch:string){
        this.branch=branch;
    }

    get AgentName(){
        return this.agentName;
    }

    set AgentName(agentName:string){
        this.agentName=agentName;
    }

    get Designation(){
        return this.designation;
    }

    set Designation(designation:string){
        this.designation=designation;
    }

}