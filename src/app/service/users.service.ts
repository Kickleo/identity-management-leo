import { Injectable } from '@angular/core';
import { LDAP_USERS } from '../models/ldap-mock-data';
import { UserLdap } from '../models/user-ldap';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  users: UserLdap[] = LDAP_USERS;

  private usersUrl = 'api/users';
  private httpOptions = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  getUsers(): Observable<UserLdap[]> {
    // return of(this.users);

    return this.http.get<UserLdap[]>(this.usersUrl);
  }

  getUser(/*login: string*/ id: number): Observable<UserLdap> {
    // const user = this.users.find((user) => user.login === login);
    // if (user !== undefined) return of(user);
    //
    // return throwError(() => new Error('Utilisateur non trouvé'));

    return this.http.get<UserLdap>(this.usersUrl + '/' + id);
  }

  addUser(user: UserLdap): Observable<UserLdap> {
    // this.users.push(user);
    // return of(user);

    return this.http.post<UserLdap>(this.usersUrl, user, {
      headers: this.httpOptions,
    });
  }

  updateUser(userToUpdate: UserLdap): Observable<UserLdap> {
    // const user = this.users.find((u) => u.login === userToUpdate.login);
    // if (user) {
    //   user.nom = userToUpdate.nom;
    //   user.prenom = userToUpdate.prenom;
    //   user.nomComplet = user.nom + ' ' + user.prenom;
    //   user.motDePasse = userToUpdate.motDePasse;
    //
    //   return of(userToUpdate);
    // }
    // return throwError(() => new Error('Utilisateur non trouvé'));

    return this.http.put<UserLdap>(
      this.usersUrl + '/' + userToUpdate.id,
      userToUpdate,
      { headers: this.httpOptions },
    );
  }

  deleteUser(id: number): Observable<UserLdap> {
    return this.http.delete<UserLdap>(this.usersUrl + '/' + id, {
      headers: this.httpOptions,
    });
  }
}
