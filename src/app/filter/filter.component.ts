import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ArticlesService } from '../services/articles/articles.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})

export class FilterComponent implements OnInit {
  
  filterByDateForm: FormGroup;
  filterError: string;

  constructor(private fb: FormBuilder,
              private articlesService: ArticlesService) { 

    this.filterByDateForm = fb.group({
      'from': new FormControl(),
      'to': new FormControl(),
    });

    this.filterError = "";
  }

  getValidFilterByDate(data: { from, to }) {

    const result = {};

    for(const key in data) {
      
      if(data[key]) {
        result[key] = data[key].replace('-', "").replace('-', "");
      }
    }

    return result;
  }

  checkFilterByDateIsEmpty(data): boolean {
    return Object.keys(data).length === 0 && data.constructor === Object;
  }

  checkFilterByDateValidDate(data): boolean {
    return data.from && data.to && data.to < data.from;
  }

  showErrorFilterByDateIsEmpty() {
    this.filterError = "At least one field must be filled";
  }

  showErrorFilterByDateValidDate() {
    this.filterError = "Date 'FROM' can't be older than 'TO'";
  }

  filterByDate() {

    const filterByDateParameters = this.getValidFilterByDate(this.filterByDateForm.value);

    switch(true) {
      
      case this.checkFilterByDateIsEmpty(filterByDateParameters):
        this.showErrorFilterByDateIsEmpty();
      break;

      case this.checkFilterByDateValidDate(filterByDateParameters):
        this.showErrorFilterByDateValidDate();
      break;

      default: 
        const url = this.articlesService.getFilterByDateUrl(filterByDateParameters);
        this.articlesService.getArticles(url);
    }

  }

  ngOnInit() {
    this.articlesService.getArticlesStream()
      .subscribe(() => this.filterError = "");
  }

}
