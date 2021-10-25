import { Injectable } from '@angular/core';
import {Result} from "./result";

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  private results: Result[];

  private winnerPlayer: number = 0;
  private winnerTie: number = 0;
  private winnerEnemy: number = 0;

  constructor() {
    this.results = [];
  }

  addResult(result: Result){
    if(result.winner === 1){
      this.winnerPlayer++;
    }
    if(result.winner === 0){
      this.winnerTie++;
    }
    if(result.winner === -1){
      this.winnerEnemy++;
    }

    this.results.push(result);
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
    this.results = [];
    this.winnerEnemy = this.winnerTie = this.winnerPlayer = 0;
  }

}
