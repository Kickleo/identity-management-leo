import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserLdap } from '../../models/user-ldap';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { UsersService } from '../../service/users.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ldap-list',
  templateUrl: './ldap-list.component.html',
  styleUrls: ['./ldap-list.component.css'],
})
export class LdapListComponent implements OnInit {
  displayedColumns: string[] = ['nomComplet', 'mail', 'employeNumero'];
  dataSource = new MatTableDataSource<UserLdap>([]);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | null;
  @Input() unactiveSelected: boolean;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.paginator = null;
    this.unactiveSelected = false;
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data, filter) =>
      this.filterPredicate(data, filter);

    this.getUsers();
  }

  filterPredicate(data: UserLdap, filter: string): boolean {
    return !filter || data.nomComplet.toLowerCase().startsWith(filter);
  }

  applyFilter($event: KeyboardEvent) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private getUsers() {
    this.usersService.getUsers().subscribe((users) => {
      if (this.unactiveSelected) {
        this.dataSource.data = users.filter((user) => {
          !user.active;
        });
      } else {
        this.dataSource.data = users;
      }
    });
  }

  unactiveChanged($event: MatSlideToggleChange) {
    this.unactiveSelected = $event.checked;
    this.getUsers();
  }

  edit(login: string) {
    this.snackBar.open("Edition d'un utilisateur", 'X');
    this.router.navigate(['users/', login]).then((e) => {
      if (!e) {
        console.error('Navigation has failed !');
      }
    });
  }

  addUser() {
    this.snackBar.open("Ajout d'un utilisateur", 'X');
    this.router.navigate(['users/add']).then((e) => {
      if (!e) {
        console.log('Navigation has failed !');
      }
    });
  }
}
