import { Component, OnInit, Input } from '@angular/core';
import { ArticlesService } from '../services/articles/articles.service';
import { Article } from '../classes/Article.class';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  
  @Input() article: Article;
  image: string;
  date: string;

  constructor(private articlesService: ArticlesService) { }

  ngOnInit() {
    this.image = this.articlesService.getWebUrl() + this.article.image;
    this.date = this.article.date.toLocaleDateString();
  }

}
