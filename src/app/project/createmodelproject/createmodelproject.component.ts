import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment }from '../../environment';
import { AuthService }from '../../service/auth.service';

@Component({
	selector: 'app-createmodelproject',
	templateUrl: './createmodelproject.component.html',
	styleUrls: ['./createmodelproject.component.scss']
})
export class CreatemodelprojectComponent implements OnInit {

	constructor(
		private http: HttpClient,
		public authService: AuthService
	) { }

	ngOnInit(): void {
	}

	public project = new FormGroup({
		name: new FormControl('', Validators.required),
		type: new FormControl('', Validators.required),
		tags: new FormControl('', Validators.required),
		content: new FormControl('', Validators.required),
	});

	/* ------------------------------------------------------------------ */

	htmlContentCrearModeloProyecto = '';
	editorConfigCrearModeloProyecto: AngularEditorConfig = {
		editable: true,
		spellcheck: true,
		height: 'auto',
		minHeight: '0',
		maxHeight: '400px',
		width: 'auto',
		minWidth: '0',
		translate: 'yes',
		enableToolbar: true,
		showToolbar: true,
		placeholder: 'Ingresar contenido del Proyecto AQUI!!!',
		defaultParagraphSeparator: '',
		defaultFontName: '',
		defaultFontSize: '',
		fonts: [
			{ class: 'arial', name: 'Arial' },
			{ class: 'times-new-roman', name: 'Times New Roman' },
			{ class: 'calibri', name: 'Calibri' },
			{ class: 'comic-sans-ms', name: 'Comic Sans MS' }
		],
		customClasses: [
			{
				name: 'quote',
				class: 'quote',
			},
			{
				name: 'redText',
				class: 'redText'
			},
			{
				name: 'titleText',
				class: 'titleText',
				tag: 'h1',
			},
		],
		uploadUrl: 'v1/image',
		//upload: (file: File) => { ... }
		//uploadWithCredentials: false,
		outline: true,
		sanitize: true,
		toolbarPosition: 'top',
		//toolbarHiddenButtons: [
		//  ['bold', 'italic'],
		//  ['fontSize']
		//]
		rawPaste: true
	};

	/* ----------------------------------------------- */	

	//items = [{ value: 'Angular', display: 'Angular' }, { value: 'React', display: 'React' }];
	autocomplete = [
		/* { display: 'Pizza', value: 1 },
		{ display: 'Pasta', value: 2 },
		{ display: 'Parmesan', value: 3 }, */
	];

	onSubmit(){
		console.log( this.project.value );
		this.http.post<any>(environment.API+'/modelprojects', this.project.value )
        .subscribe({
			next: data => {
			  console.log("modelprojects data");
			  console.log(data);
			  // notificacion
			  this.authService.dashboardStatus = 0;
			},
			error: error => {
				console.error('There was an error!', error);
			}
		});
	}

}
