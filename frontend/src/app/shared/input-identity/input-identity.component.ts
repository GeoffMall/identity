import {Component, ElementRef, Input, OnInit, ViewChild} from "@angular/core";
import {Web3Service} from "../../core/services/web3.service";
import {AuthenticationService} from "../../core/services/authentication.service";
import {IdentityService} from "../../core/services/identity.service";
import {Identity} from "../../models/identity";


@Component({
  selector: 'app-input-identity',
  templateUrl: './input-identity.component.html',
})
export class InputIdentityComponent implements OnInit {
  @ViewChild('fileInput') inputEl: ElementRef;

  constructor(private web3Service: Web3Service, private identity: IdentityService) { }

  ngOnInit() {
    // console.log('Native window obj', window);
  }

  sign(): void {
    // For Ethereum Address
    let t = new Date();
    let addressTime = this.web3Service.getDefaultAccount();
    addressTime += ":" + t.getMilliseconds();
    // Call web3 for signature
    this.web3Service.sign(addressTime, (error: any, result: any) => {
      // For PGP File Upload
      let inputEl: HTMLInputElement = this.inputEl.nativeElement;
      let fileCount: number = inputEl.files.length;
      if (fileCount > 0) {
        this.identity.createIdentity(addressTime, result, inputEl.files.item(0)).subscribe((identity: Identity) => {
          console.log("Created identity successfully")
        });
      }
    });
  }

}
