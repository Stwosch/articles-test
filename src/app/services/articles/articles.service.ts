import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import filterByDateParameters from './../../filterByDateParameters';
import { Article } from '../../classes/Article.class';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class ArticlesService {

  constructor(private http: Http) {
    this._articlesStream = new Subject();
  }

  private _webUrl: string = 'http://www.nytimes.com/';
  private _apiUrl: string = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?';
  private _apiKey: string = 'b128c537554c4e92b61edbb61acc1158';
  private _articlesStream: Subject<Article[]>;

  private _getFilterByDateParameters(parameters): string {
    
    let url: string = "";

    for(const key in parameters) {

      const parameterName: string =  this._findFilterByDateParameter(key);
      url += `&${parameterName}=${parameters[key]}`;
    }

    return url;
  }

  private _findFilterByDateParameter(key: string): string {
      
      const foundParameter = filterByDateParameters.find((filterParameter: { key: string, parameterName: string }) => filterParameter.key === key);
      return foundParameter.parameterName;
  }

  private _findBiggestImage(imageArr) {

    const index = imageArr.reduce((maxIndex, currentEle, currentIndex, arr) => currentEle.width > arr[maxIndex].width ? currentIndex : maxIndex, 0);
    return imageArr[index].url;
  }

  private _createArticles(data): Article[] {
    
    return data.map(item => {
      const image = item.multimedia[0] ? this._findBiggestImage(item.multimedia) : false;
      return new Article(item._id, item.web_url, item.headline.main, item.snippet, new Date(item.pub_date), item.byline.original, image);
    });
  }

  private _handleResponse(response: Response): Article[] {
    
    const data = response.json();

    if(data.status !== "OK") {
      throw new Error(data.message);
    }

    return this._createArticles(data.response.docs);
  }

  public getWebUrl(): string {
    return this._webUrl;
  }

  public getFilledUrl(): string {
    return this._apiUrl + 'api-key=' + this._apiKey;
  }

  public getFilterByDateUrl(parameters): string { 

    const url: string = this.getFilledUrl();
    
    return url + this._getFilterByDateParameters(parameters);
  }

  public getArticles(url: string) {

      this.http.get(url)
        .map((response: Response) => this._handleResponse(response))
        .subscribe((articles: Article[]) => {
  
          this._articlesStream.next(articles);
        });
  }

  public getArticlesStream(): Observable<Article[]> {
    return Observable
      .from(this._articlesStream);
  }

}
