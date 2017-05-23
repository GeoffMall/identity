import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "../material/material.module";
import {SwarmPeersComponent} from "./swarm-peers/swarm-peers.component";
import {FormsModule} from "@angular/forms";
import {SearchIdentityComponent} from "./search-identity/search-identity.component";
import {HighlightSearchDirective} from "./highlight-search.directive";
import {InputIdentityComponent} from "./input-identity/input-identity.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
  ],
  declarations: [
    SwarmPeersComponent,
    SearchIdentityComponent,
    InputIdentityComponent,
    HighlightSearchDirective
  ],
  exports: [
    SwarmPeersComponent,
    SearchIdentityComponent,
    InputIdentityComponent,
    HighlightSearchDirective
  ]
})
export class SharedModule { }
