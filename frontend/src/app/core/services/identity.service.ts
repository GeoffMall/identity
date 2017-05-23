import {Injectable} from "@angular/core";
import {AuthenticationService} from "./authentication.service";
import {Observable} from "rxjs/Observable";
import {Identity} from "../../models/identity";

@Injectable()
export class IdentityService {

  constructor(private auth: AuthenticationService) {
  }

  public getIdentities(): Observable<Identity[]> {
    return this.auth.get('/identity').map(
      (response: any) => {
        console.log("Successfully returning identities");
        return <Identity[]>response;
      }).catch((error) => {
      console.error("Problem with GET /identity");
      return error;
    });
  }

  public createIdentity(prehash: string, signature: string, pgp: File): Observable<Identity> {
    let formData = new FormData();
    formData.append("pgp", pgp, pgp.name);
    console.log("Prehash: " + prehash);
    console.log("Signature: " + signature);
    return this.auth.uploadFile('/identity', {"addressTime": prehash, "signature": signature}, formData).map(
      (response: any) => {
        return <Identity>response.json();
      }).catch((error) => {
      console.error("Problem with POST /identity");
      return error;
    });
  }
}
