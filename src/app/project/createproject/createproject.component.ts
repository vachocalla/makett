import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from '../../environment';
import { AuthService } from '../../service/auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
	selector: 'app-createproject',
	templateUrl: './createproject.component.html',
	styleUrls: ['./createproject.component.scss']
})
export class CreateprojectComponent implements OnInit  {
	
	constructor(
		private http: HttpClient,
        public authService: AuthService,
		private router: Router,
	) { }

	// @ViewChild('closeModalProject') closeModalProject: ElementRef

	ngOnInit(): void {
		// recuperar proyectos
		this.recoverProjects();
		this.recoverStructProjects();
	}
	/* -------------------------------- */
	projectList = [];
	recoverProjects(){
        this.http.get<any>(environment.API + '/projects/user' )
            .subscribe({
                next: data => {
                    console.log("contents data");
                    console.log(data);
                    this.projectList = data.data;
                },
                error: error => {
                    console.error('There was an error!', error);
                }
            });
    }
	structProjectList = [];
	recoverStructProjects(){
        this.http.get<any>(environment.API + '/structprojects/user' )
            .subscribe({
                next: data => {
                    console.log("contents data");
                    console.log(data);
                    this.structProjectList = data.data;
                },
                error: error => {
                    console.error('There was an error!', error);
                }
            });
    }

	/* -------------------------------- */
	

	public projects = [];
	public projectSelected = undefined;

	public searchProject = new FormGroup({
		search: new FormControl('', Validators.required),
	});
	public project = new FormGroup({
		name: new FormControl('', Validators.required),
	});

	selectProject( project: any){
		this.projectSelected = project;
	}
	clickCrearProject( ){
		this.projectSelected = undefined;
	}

	onSubmitSearchProject(){
        console.log( this.searchProject.value );
		// localhost:5000/modelprojects/seach?tag=uno

		let params = new HttpParams();

		// Begin assigning parameters
		params = params.append('tag', this.searchProject.value.search);

        this.http.get<any>(environment.API + '/modelprojects/seach', { params: params } )
            .subscribe({
                next: data => {
                    console.log("contents data");
                    console.log(data);
                    this.projects = data.data;
                },
                error: error => {
                    console.error('There was an error!', error);
                }
            });
    }

	onSubmitProject(){
		console.log( this.project.value );
		// verificar si se ha seleccionado un proyecto
		if( this.projectSelected==undefined ){
			return;
		}

        this.http.post<any>(environment.API + '/projects', { 
			...this.project.value, 
			type: this.projectSelected['type'],
			contenido: this.projectSelected['content'],
			modelproject_id: this.projectSelected['id']
		})
		.subscribe({
			next: data => {
				console.log("contents data");
				console.log(data);
				// redirect
				this.router.navigate(['/makedocument/'+data.data.id]);

				let close = document.getElementById("closeModalProject") 
				if( close!=undefined ){
					close.click();
				}
			},
			error: error => {
				console.error('There was an error!', error);
			}
		});
	}
	editProject(pr: any){
		this.router.navigate(['/makedocument/'+pr.id]);
	}
	editStructProject(pr: any){
		this.router.navigate(['/makestructdocument/'+pr.id]);
	}

	/* -------------------------------- */

	public structProjects = [];
	public structProjectSelected = undefined;

	public searchStructProject = new FormGroup({
		search: new FormControl('', Validators.required),
	});
	public structProject = new FormGroup({
		name: new FormControl('', Validators.required),
	});
	
	selectStructProject( project: any){
		this.structProjectSelected = project;
	}
	clickCrearStructProject( ){
		this.structProjectSelected = undefined;
	}
	onSubmitSearchStructProject(){
        console.log( this.searchStructProject.value );
		// localhost:5000/modelprojects/seach?tag=uno

		let params = new HttpParams();

		// Begin assigning parameters
		params = params.append('tag', this.searchStructProject.value.search);

        this.http.get<any>(environment.API + '/modelstructprojects/seach', { params: params } )
            .subscribe({
                next: data => {
                    console.log("==> data");
                    console.log(data);
                    this.structProjects = data.data;
                },
                error: error => {
                    console.error('There was an error!', error);
                }
            });
    }

	onSubmitStructProject(){
		console.log( this.structProject.value );
		// verificar si se ha seleccionado un proyecto
		if( this.structProjectSelected==undefined ){
			return;
		}

		let content = [];
		for ( let i = 0; i < Array.from(this.structProjectSelected['struct'],x => x).length ; i++ ){
			content.push( {
				name: this.structProjectSelected['struct'][i],
				value: '',
				step: i+1,
				type: 'content',
				id: 'csp'+this.structProjectSelected['id']+''+(i+1)
			} );
		}
		
        this.http.post<any>(environment.API + '/structprojects', { 
			...this.structProject.value, 
			type: this.structProjectSelected['type'],
			struct: this.structProjectSelected['struct'],
			modelstructproject_id: this.structProjectSelected['id'],
			content: content
		})
		.subscribe({
			next: data => {
				console.log("contents data");
				console.log(data);
				// redirect
				this.router.navigate(['/makestructdocument/'+data.data.id]);

				let close = document.getElementById("closeModalStructProject") 
				if( close!=undefined ){
					close.click();
				}
			},
			error: error => {
				console.error('There was an error!', error);
			}
		});
	}

}
