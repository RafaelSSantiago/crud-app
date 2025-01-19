import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Injectable({
  providedIn: 'root',
})
export class IconService {
  constructor(
    public iconReg: MatIconRegistry,
    public sanitizer: DomSanitizer
  ) {}

  createIcons(): void {
    this.iconReg.addSvgIcon(
      'icon-nav-home',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        '/assets/icons/icon-nav-home.svg'
      )
    );

    this.iconReg.addSvgIcon(
      'icon-nav-menu',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        '/assets/icons/icon-nav-menu.svg'
      )
    );

    this.iconReg.addSvgIcon(
      'icon_home',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        '/assets/icons/icon-nav-home.svg'
      )
    );

    this.iconReg.addSvgIcon(
      'icon-nav-menu-primary',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        '/assets/icons/icon-nav-menu-primary.svg'
      )
    );

    	this.iconReg.addSvgIcon(
        'icon-perfil',
        this.sanitizer.bypassSecurityTrustResourceUrl(
          '/assets/icons/icon-perfil.svg'
        )
      );
  }
}
