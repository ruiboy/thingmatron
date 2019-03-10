'use strict';

import {Inject, Injectable} from "angular2/core";
import {Headers, Http, RequestOptions, Response} from "angular2/http";

import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

import {Player} from "./player";

@Injectable()
export class DraftingService {

    constructor(@Inject(Http) private http: Http) {}
    
    getAllPlayers() {
      return this.http.get('/drafting/getAllPlayers').map((res:Response) => res.json());
    }
    
    getSortDraftedBy() {
      return this.http.get('/drafting/getSortDraftedBy').map((res:Response) => res.json());
    }

    getSortAvailable() {
      return this.http.get('/drafting/getSortAvailable').map((res:Response) => res.json());
    }

    getSortWanted() {
      return this.http.get('/drafting/getSortWanted').map((res:Response) => res.json());
    }

    getSortAflClub() {
      return this.http.get('/drafting/getSortAflClub').map((res:Response) => res.json());
    }

    getSortStat(stat) {
      return this.http.get('/drafting/getSortStat/' + stat).map((res:Response) => res.json());
    }

    getByComment(comment) {
        return this.http.get('/drafting/getByComment/' + comment).map((res:Response) => res.json());
    }

    updatePlayer(player: Player) : Observable<Player> {
      let body = JSON.stringify({ player });
      console.log('updating player' + body)
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      return this.http.post('/drafting/updatePlayer', body, options)
        .map(res => <Player> res.json())
        .catch(this.handleError);
    }
    
    private handleError (error: Response) {
      console.error(error);
      return Observable.throw(error.json().error || 'Server error');
    }
}
