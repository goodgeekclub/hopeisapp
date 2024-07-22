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

export class AdminConsole implements OnInit{
  
  users: Array<User> =[
    {
      displayName: 'Kullanan',
      email: 'kullananzaza@gmail.com',
      token: '34534535353',
      phoneNumber: '0649932001'
    },
    {
      displayName: 'Art',
      email: 'Art@gmail.com',
      token: '34534535353',
      phoneNumber: '0649932001'
    },
    {
      displayName: 'Kullanan',
      email: 'NNnam1.privatemail@gmail.com',
      token: '34534535353',
      phoneNumber: '0649932001'
    },
    {
      displayName: 'Kullanan',
      email: 'NNnam1.privatemail@gmail.com',
      token: '34534535353',
      phoneNumber: '0649932001'
    },
    {
      displayName: 'Nay',
      email: 'Araiva@gmail.com',
      token: 'fssffsfsf',
      phoneNumber: '08573829902'
    },
    {
      displayName: 'Kullanan',
      email: 'NNnam1.privatemail@gmail.com',
      token: '34534535353',
      phoneNumber: '0649932001'
    },
    {
      displayName: 'Nay',
      email: 'Araiva@gmail.com',
      token: 'fssffsfsf',
      phoneNumber: '08573829902'
    },
    {
      displayName: 'Kullanan',
      email: 'NNnam1.privatemail@gmail.com',
      token: '34534535353',
      phoneNumber: '0649932001'
    },
    {
      displayName: 'Nay',
      email: 'Araiva@gmail.com',
      token: 'fssffsfsf',
      phoneNumber: '08573829902'
    },{
      displayName: 'Kullanan',
      email: 'NNnam1.privatemail@gmail.com',
      token: '34534535353',
      phoneNumber: '0649932001'
    },
    {
      displayName: 'Nay',
      email: 'Araiva@gmail.com',
      token: 'fssffsfsf',
      phoneNumber: '08573829902'
    },{
      displayName: 'Kullanan',
      email: 'NNnam1.privatemail@gmail.com',
      token: '34534535353',
      phoneNumber: '0649932001'
    },
    {
      displayName: 'Nay',
      email: 'Araiva@gmail.com',
      token: 'fssffsfsf',
      phoneNumber: '08573829902'
    },{
      displayName: 'Kullanan',
      email: 'NNnam1.privatemail@gmail.com',
      token: '34534535353',
      phoneNumber: '0649932001'
    },
    {
      displayName: 'Nay',
      email: 'Araiva@gmail.com',
      token: 'fssffsfsf',
      phoneNumber: '08573829902'
    },{
      displayName: 'Kullanan',
      email: 'NNnam1.privatemail@gmail.com',
      token: '34534535353',
      phoneNumber: '0649932001'
    },
    {
      displayName: 'Nay',
      email: 'Araiva@gmail.com',
      token: 'fssffsfsf',
      phoneNumber: '08573829902'
    },{
      displayName: 'Kullanan',
      email: 'NNnam1.privatemail@gmail.com',
      token: '34534535353',
      phoneNumber: '0649932001'
    },
    {
      displayName: 'Nay',
      email: 'Araiva@gmail.com',
      token: 'fssffsfsf',
      phoneNumber: '08573829902'
    },
    {
      displayName: 'Nay',
      email: 'Araiva@gmail.com',
      token: 'fssffsfsf',
      phoneNumber: '08573829902'
    },
  ]

  currentPage : number = 1;
  pageSize : number = 10;

  filterUsers: Array<User> = this.users;
  pageSizes: Array<number> = [ 5, 10, 20 ]
  
  ngOnInit(): void {
    this.visibleData();
    // this.pageNumber();

  }
  visibleData(){
    let startIndex = (this.currentPage -1)* this.pageSize ;
    let endIndex = startIndex + this.pageSize;
    return this.filterUsers.slice(startIndex, endIndex);
  }

  nextPage(){
    this.currentPage++;
    this.visibleData();
  }

  previousPage(){
    this.currentPage--;
    if(this.currentPage == 0){
      this.currentPage = 1;
    }
    this.visibleData();
  }


  changePage(pageNumber:number){
    this.currentPage = pageNumber;
    this.visibleData();
  }
  filterData(searchTerm:string){
    if (searchTerm) {
      this.filterUsers = this.users.filter(user =>
        Object.values(user).some(val =>
          val.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      this.filterUsers = [...this.users];
    }
    this.visibleData();
  }
  changePageSize(pageSize:any){
    this.pageSize = pageSize;
    this.visibleData();
  }

}
