import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginatedList } from '../PaginatedList.model';
import { User } from '../User.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: User[]
  usersPaginatedList: PaginatedList<User> ;
  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initialGetUsers();
    
  }
  initialGetUsers(){
    this.sortOrder = "";
    this.searchString = "";
    this.getUsers(0,0);
  }
  getUsers(pageNumber, pageSize){
    this.userService.getUsers(pageNumber, pageSize, this.sortOrder, this.searchString).subscribe(
      {
          next: (response) => {
              console.log(response);
              this.usersPaginatedList = response;
              console.log(this.usersPaginatedList);
              this.users = response.items;
          }
      }
    );
  }
  ascOrder=true;
  sortOrder
  searchString: string;
  onNextPage(){
    this.getUsers(this.usersPaginatedList.nextPage, this.usersPaginatedList.pageSize);
  }
  onPrevPage(){
    this.getUsers(this.usersPaginatedList.previousPage, this.usersPaginatedList.pageSize);
  }
  onEdit(id:number){
    this.router.navigate([id,"edit"],{relativeTo: this.route});
  }
  onDelete(id:number){
    let confirmation = confirm("Are you sure you want to delete this user?");
    if(confirmation)
    {
      this.userService.deleteUser(id).subscribe({
        next:(response) =>{
          this.initialGetUsers();
        },
        error:(error) => {
          console.log(error);
        }
      })
    }
  }
  onAssign(id:number){
    this.router.navigate([id,"permissions"],{relativeTo: this.route});
  }
  onSort(field:string){
    this.ascOrder = !this.ascOrder;
    this.sortOrder = field + (this.ascOrder ? "Asc" : "Desc");
    console.log(this.sortOrder);

    this.getUsers(this.usersPaginatedList.pageIndex, this.usersPaginatedList.pageSize)
  }
  onSearch(){
    this.getUsers(this.usersPaginatedList.pageIndex, this.usersPaginatedList.pageSize);
  }
  onClearSearch(){
    this.searchString = "";
    this.getUsers(0,0);
  }
}
