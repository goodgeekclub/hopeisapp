import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  // Get a value from local storage
  get(key: string) {
    return localStorage.getItem(key);
  }
  
  // Set a value in local storage
  set(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  // Remove a value from local storage
  remove(key: string): void {
    localStorage.removeItem(key);
  }

  // Clear all items from local storage
  clear(): void {
    localStorage.clear();
  }
}
