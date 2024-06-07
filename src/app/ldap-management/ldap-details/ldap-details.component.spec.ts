import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LdapDetailsComponent } from './ldap-details.component';

describe('LdapDetailsComponent', () => {
  let component: LdapDetailsComponent;
  let fixture: ComponentFixture<LdapDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LdapDetailsComponent],
    });
    // @ts-ignore
    fixture = TestBed.createComponent(LdapDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
