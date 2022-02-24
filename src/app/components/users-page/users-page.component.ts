import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { User } from 'src/app/dto/User';
import { timer } from 'rxjs';
import { Subscription, Observable } from 'rxjs';
import {ChangeUserRequest} from 'src/app/dto/ChangeUserRequest'

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {

  users: User[] = [];
  userToChange: User | undefined;
  userForm: FormGroup;
  category: number | undefined;
  now: number = 0;
  error = false;
  subscription: Subscription | undefined;
  everyFiveSeconds: Observable<number> = timer(0, 5000);
  selectedStatus: number | undefined;

    statuses = [
        { id: 0, name: 'Подписка активна' },
        { id: 1, name: 'Подписка приостановлена' },
        { id: 2, name: 'Подписка заблокирована' }
    ];

  constructor(private userService: UserService, private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      fname: ['', [Validators.required]],
      name: ['', [Validators.required]],
      mname: ['', [Validators.required]],
      status: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.subscription = this.everyFiveSeconds.subscribe(() => {
      this.now = Date.now();
      this.category = 1;
      this.loadUsers();
    })
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  showAllUsers() {
    this.subscription?.unsubscribe();
    this.users = [];
    this.subscription = this.everyFiveSeconds.subscribe(() => {
      this.now = Date.now();
      this.category = 1;
      this.loadUsers();
    })
  }

  showBlockedUsers() {
    this.subscription?.unsubscribe();
    this.users = [];
    this.subscription = this.everyFiveSeconds.subscribe(() => {
      this.now = Date.now();
      this.category = 2;
      this.loadBlockedUsers();
    })
  }

  showActiveUsers() {
    this.subscription?.unsubscribe();
    this.users = [];
    this.subscription = this.everyFiveSeconds.subscribe(() => {
      this.now = Date.now();
      this.category = 3;
      this.loadActiveUsers();
    })
  }

  loadUsers() {
    this.userService.getUsers().subscribe({
      next: data => {
        let temp = [];
        for (let user of data) {
          if (temp.length === 0) {
            temp.push(user);
          } else {
            for (let i = 0; i < temp.length; i++) {
              if (user.fname.localeCompare(temp[i].fname) === -1) {
                temp.splice(i,0,user);
                break;
              } else if (user.fname.localeCompare(temp[i].fname) === 0) {
                if (user.name.localeCompare(temp[i].name) === -1) {
                  temp.splice(i,0,user);
                  break;
                } else {
                  continue;
                }
              } else {
                continue;
              }
            }
            temp.push(user);
          }
        }
        this.users = temp;
      },
      error: error => {
        error = true;
        
      }
    });
  }

  loadActiveUsers() {
    this.userService.getActiveUsers().subscribe({
      next: data => {
        let temp = [];
        for (let user of data) {
          if (temp.length === 0) {
            temp.push(user);
          } else {
            for (let i = 0; i < temp.length; i++) {
              if (user.fname.localeCompare(temp[i].fname) === -1) {
                temp.splice(i,0,user);
                break;
              } else if (user.fname.localeCompare(temp[i].fname) === 0) {
                if (user.name.localeCompare(temp[i].name) === -1) {
                  temp.splice(i,0,user);
                  break;
                } else {
                  continue;
                }
              } else {
                continue;
              }
            }
            temp.push(user);
          }
        }
        this.users = temp;
      },
      error: error => {
        error = true;
        
      }
    });
  }

  loadBlockedUsers() {
    this.userService.getBlockedUsers().subscribe({
      next: data => {
        let temp = [];
        for (let user of data) {
          if (temp.length === 0) {
            temp.push(user);
          } else {
            for (let i = 0; i < temp.length; i++) {
              if (user.fname.localeCompare(temp[i].fname) === -1) {
                temp.splice(i,0,user);
                break;
              } else if (user.fname.localeCompare(temp[i].fname) === 0) {
                if (user.name.localeCompare(temp[i].name) === -1) {
                  temp.splice(i,0,user);
                  break;
                } else {
                  continue;
                }
              } else {
                continue;
              }
            }
            temp.push(user);
          }
        }
        this.users = temp;
      },
      error: error => {
        error = true;
        
      }
    });
  }

  changeUser(user: User) {
    this.subscription?.unsubscribe();
    this.userToChange = user;
    this.userForm = this.formBuilder.group({
      fname: [user.fname, [Validators.required]],
      name: [user.name, [Validators.required]],
      mname: [user.mname, [Validators.required]],
      status: [user.status, [Validators.required]]
    });
  }

  sendUserChangeRequest() {
    console.log(this.userForm);
    const id = this.userToChange?.id;
    if (this.userForm.valid) {
      console.log('userForm is valid');
      const userRequest: ChangeUserRequest = new ChangeUserRequest(
        this.userForm.controls['name'].value, this.userForm.controls['fname'].value, this.userForm.controls['mname'].value,
        this.userForm.controls['status'].value);
        console.log(userRequest);
        this.userService.change(userRequest, id).subscribe(
          data  => {
            this.error = false;
            console.log(data);
            this.cancelPopup();
          },
          error => {
            this.error = true;
            console.log('Invalid');
          }
        );
    } else {
      console.log('Invalid form');
    }
  }

  cancelPopup() {
    this.userForm.reset();
    this.userToChange = undefined;
    this.subscription = this.everyFiveSeconds.subscribe(() => {
      this.now = Date.now();
      if (this.category === 1) {
        this.loadUsers()
      } else if (this.category === 2) {
        this.loadBlockedUsers();
      } else if (this.category === 3) {
        this.loadActiveUsers();
      }
    })
  }

  getLastUpdate(date: Date) {
    let time = (this.now - new Date(date).getTime());
    console.log(time);
    time > 0 ? time = time : time = -time;
    if (time >= 3600000)
      return Math.round(time/3600000);
    if (time >= 60000)
      return Math.round(time/60000);
    else
      return Math.round(time/1000);
  }

  getLastUpdateString(date: Date) {
    let time = (this.now - new Date(date).getTime());
    if (time >= 3600000)
      return 'час(а/ов)';
    if (time >= 60000)
      return 'минут(у/ы)';
    else
      return 'секунд(у/ы)';
  }

  getStatus(status: number) {
    if (status === 0) {
      return 'активна';
    }
    else if (status === 1) {
      return 'приостановлена';
    }
    else {
      return 'заблокирована';
    }
  }

  round(balance: number) {
    return Math.round(balance);
  }

}
