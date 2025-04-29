import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectLoggedInUser } from '../../../auth/states/selector';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

 private store = inject(Store)

 user$ = this.store.select(selectLoggedInUser)

 constructor(){
  this.user$.subscribe((state)=>console.log(state.data.user.name))
 }

}
