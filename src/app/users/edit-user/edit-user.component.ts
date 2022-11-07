import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../User.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  editForm : FormGroup;
  userId: number;
  user: User;
  editMode = false;
  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) =>{
      this.userId = params["id"];
      this.editMode = params["id"];
      if(this.editMode)
      {

        this.userService.getUserById(this.userId)
        .subscribe({
          next: (response) => {
            this.user = response;
            console.log(this.user);
            this.userService.onInfoMessage.next({type:'success',message:'User successfully updated!'});
            this.initEditForm();
          },
          error: error =>{
            console.log(error);
            
            this.userService.onErrorMessage.next({type:'error',message:error.message, errors: error.error.errors});
          }
        })
      }
        this.initEditForm();
      })
  }

  initEditForm(){
    var firstName ="";
    var lastName ="";
    var email ="";
    var status ="";
    if(this.editMode && this.user){
      firstName = this.user.firstName;
      lastName = this.user.lastName;
      email = this.user.email;
      status = this.user.status;
    }
    this.editForm = new FormGroup({
      "firstName": new FormControl(firstName,Validators.required),
      "lastName": new FormControl(lastName,Validators.required),
      "email": new FormControl(email,[Validators.required, Validators.email]),
      "status": new FormControl(status,Validators.required),
    })
    if(!this.editMode)
    {
      this.editForm.addControl("username", new FormControl(null, [Validators.required,Validators.minLength(5)]));
      this.editForm.addControl("password", new FormControl(null, [Validators.required,,Validators.minLength(5)]));
    }
  }
  onSave(){
    if(this.editMode)
    {
      this.userService.updateUser(this.userId,this.editForm.value);
    } else{
      this.userService.addUser(this.editForm.value);
    }
  }
}
