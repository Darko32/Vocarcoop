import { DOCUMENT } from '@angular/common';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TranslateAppService {

  language$ = new BehaviorSubject('en');
  homeSelProductCategory = '';
  cacheProducts: any = [];
  cacheNews: any = [];
  apiURL = environment.apiUrl;

  constructor(private router: Router, private activeRoute: ActivatedRoute, private titleService: Title,
    private translate: TranslateService, @Inject(DOCUMENT) private document: Document) {

    translate.addLangs(['en', 'mk']);
    this.language$.subscribe(value => {
      translate.use(value);
    });
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.document.documentElement.lang = event.lang;
      translate.setDefaultLang(event.lang);
    })

    this.router.events.subscribe(event => {

      if (event instanceof NavigationStart) {

        // set correct lang from url on reloading in new tab
        if (event.url.startsWith('/en')) {
          this.language$.next('en');
          this.translate.use('en');
        } else if (event.url.startsWith('/mk')) {
          this.language$.next('mk');
          this.translate.use('mk');
        }

        // set titles
        let incomingUrl = event.url.substring(1);

      }
    })
    }
  
    changeLanguage(lang: string) {
      let currentLang = this.language$.getValue();
      let newLang = lang;
  
  
      this.language$.next(lang);
      this.translate.use(lang);
  
      //clear products cache
      this.cacheProducts = [];
  
  
      let langTranslation;
      let getByValue = false;
      if (newLang === 'en') {
        langTranslation = currentLang;
        getByValue = true;
      } else {
        langTranslation = newLang;
      }
  
      this.translate.getTranslation(langTranslation).subscribe(translations => {
  
        let normalFlow = true;
  
  
        if (normalFlow) {
  
          let urlForTranslate = this.router.url.substring(1);
  
          let translatedRoute;
  
          if (getByValue) {
            translatedRoute = this.getKeyByValue(translations.routes, urlForTranslate);
          } else {
            translatedRoute = translations.routes[urlForTranslate];
  
          }
  
          // special case for routes with anchor #
          let urls = translatedRoute.split('#');
  
          if (urls && urls.length===1 && translatedRoute) {
            this.router.navigate([translatedRoute]);
          } else if (urls && urls.length===2 && translatedRoute) {
            this.router.navigate([urls[0]],{ fragment: urls[1] });
          }
  
        }
  
  
      })
  
  
  
    }

    getKeyByValue(object: any, value: any) {
    return Object.keys(object).find(key => object[key] === value);
  }

  }

