import { Component, OnInit } from '@angular/core';
import {Result} from '../result';
import {ResultsService} from '../results.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  constructor(private resultsService: ResultsService) { }

  ngOnInit() {
    this.resultsService.updateResults();
  }

}
