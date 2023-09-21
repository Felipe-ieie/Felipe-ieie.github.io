import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SegurancaService {

  constructor(
    private http: HttpClient,
  ) { }

  load() {
    let feed = localStorage.getItem('_feed');

    if ( !feed )
      return this.http.get('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fsegurancalegal.com%2Ffeed%3Fpaged%3D1')
        .pipe(
          tap((_feed) => {
            localStorage.setItem('_feed', JSON.stringify(_feed));
          })
        )

    return of(JSON.parse(feed));
  }

}
