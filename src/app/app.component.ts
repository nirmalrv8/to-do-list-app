import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'To-Do-List-App';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    const params = new HttpParams()
      .append('key', 'AIzaSyCv5PW04RpJ_wDP6gu1tzOMZRHFsZeUMN0')
      .append('q', 'what is your age')
      .append('source', 'en')
      .append('target', 'de');
    
    this.http.post('https://translation.googleapis.com/language/translate/v2', null, { params: params } )
    .subscribe(result => console.log(result));
  }
}
