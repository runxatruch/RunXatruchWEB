import {MediaMatcher} from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  
  
  mobileQuery: MediaQueryList;


  
 

  fillerNav  = [
    {name: "Nueva ruta", route: " ", icon: "edit_road"},
    {name: "Nueva categoria", route: "category", icon: "add_moderator"},
    {name: "Nueva Competencia", route: " ", icon: "emoji_events"}, 
    {name: "Historial", route: " ", icon: "emoji_flags"},
    {name: "Usuarios", route: " ", icon: "account_circle"},
    {name: "Patrocinadores", route: " ", icon: "badge"},
    {name: "Ganadores", route: " ", icon: "military_tech"},
    {name: "Fechas Proximas", route: " ", icon: "today"},
  ]
   
  fillerContent = Array.from({length: 50}, () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);

  private _mobileQueryListener: () => void;

  constructor( 
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,private router: Router,private authService: AuthService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  

  ngOnInit(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);

  }


  logout(){
    this.authService.logout();
    this.router.navigate(['/landing'])
  }

  shouldRun = true;



}

