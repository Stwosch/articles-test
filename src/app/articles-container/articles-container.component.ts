import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../services/articles/articles.service';
import { Article } from '../classes/Article.class';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-articles-container',
  templateUrl: './articles-container.component.html',
  styleUrls: ['./articles-container.component.css']
})
export class ArticlesContainerComponent implements OnInit {

  constructor(private articlesService: ArticlesService) { }

  articles: Observable<Article[]>;
  
  ngOnInit() {
    const apiUrl = this.articlesService.getFilledUrl();
    this.articles = this.articlesService.getArticlesStream();
    this.articlesService.getArticles(apiUrl);
  }

}
