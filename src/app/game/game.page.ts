import { Component, OnInit } from '@angular/core';
import {ResultsService} from '../results.service';

import { Animation, createAnimation } from '@ionic/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  adversary: string;
  player: string;

  gameEnd: boolean;
  animation: Animation;

  constructor(public resultsService: ResultsService) {
    this.adversary = 'random';

    this.animation = createAnimation()
      .addElement(document.querySelector('#adversary2'))
      .duration(500)
      .direction('alternate')
      .iterations(Infinity)
      .keyframes([
        { offset: 0, transform: 'rotate(0deg)', opacity: '1' },
        { offset: 1, transform: 'rotate(180deg)', opacity: '0.8' }
      ]);
  }

  ngOnInit() {
    this.resultsService.updateResults();
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
  async game(hand) {
    if (this.gameEnd) {
      return;
    }
    this.animation.play();
    this.gameEnd = true;

    this.player = hand;

    if (this.player === 'rock') {
      document.getElementById('paper').style.display = 'none';
      document.getElementById('scissors').style.display = 'none';
    }
    if (this.player === 'paper') {
      document.getElementById('rock').style.display = 'none';
      document.getElementById('scissors').style.display = 'none';
    }
    if (this.player === 'scissors') {
      document.getElementById('rock').style.display = 'none';
      document.getElementById('paper').style.display = 'none';
    }

    this.resultsService.generate(this.player).then(result => {
      this.animation.stop();
      this.adversary = result.enemy;
    });

  }

  private showAllHands(){
    document.getElementById( 'paper' ).style.display = 'block';
    document.getElementById( 'scissors' ).style.display = 'block';
    document.getElementById( 'rock' ).style.display = 'block';
  }
}
