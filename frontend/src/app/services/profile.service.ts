import { Injectable } from '@angular/core';
import { LocalStorageService } from './localstorage.service';

interface Profile {
  user: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private profileKey = 'profile';

  constructor(private storageService: LocalStorageService) {}

  createProfile(userName: string): void {
    const profile: Profile = { user: userName };
    this.storageService.set(this.profileKey, JSON.stringify(profile));
  }

  getProfile(): Profile | null {
    const profileData = this.storageService.get(this.profileKey);
    return profileData ? JSON.parse(profileData) : null;
  }

  updateProfile(profile: Profile): void {
    this.storageService.set(this.profileKey, JSON.stringify(profile));
  }
}
