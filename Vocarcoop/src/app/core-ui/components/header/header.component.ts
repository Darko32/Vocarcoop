import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateAppService } from 'src/app/core/services/translate.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  toggleLanguage: boolean = false;
  selectedLanguage: string = '';

  constructor(public translateAppService: TranslateAppService, private router: Router) { }

  ngOnInit(): void {
    this.translateAppService.language$.subscribe(lang => this.selectedLanguage = lang);
  }

  changeLanguage(language: string) {
    this.translateAppService.changeLanguage(language);
    this.toggleLanguage = false;
  }

}
