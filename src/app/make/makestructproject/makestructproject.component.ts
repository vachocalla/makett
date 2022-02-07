import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { environment } from '../../environment';
import Stepper from 'bs-stepper'
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { asBlob } from 'html-docx-js-typescript';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-makestructproject',
    templateUrl: './makestructproject.component.html',
    styleUrls: ['./makestructproject.component.scss']
})
export class MakestructprojectComponent implements OnInit {

    public stepper1Node: any;
    public stepper1: any;

    interval: any;
    intervalLoad: any;
    structProjectLoadedOk= false;
    structProjectLoaded = {
        id: '',
        content: [
            {
                "id": "dsadas",
                "name": "",
                "step": 1,
                "type": "",
                "value": ""
            }
        ]
    };

    

    constructor(
        private http: HttpClient,
        private _Activatedroute:ActivatedRoute,
    ) { }

    ngOnInit(): void {
        this.structProjectLoadedOk= false;
        console.log("this._Activatedroute.snapshot.paramMap.get('id')");
        const id = this._Activatedroute.snapshot.paramMap.get("id")
        console.log(id);
        this.http.get<any>(environment.API + '/structprojects/'+id )
            .subscribe({
                next: data => {
                    console.log("contents data");
                    console.log(data);
                    this.structProjectLoaded = data.data;
                    this.structProjectLoadedOk = true;
                    
                    this.htmlContentMSP = this.structProjectLoaded['content'][0]['value'];

                    this.intervalLoad = setInterval(() => {
                        this.stepper1Node = document.getElementById('stepper1')
                        //-let stepper = document.querySelector('.bs-stepper')
                        if( this.stepper1Node != undefined ){
                            this.stepper1 = new Stepper(this.stepper1Node)
                        }    
                        
                        clearInterval(this.intervalLoad);
                    },2000);

                    this.interval = setInterval(() => {
                        console.log("gg");
                        
                        /* if( this.projectLoaded.contenido!=this.htmlContent ){
                            // actualizar en server
                            this.actualizarContenido();
                        }     */
                        this.actualizarContenido();
                    },10000);
                },
                error: error => {
                    console.error('There was an error!', error);
                }
            });
    }
    actualizarContenido(){
        /* this.structProjectLoaded.contenido = document.getElementById('editor1')?.
        getElementsByTagName("div")[0]
        .getElementsByClassName("angular-editor-textarea")[0].innerHTML; */

        this.http.put<any>(environment.API + '/structprojects/'+this.structProjectLoaded['id'], this.structProjectLoaded )
		.subscribe({
			next: data => {
				console.log("Actualizado");
				console.log(data);
				// redirect
			},
			error: error => {
				console.error('No se pudo actualizar!', error);
			}
		});
    }

    stepperNext( s: any, i: any ){
        console.log("gg1");
        /* var x = document.getElementById('editor1')?.
            getElementsByTagName("div")[0]
            .getElementsByClassName("angular-editor-textarea")[0].innerHTML; */
        
        /* const text = document.querySelectorAll('angular-editor[ng-reflect-id="makeStructProjectCSP'+s['step']+'"]')[0].
        getElementsByTagName("div")[0]
        .getElementsByClassName("angular-editor-textarea")[0].innerHTML; */
        const text = document.getElementById('makeStructProjectCSPdiv'+s['step'])?.
        getElementsByTagName("angular-editor")[0].
        getElementsByTagName("div")[0]
        .getElementsByClassName("angular-editor-textarea")[0].innerHTML;
        
        s['value'] = text;
        
        this.htmlContentMSP = this.structProjectLoaded['content'][i+1]['value'];
        
        this.stepper1.next();
    }
    stepperPrevious( s: any, i: any ){
        console.log("gg2");
        /* const text = document.querySelectorAll('angular-editor[ng-reflect-id="makeStructProjectCSP'+s['step']+'"]')[0].
        getElementsByTagName("div")[0]
        .getElementsByClassName("angular-editor-textarea")[0].innerHTML; */

        const text = document.getElementById('makeStructProjectCSPdiv'+s['step'])?.
        getElementsByTagName("angular-editor")[0].
        getElementsByTagName("div")[0]
        .getElementsByClassName("angular-editor-textarea")[0].innerHTML;
        
        s['value'] = text;
        
        this.htmlContentMSP = this.structProjectLoaded['content'][i-1]['value'];

        this.stepper1.previous();
    }

    /* ------------------------------------------------------- */
    resultadosBusqueda = [];

    public searchContent = new FormGroup({
		search: new FormControl('', Validators.required),
	});

    onSubmitSearchContent(){
        console.log( this.searchContent.value );
		// localhost:5000/modelprojects/seach?tag=uno

		let params = new HttpParams();

		// Begin assigning parameters
		params = params.append('tag', this.searchContent.value.search);

        this.http.get<any>(environment.API + '/modelcontents/seach', { params: params } )
            .subscribe({
                next: data => {
                    console.log("contents data");
                    console.log(data);
                    this.resultadosBusqueda = data.data;
                },
                error: error => {
                    console.error('There was an error!', error);
                }
            });
    } 

    allowDrop(e: any) {
        //--console.log("allowDrop");
        e.preventDefault();
    }
    drag(ev: any) {
        //--console.log("drag Ini");
        //--console.log(ev.target.innerHTML);
        var s = ev.target.innerHTML;
        //ev.dataTransfer.setData('text', ev.target.id);
        ev.dataTransfer.setData("text/html", s);
        ev.dataTransfer.setData("text/plain", s);
        console.log(ev.target.id);
        //--console.log("drag Fin");

        //t1 = ev.target.inner	HTML;
        /*console.log("drag Ini");
        console.log(ev.target.innerHTML);
            //ev.dataTransfer.setData('text', ev.target.id);
        ev.dataTransfer.setData("text", ev.target.innerHTML	);
            console.log(ev.target.id);
        console.log("drag Fin");*/
    }

    drop(e: any) {
        console.log("drop");
        e.preventDefault();
        const data = e.dataTransfer.getData('text');
        e.target.appendChild(document.getElementById(data));
    }

    owndrop(e: any) {
        console.log("owndrop");
        e.preventDefault();
        //console.log( e.dataTransfer.getData('text') );
        const data = e.dataTransfer.getData('text');
        //--e.target.appendChild( data ); 
        //e.target.appendChild(document.getElementById(data)); 
        console.log(e);
        console.log(e.target);
        e.target.appendChild(data);
    }
    ownallowDrop(e: any) {
        console.log("allowDrop");
        e.preventDefault();
    }

    generarDocX() {
        var x = document.getElementById('editor1')?.
            getElementsByTagName("div")[0]
            .getElementsByClassName("angular-editor-textarea")[0].innerHTML;
        console.log(x);
    }
    async generarDoc() {
        //console.log(buf.toString());
        ///var x = this.htmlContent;
        let x = '';
        for ( let i = 0; i < Array.from(this.structProjectLoaded['content'],x => x).length ; i++ ){
            x = x + this.structProjectLoaded['content'][i]['value'];
		}
        /* var x = document.getElementById('editor1')?.
            getElementsByTagName("div")[0]
            .getElementsByClassName("angular-editor-textarea")[0].innerHTML; */

        console.log(x);
        

        const htmlString = `<!DOCTYPE html>
		<html lang="en">
		<head>
		<meta charset="UTF-8">
		<title>Document</title>
		</head>
		<body>
		${x}
		</body>
		</html>`;
        console.log(htmlString);

        await asBlob(htmlString).then(data => {
            console.log("htmlString");
            var blob = new Blob([data], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8" });
            saveAs(blob, 'file.docx');
        });
    }

    /* ------------------------------------------------------- */

    htmlContentMSP = '';
    editorConfigMSP: AngularEditorConfig = {
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

    /* ------------------------------------------------------- */
    isValidTypeBoolean: boolean = true;
    /* steps = []; */
    /* steps = [
        {
            step: 1,
            name: "email",
            id: 'uno-part'
        },
        {
            step: 2,
            name: "password",
            id: 'dos-part'
        },
        {
            step: 3,
            name: "validate",
            id: 'tres-part'
        },
        {
            step: 4,
            name: "waa",
            id: 'cuatro-part'
        },
        {
            step: 5,
            name: "wee",
            id: 'cinco-part'
        },
        {
            step: 6,
            name: "wooo",
            id: 'seis-part'
        },
        {
            step: 7,
            name: "dsaaa",
            id: 'siete-part'
        },
        {
            step: 8,
            name: "dsfds",
            id: 'ocho-part'
        },
        {
            step: 9,
            name: "dsssswooo",
            id: 'nueve-part'
        }
    ]; */

    

    /* ------------------------------------------------------- */
}
