import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectImageurl, selectLoggedInUser, selectToken } from '../../../auth/states/selector';
import { CommonModule } from '@angular/common';
import { fetchUsersDetails, logoutUser, updateProfilePicture } from '../../../auth/states/action';
import { Observable } from 'rxjs';
import { ImageUrlPipe } from '../../../../shared/pipes/image-url.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule,ImageUrlPipe],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent  implements OnInit   {

 private store = inject(Store)
 user$ = this.store.select(selectLoggedInUser)
 imageUrl$: Observable<string | null> = this.store.select(selectImageurl);
 token$ =this.store.select(selectToken)
 route = inject(Router)

selectedFile: File | null = null;
profilePictureUrl: string | null = null;


ngOnInit(): void {
  console.log('ngOnInit triggered - dispatching fetchUsers action');

  this.store.dispatch(fetchUsersDetails()) 

  this.imageUrl$.subscribe((url) => {
    // console.log('Image URL from imageUrl$:', url);
    this.profilePictureUrl = url  
  });
}

onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.selectedFile = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.profilePictureUrl = reader.result as string;
    };
    reader.readAsDataURL(this.selectedFile);
  }
}

uploadProfilePicture(): void {
  console.log("working")
  if (this.selectedFile) {
    this.store.dispatch(updateProfilePicture({ file: this.selectedFile }));
    this.selectedFile = null; 
  }
}

logout(){
  this.store.dispatch(logoutUser());
  this.route.navigate(['/login'])
}


}
