import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { of } from 'rxjs';

import { environment }from '../../environment';
import { AuthService }from '../../service/auth.service';

// import { filter } from 'rxjs/operators';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/operator/filter';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

	/* form = new FormBuilder().group({
		chips: [['chip'], []]
	}); */
	
	/* 0 dashboard
	10 create modelproject */
	//public status = 0; 
	env = environment;

	constructor(
		private sanitizer: DomSanitizer,
		private http: HttpClient,
		public authService: AuthService
	) {
	}
	
	ngOnInit(): void {
		console.log("----------------------------");
		
		console.log(this.authService.getCurrentUser());
		
	}

	back(){
		this.authService.dashboardStatus = 0;
	}
	createProject(){
		this.authService.dashboardStatus = this.env.project.create;
	}
	createContent(){
		this.authService.dashboardStatus = this.env.content.create;
	}
	createModelProject(){
		this.authService.dashboardStatus = this.env.modelproject.create;
	}
	createModelContent(){
		this.authService.dashboardStatus = this.env.modelcontent.create;
	}
	createStructProject(){
		this.authService.dashboardStatus = this.env.structuproject.create;
	}
	
	

}
