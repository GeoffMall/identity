import { Injectable } from '@angular/core';

declare let Web3: any;
declare let web3: any;

@Injectable()
export class Web3Service {
  web3: any;

  constructor() {
    if (typeof web3 !== 'undefined') {
      this.web3 = new Web3(web3.currentProvider);
    } else {
      // set the provider you want from Web3.providers
      this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
  }

  public sign(data: string, callback: any): string {
    let hash = this.web3.sha3(data, true);
    console.log("Hash:" + hash);
    return this.web3.eth.sign(this.web3.eth.accounts[0], hash, callback);
  }

  public getDefaultAccount(): string {
    return this.web3.eth.defaultAccount;
  }
}
