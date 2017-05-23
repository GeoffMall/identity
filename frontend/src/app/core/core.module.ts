import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpModule} from "@angular/http";
import {AuthenticationService} from "./services/authentication.service";
import {WindowService} from "./services/window.service";
import {MockDataService} from "./services/mock-data.service";
import {IdentityService} from "./services/identity.service";
import {IpfsService} from "./services/ipfs.service";
import {Web3Service} from "./services/web3.service";

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  providers: [
    AuthenticationService,
    IdentityService,
    IpfsService,
    MockDataService,
    Web3Service,
    WindowService
  ]
})
export class CoreModule { }
