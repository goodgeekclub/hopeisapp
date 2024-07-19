import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from './localstorage.service';
import {  Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root',
})


export class AdminUserService {

    constructor(private storageService: LocalStorageService,private http: HttpClient) {}
    private apiUrl = ``; // Replace with your API endpoint


    getData(): Observable<User[]> {
        return this.http.get<User[]>(this.apiUrl);
    }

    postData(data: User): Observable<User> {
        return this.http.post<User>(this.apiUrl, data);
    }

    updateData(id: string, data: User): Observable<User> {
        return this.http.put<User>(`${this.apiUrl}/${id}`, data);
    }

    deleteData(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}