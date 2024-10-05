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

  /**
   * add item to 'to-do list'
   * @param item 
   */
  addToList(item: string) {
    this.listOfItems.push(item);
    this.item = '';
  }

  /**
   * translate to do list
   */
  async translateList() {
    this.translatedItems = [];
    for (const item of this.listOfItems) {
      const translatedWord = await this.getTranslation(item);
      this.translatedItems.push(translatedWord);
    }
  }

  /**
   * this function will translate the given query to german language and return the string
   * @param query the string to get translated
   */
  async getTranslation(query: string): Promise<string> {
    this.isLoading = true;
    const apiKey = 'get_from_secret_manager';
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
    return result.data.translations[0].translatedText;
  }
}
