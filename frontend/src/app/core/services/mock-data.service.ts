import { Injectable } from '@angular/core';
import {Identity} from "../../models/identity";
import {SwarmPeer} from "../../models/swarm-peer";

@Injectable()
export class MockDataService {

  constructor() { }

  public generateFakeIdentities(): Identity[] {
    let FakeIdentity1 = new Identity( 1, '1-1-2000', 'QmNnuksHn2UnDKdD8HDCHfS141rqj6d13ervg2rRLdL4V1', 'bobsmith1@fake.com', '0x85Fc71ECffB0703A650f05263A3C1b0548092f32' );
    let FakeIdentity2 = new Identity( 2, '2-2-2000', 'QmNnuksHn2UnDKdD8HDCHfS141rqj6d13ervg2rRLdL4V2', 'annie2@fake.com', '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe' );
    let FakeIdentity3 = new Identity( 3, '3-3-2000', 'QmNnuksHn2UnDKdD8HDCHfS141rqj6d13ervg2rRLdL4V3', 'bobbyanne3@fake.com', '0x5ef47dd109c02c3264f16efa93a2512b48b0e9e4' );
    let FakeIdentity4 = new Identity( 4, '4-4-2000', 'QmNnuksHn2UnDKdD8HDCHfS141rqj6d13ervg2rRLdL4V4', 'lillydog4@fake.com', '0x649DC0330f27235DCb5835b92711510cB1Ff7e9' );
    let FakeIdentity5 = new Identity( 5, '5-5-2000', 'QmNnuksHn2UnDKdD8HDCHfS141rqj6d13ervg2rRLdL4V5', 'stephaniequalude5@fake.com', '0x5eD8Cee6b63b1c6AFce3AD7c92f4fD7E1B8fAd9F' );
    let FakeIdentity6 = new Identity( 6, '6-6-2000', 'QmNnuksHn2UnDKdD8HDCHfS141rqj6d13ervg2rRLdL4V6', 'chickenitabobita6@fake.com', '0xe16171A65715841DF329a582A5DfFA17f900aC8d' );
    let FakeIdentity7 = new Identity( 7, '7-7-2000', 'QmNnuksHn2UnDKdD8HDCHfS141rqj6d13ervg2rRLdL4V7', 'wrennylaken7@fake.com', '0x7efd7bafbad1817f6c7a2017bd6acbcb634ad058' );
    let FakeIdentity8 = new Identity( 8, '8-8-2000', 'QmNnuksHn2UnDKdD8HDCHfS141rqj6d13ervg2rRLdL4V8', 'puppitylimina8@fake.com', '0x20703ee0ad292415f10c844c90dfa4fd23a47471' );
    let FakeIdentity9 = new Identity( 9, '9-9-2000', 'QmNnuksHn2UnDKdD8HDCHfS141rqj6d13ervg2rRLdL4V9', 'jimminyglick9@fake.com', '0x26ab0917ab1b8dc990bafecb6d2b5f45ae851a1a' );
    let FakeIdentity10 = new Identity( 10, '10-10-2000', 'QmNnuksHn2UnDKdD8HDCHfS141rqj6d13ervg2rRLdL410', 'razzledazzleboyjohn10@fake.com', '0x7D47BcC72D9c7758a3021B0A393af6aa2BE66F58' );
    let FakeIdentity11 = new Identity( 11, '11-11-2000', 'QmNnuksHn2UnDKdD8HDCHfS141rqj6d13ervg2rRLdL411', 'summerstockwren11@fake.com', '0x123f681646d4a755815f9cb19e1acc8565a0c2ac' );
    let FakeIdentity12 = new Identity( 12, '12-12-2000', 'QmNnuksHn2UnDKdD8HDCHfS141rqj6d13ervg2rRLdL412', 'applebotsweetness12@fake.com', '12f7c4c8977a5b9addb52b83e23c9d0f3b89be15' );
    return [
      FakeIdentity1, FakeIdentity2, FakeIdentity3, FakeIdentity4, FakeIdentity5, FakeIdentity6,
      FakeIdentity7, FakeIdentity8, FakeIdentity9, FakeIdentity10, FakeIdentity11, FakeIdentity12
    ];
  }

  public generateFakePeers(): SwarmPeer[] {
    let FakePeer1 = new SwarmPeer('QmNMVHJTSZHTWMWBbmBrQgkA1hZPWYuVJx2DpSGESWW6Kn', '/ip4/51.254.25.16/tcp/4001', '', '', []);
    let FakePeer2 = new SwarmPeer('QmNMVHJTSZHTWMWBbmBrQgkA1hZPWYuVJx2DpSGESWW6Kn', '/ip4/51.254.25.16/tcp/4001', '', '', []);
    let FakePeer3 = new SwarmPeer('QmNMVHJTSZHTWMWBbmBrQgkA1hZPWYuVJx2DpSGESWW6Kn', '/ip4/51.254.25.16/tcp/4001', '', '', []);
    let FakePeer4 = new SwarmPeer('QmNMVHJTSZHTWMWBbmBrQgkA1hZPWYuVJx2DpSGESWW6Kn', '/ip4/51.254.25.16/tcp/4001', '', '', []);
    let FakePeer5 = new SwarmPeer('QmNMVHJTSZHTWMWBbmBrQgkA1hZPWYuVJx2DpSGESWW6Kn', '/ip4/51.254.25.16/tcp/4001', '', '', []);
    return [FakePeer1, FakePeer2, FakePeer3, FakePeer4, FakePeer5];
  }


}
