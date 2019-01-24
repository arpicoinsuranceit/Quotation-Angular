export class CodeTransferModel{

    constructor(private pprNum?: string,private polNum?: string,private locCode?: string,private oldAgentCode?: string,private newAgentCode?: string,
        private reason?: string,private status?: string,private requestBy?: string,private requestDate?: string,private approvedBy?: string,
        private approvedDate?: string,private createDate?: string,private createBy?: string,private modifyBy?: string,private modifyDate?: string
        ,private approverRemark?: string){
    }

    get PprNum(){
        return this.pprNum;
    }

    set PprNum(pprNum:string){
        this.pprNum=pprNum;
    }

    get OldAgentCode(){
        return this.oldAgentCode;
    }

    set OldAgentCode(oldAgentCode:string){
        this.oldAgentCode=oldAgentCode;
    }

    get NewAgentCode(){
        return this.newAgentCode;
    }

    set NewAgentCode(newAgentCode:string){
        this.newAgentCode=newAgentCode;
    }

    get LocCode(){
        return this.locCode;
    }

    set LocCode(locCode:string){
        this.locCode=locCode;
    }

    get PolNum(){
        return this.polNum;
    }

    set PolNum(polNum:string){
        this.polNum=polNum;
    }

    get Reason(){
        return this.reason;
    }

    set Reason(reason:string){
        this.reason=reason;
    }

    get Status(){
        return this.status;
    }

    set Status(status:string){
        this.status=status;
    }

    get RequestBy(){
        return this.requestBy;
    }

    set RequestBy(requestBy:string){
        this.requestBy=requestBy;
    }

    get RequestDate(){
        return this.requestDate;
    }

    set RequestDate(requestDate:string){
        this.requestDate=requestDate;
    }

    get ApprovedBy(){
        return this.approvedBy;
    }

    set ApprovedBy(approvedBy:string){
        this.approvedBy=approvedBy;
    }

    get ApprovedDate(){
        return this.approvedDate;
    }

    set ApprovedDate(approvedDate:string){
        this.approvedDate=approvedDate;
    }

    get CreateDate(){
        return this.createDate;
    }

    set CreateDate(createDate:string){
        this.createDate=createDate;
    }

    get CreateBy(){
        return this.createBy;
    }

    set CreateBy(createBy:string){
        this.createBy=createBy;
    }

    get ModifyBy(){
        return this.modifyBy;
    }

    set ModifyBy(modifyBy:string){
        this.modifyBy=modifyBy;
    }

    get ModifyDate(){
        return this.modifyDate;
    }

    set ModifyDate(modifyDate:string){
        this.modifyDate=modifyDate;
    }

    get ApproverRemark(){
        return this.approverRemark;
    }

    set ApproverRemark(approverRemark:string){
        this.approverRemark=approverRemark;
    }

}