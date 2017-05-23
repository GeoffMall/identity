import { Injectable } from '@angular/core';
import {AuthenticationService} from "./authentication.service";
import {SwarmPeer} from "../../models/swarm-peer";
import {Observable} from "rxjs/Observable";

@Injectable()
export class IpfsService {

  constructor(private auth: AuthenticationService) { }

  public getSwarmPeers(): Observable<SwarmPeer[]> {
    return this.auth.get('/5001/api/v0/swarm/peers').map(
      (response: any) => {
        let jsonResponse = response.json();
        if (jsonResponse.length == 0) {
          console.warn("No swarm peers but successful response");
        }
        console.log("Successfully returning all " + jsonResponse.length + " swarm peers");
        return <SwarmPeer[]>response.json();
      }).catch((error) => {
      // console.error("Problem with GET /identities");
      return error;
    });
  }

}
