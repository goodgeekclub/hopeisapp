import { Component ,OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { AdminUserService } from '../../services/admin_user.service';

@Component({
  selector: 'app-admin-console',
  standalone: true,
  imports: [],
  templateUrl: './admin-console.component.html',
  styleUrl: './admin-console.component.css',
})

export class AdminConsole {
  users: Array<User> =[
    {
      displayName: 'Kullanan',
      email: 'kullananzaza@gmail.com',
      token: '34534535353',
      phoneNumber: '5398309-5830985'
    },
    {
      displayName: 'Art',
      email: 'Art@gmail.com',
      token: '34534535353',
      phoneNumber: '5398309-5830985'
    },
    {
      displayName: 'Kullanan',
      email: 'kullananzaza@gmail.com',
      token: '34534535353',
      phoneNumber: '5398309-5830985'
    },
    {
      displayName: 'Art',
      email: 'Art@gmail.com',
      token: '34534535353',
      phoneNumber: '5398309-5830985'
    },
    {
      displayName: 'Art',
      email: 'Art@gmail.com',
      token: '34534535353',
      phoneNumber: '5398309-5830985'
    },
  ]
  // user: Array<User> = []
  // constructor(private adminUserService : AdminUserService){}
  
  // ngOnInit(): void {
  //   this.loadData();
  // }

  // loadData(): void {
  //   this.adminUserService.getData()
  //     .subscribe(data => {
  //       this.user = data;
  //     });
  // }

}