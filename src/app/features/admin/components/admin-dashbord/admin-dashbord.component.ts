import { Component, inject, OnInit, runInInjectionContext } from '@angular/core';
import { Store } from '@ngrx/store';
import { getallUsers, logoutUser } from '../../../auth/states/action';
import { selectUser } from '../../../auth/states/selector';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashbord',
  imports: [CommonModule],
  templateUrl: './admin-dashbord.component.html',
  styleUrl: './admin-dashbord.component.css'
})
export class AdminDashbordComponent implements OnInit {
  store$ = inject(Store)
  users$ = this.store$.select(selectUser)
  route= inject(Router)

  ngOnInit(): void {
    console.log("hooks woks in admn dashbord")
    this.store$.dispatch(getallUsers())
    
  }

  logOutAdmin(){
    console.log("function works")
    this.store$.dispatch(logoutUser())
    this.route.navigate(['/admin/login'])
  }
}
