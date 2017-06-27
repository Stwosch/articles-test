export class Article {
    id: string;
    url: string;
    headline: string;
    snippet: string;
    date: Date;
    author: string;
    image: any;

    constructor(id, url, headline, snippet, date, author, image) {
        this.id = id;
        this.url = url;
        this.headline = headline;
        this.snippet = snippet;
        this.date = date;
        this.author = author;
        this.image = image;
    }
}