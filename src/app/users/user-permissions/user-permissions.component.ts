import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Permission } from '../permission.model';
import { PermissionService } from '../permission.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-permissions',
  templateUrl: './user-permissions.component.html',
  styleUrls: ['./user-permissions.component.css']
})
export class UserPermissionsComponent implements OnInit, OnDestroy {
  userId: number;
  userPermissions : Permission[];
  allPermissions : Permission[];
  userUnassignedPermissions : Permission[];
  constructor(private userService: UserService,
              private permissionService: PermissionService,
              private router: Router,
              private route: ActivatedRoute) { }
  

  ngOnInit(): void {
    this.route.params.subscribe((params: Params)=>{
      console.log(params["id"]);
      this.userId = params["id"];
      this.userService.getUserPermissions(this.userId)
        .subscribe({
          next:(response) => {
              this.userPermissions = response;
              this.getAllPermissions();
          },
          error:(error) => {
              console.log(error);
          }
      })
      
      
    })
  }
  getAllPermissions(){
    this.permissionService.getPermissions()
    .subscribe({
      next:(response) => {
          this.allPermissions = response;
          this.getUserUnassignedPermissions();
      },
      error:(error) => {
          console.log(error);
      }
  })
  }

  getUserUnassignedPermissions(){
    this.userUnassignedPermissions = this.allPermissions.filter(el => !this.userPermissions.find(p => p.id === el.id));
    console.log(this.userUnassignedPermissions);
  }
  onUnassignPermission(permissionId: number){
    this.userService.removePermissionFromUser(this.userId, permissionId);
  }
  onAssignPermission(permissionId){
    this.userService.addPermissionToUser(this.userId, permissionId);
  }

  ngOnDestroy(): void {
    console.log("OnDestroy");
  }
}
