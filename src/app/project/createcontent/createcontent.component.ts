import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environment';
import { AuthService } from '../../service/auth.service';

@Component({
	selector: 'app-createcontent',
	templateUrl: './createcontent.component.html',
	styleUrls: ['./createcontent.component.scss']
})
export class CreatecontentComponent implements OnInit {

	constructor(
		private http: HttpClient,
		public authService: AuthService
	) { }

	ngOnInit(): void {
	}


}
