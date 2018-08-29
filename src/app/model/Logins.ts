export class Logins{
    userName: string;
    password: string;
    locks: string;
    constructor(
        userName : string,
        password : string,
        locks: string){
            this.userName=userName;
            this.password=password;
            this.locks=locks;
        }
}