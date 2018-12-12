import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 
import { User } from '../models/user';
 
@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }
 
    getAll() {
        return this.http.get<User[]>('127.0.0.1:8000/api/usuarios/');
    }
 
    getById(id: number) {
        return this.http.get('127.0.0.1:8000/api/usuarios/' + id);
    }
 
    create(user: User) {
        return this.http.post('127.0.0.1:8000/api/usuarios/registrar/', user);
    }
 
    update(user: User) {
        return this.http.put('127.0.0.1:8000/api/usuarios/' + user.id, user);
    }
 
    delete(id: number) {
        return this.http.delete('127.0.0.1:8000/api/usuarios/' + id);
    }
}
