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
  userFirstName: string;
  userLastName: string;
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
      this.getUserDataFromRouting(this.router.getCurrentNavigation());
      
      this.loadPermissions();
      this.userService.userPermissionsChanged.subscribe(
        () => this.loadPermissions()
      )
    })
  }
  getUserDataFromRouting(currentNavigation){
    if(currentNavigation)
    {
      let userDetails = currentNavigation.extras.state;
      this.userFirstName = userDetails.firstName;
      this.userLastName = userDetails.lastName;
    }
  }
  loadPermissions(){
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
    this.loadPermissions();
  }
  onAssignPermission(permissionId){
    this.userService.addPermissionToUser(this.userId, permissionId);
    this.loadPermissions();
  }

  ngOnDestroy(): void {
    console.log("OnDestroy");
  }
}
