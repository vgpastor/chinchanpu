import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ResultsService} from "../results.service";

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  adversary: string;
  player: string;

  gameEnd: boolean;

  hands = [
    'random',
    'rock',
    'paper',
    'scissors'
  ];

  constructor(private resultsService: ResultsService) {
    this.adversary = 'random';
  }

  ngOnInit() {
    // this.adversary = './assets/paper.png';
  }

  /**
   * New launching
   */
  tryAgain(){
    this.adversary = 'random';
    this.gameEnd = false;
    this.showAllHands();
  }

  /**
   * Reset the history
   */
  restart(){
    this.adversary = 'random';
    this.resultsService.reset();
  }

  /**
   * Play a new game with selected hand
   *
   * @param hand
   */
  game(hand){
    if(this.gameEnd){
      return;
    }
    this.gameEnd = true;

    this.player = hand;

    if(hand === 'rock'){
      document.getElementById( 'paper' ).style.display = 'none';
      document.getElementById( 'scissors' ).style.display = 'none';
    }
    if(hand === 'paper'){
      document.getElementById( 'rock' ).style.display = 'none';
      document.getElementById( 'scissors' ).style.display = 'none';
    }
    if(hand === 'scissors'){
      document.getElementById( 'rock' ).style.display = 'none';
      document.getElementById( 'paper' ).style.display = 'none';
    }

    this.getRandomAdversary();

    let winner = this.getWinner();
    console.log(winner);
    this.resultsService.addResult({
      player: this.player,
      enemy: this.adversary,
      winner: winner,
      dateOfGame: new Date()
    });


  }

  private showAllHands(){
    document.getElementById( 'paper' ).style.display = 'block';
    document.getElementById( 'scissors' ).style.display = 'block';
    document.getElementById( 'rock' ).style.display = 'block';
  }

  private getRandomAdversary(){
    const options = this.hands;
    options.forEach((element,index)=>{
      if(element==='random') {options.splice(index,1);}
    });
    console.log(options);
    const random = Math.floor(Math.random() * options.length);
    this.adversary = this.hands[random];
    console.log(this.hands[random]);
  }

  /**
   * Return the winner
   * -1 Adversary Wins
   * 0 Equal
   * 1 Player Wins
   *
   * @private
   * @return number
   */
  private getWinner(){
    if(this.player === this.adversary){
      return 0;
    }
    if(this.player === 'rock' && this.adversary === 'paper'){
      return -1;
    }
    if(this.player === 'rock' && this.adversary === 'scissors'){
      return 1;
    }
    if(this.player === 'paper' && this.adversary === 'rock'){
      return 1;
    }
    if(this.player === 'paper' && this.adversary === 'scissors'){
      return -1;
    }
    if(this.player === 'scissors' && this.adversary === 'paper'){
      return 1;
    }
    if(this.player === 'scissors' && this.adversary === 'rock'){
      return -1;
    }
  }

}
