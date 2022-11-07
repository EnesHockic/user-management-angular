import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  successMessage: string;
  errorMessage:string;
  errors
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.onInfoMessage.subscribe((messageObj)=>{
      if(messageObj.type == 'success'){
        this.successMessage = messageObj.message;
      }else{
        this.errorMessage = messageObj.message;
      }
      setTimeout(()=>{
        this.successMessage = null;
        this.errorMessage = null;
        
      },3000)
    })
    this.userService.onErrorMessage.subscribe((messageObj)=>{
        this.errorMessage = messageObj.message;
        console.log(messageObj.errors);
        this.errors = messageObj.errors;
      setTimeout(()=>{
        this.errorMessage = null;
        
        this.errors = null;
      },3000)
    })
  }

}
