import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { PaginatedList } from "./PaginatedList.model";
import { Permission } from "./permission.model";
import { User } from "./User.model";

@Injectable({
    providedIn: 'root'
})

export class UserService{
    baseUrl = "https://localhost:7228/api/User";
    userPermissionsChanged = new Subject<boolean>();
    onInfoMessage = new Subject<{type: string,message: string}>();
    onErrorMessage = new Subject<{type: string,message: string, errors}>();
    constructor(private httpClient: HttpClient){}

    getUsers(pageNumber: number = 0, pageSize:number = 0, sortOrder ="", searchString = ""){
        return this.httpClient.get<PaginatedList<User>>(`${this.baseUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}&sortOrder=${sortOrder}&searchString=${searchString}`)
    }
    getUserById(id:number){
        return this.httpClient.get<User>(`${this.baseUrl}/` + id);
    }
    updateUser(id:number, user: User){
        console.log(user);
        return this.httpClient.put<User>(`https://localhost:7228/api/User/${id}`,user)
        .subscribe({
            next:(response) =>{
                console.log("response");
                console.log(response);
                this.onInfoMessage.next({type:'success',message:'User successfully updated!'});
            },
            error:(error) =>{
                console.log(error);
                this.onErrorMessage.next({type:'error',message:error.message, errors: error.error.errors});
            }
        });
    }
    addUser(user:User)
    {
        console.log(user);
        this.httpClient.post<User>(`${this.baseUrl}/`,user)
        .subscribe({
            next:(response) => {
                console.log("response");
                console.log(response);
                this.onInfoMessage.next({type:'success',message:'User successfully Added!'});
            },
            error:(error) => {
                
                this.onErrorMessage.next({type:'error',message:error.message, errors: error.error.errors});
            }
        })
    }
    deleteUser(usedId: number){
        return this.httpClient.delete<boolean>(`${this.baseUrl}/${usedId}`);
    }
    getUserPermissions(userId:number){
        return this.httpClient.get<Permission[]>(`${this.baseUrl}/${userId}/Permissions`);
    }
    removePermissionFromUser(userId:number, permissionId: number)
    {
        return this.httpClient.delete<boolean>(`${this.baseUrl}/${userId}/Permissions/${permissionId}`)
        .subscribe({
            next:(response) => {
                this.userPermissionsChanged.next(response);
                this.onInfoMessage.next({type:'success',message:'Permission removed!'});
            },
            error:(error) => {
                this.onErrorMessage.next({type:'error',message:error.message, errors: error.error.errors});

                }
        })
    }
    addPermissionToUser(userId:number, permissionId: number)
    {
        return this.httpClient.post<boolean>(`${this.baseUrl}/${userId}/Permissions`,permissionId)
        .subscribe({
            next:(response) => {
                this.userPermissionsChanged.next(response);
                this.onInfoMessage.next({type:'success',message:'Permission added!'});
            },
            error:(error) => {
                this.onErrorMessage.next({type:'error',message:error.message, errors: error.error.errors});

            }
        })
    }
}