import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Result} from './result';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  private results: Result[];

  private result: Result;

  private winnerPlayer: number = 0;
  private winnerTie: number = 0;
  private winnerEnemy: number = 0;

  constructor(private http: HttpClient) {
    this.results = [];
  }

  public updateResults(){
    this.http
      .get<Result[]>(environment.server+'/history',{ withCredentials: true })
      .pipe(catchError(this.handleError))
      .subscribe(results => {
        console.log('results',results);
        this.winnerEnemy = this.winnerTie = this.winnerPlayer = 0;
        results.forEach( (result) => {
          if (result.winner === 1) {
            this.winnerPlayer++;
          }
          if (result.winner === 0) {
            this.winnerTie++;
          }
          if (result.winner === -1) {
            this.winnerEnemy++;
          }
        });
        this.results = results.reverse();
      });
  }

  public generate(player): Promise<Result>{
    const post = {
      player
    };
    post.player = player;

    return this.http.post<Result>(environment.server+'/generate', post,{ withCredentials: true })
      .pipe(catchError(this.handleError))
      .toPromise()
      .then(result => {
        if (result.winner === 1) {
          this.winnerPlayer++;
        }
        if (result.winner === 0) {
          this.winnerTie++;
        }
        if (result.winner === -1) {
          this.winnerEnemy++;
        }
        this.updateResults();
        return result;
      })
      ;
  }

  getResults(){
    return this.results;
  }

  getWinnerPlayer(){
    return this.winnerPlayer;
  }
  getWinnerTie(){
    return this.winnerTie;
  }
  getWinnerEnemy(){
    return this.winnerEnemy;
  }

  reset(){
    this.http.delete(environment.server+'/history',{ withCredentials: true }).toPromise().then(x => {this.updateResults();});
  }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }

}
