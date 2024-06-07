import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit {
  @Input() type: string;
  cssClass: string[] = ['alert', 'alert-dismissible', 'fade'];

  constructor() {
    this.type = 'info';
  }

  ngOnInit() {
    let alert = 'alert-info';
    switch (this.type) {
      case 'succes':
        alert = 'alert-succes';
        break;
      case 'danger':
        alert = 'alert-danger';
        break;
      case 'warning':
        alert = 'alert-warning';
        break;
    }
    this.cssClass.push(alert);
  }

  removeAlert() {
    this.cssClass = ['alert-hide'];
  }
}
