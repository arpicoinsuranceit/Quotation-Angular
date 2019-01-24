import { CodeTransferHelperModel } from 'app/model/codetransferhelpermodel';
export class SaveCodeTransfer{
    constructor(private token?:string,private agent?:string,private reason?:string,private codeTransferHelpers?:CodeTransferHelperModel[]){

    }

    get Token(){
        return this.token;
    }

    set Token(token:string){
        this.token=token;
    }

    get Agent(){
        return this.agent;
    }

    set Agent(agent:string){
        this.agent=agent;
    }

    get Reason(){
        return this.reason;
    }

    set Reason(reason:string){
        this.reason=reason;
    }

    get CodeTransferHelpers(){
        return this.codeTransferHelpers;
    }

    set CodeTransferHelpers(codeTransferHelpers:CodeTransferHelperModel[]){
        this.codeTransferHelpers=codeTransferHelpers;
    }
}