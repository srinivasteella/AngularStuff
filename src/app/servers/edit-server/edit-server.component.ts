import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CanComponentDeactivate } from './can-deactivate';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changeSaved = false;
  constructor(private serversService: ServersService, private activeroute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activeroute.queryParams.subscribe(
    (queryParams: Params) => {
      this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
    }
    );
    const id = this.activeroute.snapshot.params['id'];
    console.log(id);
    this.server = this.serversService.getServer(id);
    console.log(this.server);

    // this.activeroute.queryParams.subscribe(
    //   (queryparams: Params) => {
    //   }
    // );
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changeSaved = true;
    this.router.navigate(['../'], {relativeTo: this.activeroute});
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
        if (!this.allowEdit === true) {
          return true;
        }

        if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changeSaved) {
            confirm('do you wish to continue?');
        } else {
          return true;
        }
  }

}
