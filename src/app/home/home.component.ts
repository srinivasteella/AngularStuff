import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private actroute: ActivatedRoute, private authservice: AuthService) { }

  ngOnInit() {
  }

  onLoadServer(id: number)  {
    this.router.navigate(['/servers', id, 'edit'], {queryParams: {allowEdit: '1'}, fragment: 'loading'});

    //this.router.navigate(['/servers'], {relativeTo: this.actroute});

      }

      onLogin() {
      this.authservice.login();
      }

      onLogout() {
      this.authservice.logoff();
      }

}
