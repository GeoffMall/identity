import {Component, OnInit} from '@angular/core';
import {SwarmPeer} from "../../models/swarm-peer";
import {IpfsService} from "../../core/services/ipfs.service";
import {MockDataService} from "../../core/services/mock-data.service";

@Component({
  selector: 'app-swarm-peers',
  templateUrl: './swarm-peers.component.html',
})
export class SwarmPeersComponent implements OnInit {
  public swarmPeers: SwarmPeer[];
  public useMockData: boolean;

  constructor(private ipfs: IpfsService,
              private mock: MockDataService) {
  }

  ngOnInit() {
    this.ipfs.getSwarmPeers().subscribe(
      (response) => {
        this.swarmPeers = response;
        this.useMockData = false;
      }, () => {
        this.swarmPeers = this.mock.generateFakePeers();
        this.useMockData = true;
      });
  }

}
