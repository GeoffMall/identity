import { Injectable } from '@angular/core';
import {Http, RequestOptions, RequestOptionsArgs, Headers} from '@angular/http';
import {Observable} from "rxjs/Observable";


@Injectable()
export class AuthenticationService {
  public host: string;
  public options : RequestOptions;

  constructor(private http: Http) {
    let url: Array<string> = window.location.href.split("/");
    this.host = url[0] + "//" + url[2];
    if(this.host.indexOf("http://localhost") != -1) {
      this.host = "http://localhost:8082";
      console.log("Found localhost as host, using cross origin requests");
    } else {
      this.host = "";
    }
  }

  public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    url = this.host + url;
    return this.http.get(url, this.options).map(
      (response) => {
        return response.json();
      }).catch((error) => {
      let errJson = error.json();
      if (401 == errJson.status) {
        console.log("Need to log out here");
      }
      return error;
    });
  }

  public post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    url = this.host + url;
    // options.headers.append('Content-Type', 'application/json');
    // this.options.headers.append('Content-Type', 'multipart/form-data');

    return this.http.post(url, body, this.options).map(
      (response) => {
        return response.json();
      }).catch((error) => {
      let errJson = error.json();
      if (401 == errJson.status) {
        console.log("Need to log out here");
      }
      return error;
    });
  }

  public uploadFile(url: string, params: any, formData: FormData): Observable<any> {
    return Observable.create(observer => {
      url = this.host + url;
      let xhr: XMLHttpRequest = new XMLHttpRequest();

      for (let key in params) {
        if (params.hasOwnProperty(key)) {
          if (typeof params[key] == "object") {
            formData.append(key, JSON.stringify(params[key]));
          } else {
            formData.append(key, params[key]);
          }
        }
      }

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            observer.next(JSON.parse(xhr.response));
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
      };

      xhr.open('POST', url, true);

      xhr.send(formData);
    });
  }
}
