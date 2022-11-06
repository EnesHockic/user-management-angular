import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Permission } from "./permission.model";

@Injectable({
    providedIn: 'root'
})
export class PermissionService{
    baseUrl = "https://localhost:7228/api/Permission";
    constructor(private httpClient: HttpClient){}

    getPermissions(){
        return this.httpClient.get<Permission[]>(this.baseUrl);
    }
}