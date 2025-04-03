export interface IUserLoginData {
    _id: string; 
    userId: string; 
    name: string;   
    email: string;  
    counter:number;

}
// types/User.ts or in your component file
export interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    createdAt: string; // or Date type if you're converting it to a Date instance later
    updatedAt: string; // same as above
}