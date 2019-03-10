'use strict';

import {Inject, Injectable} from "angular2/core";
import {Http, Response} from "angular2/http";

import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

@Injectable()
export class TeamService {

    constructor(@Inject(Http) private http: Http) {}
    
    getTeam(club) {
        return this.http.get('/drafting/getTeam/' + club).map((res:Response) => res.json());
    }

    private handleError (error: Response) {
      console.error(error);
      return Observable.throw(error.json().error || 'Server error');
    }
}
