import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(
              private router: Router,
              private route: ActivatedRoute
            ){

  }
  public cadastro(){
    this.router.navigate(['/cadastro/']);
  }
}
