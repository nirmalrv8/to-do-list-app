import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'To-Do-List-App';
  public isLoading = false;
  public item = '';
  public listOfItems: string[] = [];
  public translatedItems: string[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {}

  addToList(item: string) {
    this.listOfItems.push(item);
  }

  async translateList() {
    this.translatedItems = [];
    for (const item of this.listOfItems) {
      await this.getTranslation(item);
    }
  }

  async getTranslation(query: string) {
    this.isLoading = true;
    const apiKey = 'AIzaSyCv5PW04RpJ_wDP6gu1tzOMZRHFsZeUMN0';
    const sourceLanguage = 'en';
    const targetLanguage = 'de';

    const params = new HttpParams()
      .append('key', apiKey)
      .append('q', query)
      .append('source', sourceLanguage)
      .append('target', targetLanguage);

    const result: any = await firstValueFrom(
      this.http.post('https://translation.googleapis.com/language/translate/v2', null, { params: params } )
    );
    this.isLoading = false;
    this.translatedItems.push(result.data.translations[0].translatedText);
  }
}
