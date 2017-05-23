import {Component, OnInit} from '@angular/core';
import {Identity} from "../../models/identity";
import {MockDataService} from "../../core/services/mock-data.service";
import {IdentityService} from "../../core/services/identity.service";



@Component({
  selector: 'app-search-identity',
  templateUrl: './search-identity.component.html',
})
export class SearchIdentityComponent implements OnInit {
  public identities: Identity[];
  public useMockData: boolean;


  constructor(private identity: IdentityService,
              private mock: MockDataService) {

  }
  ngOnInit() {
    this.identity.getIdentities().subscribe(
      (identities) => {
      this.identities = identities;
      this.useMockData = false;
      }, () => {
      this.identities = this.mock.generateFakeIdentities();
      this.useMockData = true;
      // console.warn("Something went wrong, using mock data");
      });
  }

  showListItem(searchString: string, ...inputs: string[]): boolean {
    if (searchString == undefined || searchString == '') {
      return true;
    }
    let aggregateInput = '';
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i] != null && inputs[i] != undefined) {
        aggregateInput += inputs[i] + " ";
      }
    }
    return aggregateInput.toLowerCase().indexOf(searchString.toLowerCase()) != -1;
  }

}
