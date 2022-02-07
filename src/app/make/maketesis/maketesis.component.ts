// https://openbase.com/js/@kolkov/angular-editor
// https://github.com/kolkov/angular-editor
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { asBlob } from 'html-docx-js-typescript'
import { saveAs } from 'file-saver';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environment';

@Component({
    selector: 'app-maketesis',
    templateUrl: './maketesis.component.html',
    styleUrls: ['./maketesis.component.scss'],
    /* encapsulation: ViewEncapsulation.None, */
})
export class MaketesisComponent implements OnInit {

    interval: any;
    projectLoaded: any;
    htmlContent = '';

    constructor(
        private http: HttpClient,
        private sanitizer: DomSanitizer,
        private _Activatedroute:ActivatedRoute
    ) {
        //this.title = this.sanitizer.bypassSecurityTrustHtml('<p>W3 product information field<br><span style="color:red;">product information introduction</span></p>');
        console.log("created");
        
    }

    ngOnInit(): void {
        console.log("this._Activatedroute.snapshot.paramMap.get('id')");
        const id = this._Activatedroute.snapshot.paramMap.get("id")
        console.log(id);
        this.http.get<any>(environment.API + '/projects/'+id )
            .subscribe({
                next: data => {
                    console.log("contents data");
                    console.log(data);
                    this.projectLoaded = data.data;
                    
                    this.htmlContent = this.projectLoaded.contenido;
                    //this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(this.projectLoaded.contenido);;

                    this.interval = setInterval(() => {
                        console.log("gg");
                        
                        if( this.projectLoaded.contenido!=this.htmlContent ){
                            // actualizar en server
                            this.actualizarContenido();
                        }    
                    },10000)
                },
                error: error => {
                    console.error('There was an error!', error);
                }
            });
    }

    actualizarContenido(){
        this.projectLoaded.contenido = document.getElementById('editor1')?.
        getElementsByTagName("div")[0]
        .getElementsByClassName("angular-editor-textarea")[0].innerHTML;

        this.http.put<any>(environment.API + '/projects/'+this.projectLoaded.id, this.projectLoaded )
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

    /* ------------------------------------------------ */
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

    /* ------------------------------------------------ */

    /* resultadosBusqueda = [
        {
            id: 0,
            name: 'name 1',
            description: this.sanitizer.bypassSecurityTrustHtml('<span style="color:#e74c3c"><strong>adsadsadsa</strong></span>')
        },
        {
            id: 1,
            name: 'name 1',
            description: this.sanitizer.bypassSecurityTrustHtml(' h kj shkhaf hla <p>ds<span style="color:#e74c3c"><strong>adsadsadsada</strong></span></p><p><span style="color:#e74c3c"><strong>sdsadsa</strong></span>asdass</p><p>d</p><p>f</p><p>ds</p><p>fsd</p>fjkdshkfj <strong>hsdk hgdh </strong>dshk l ghdf hgdhg jdh gldkhg jh glsg hdfk hgdfh gldhg dfsh kj shkhaf hla fjkdshkfj <strong>hsdk hgdh </strong>dshk l ghdf hgdhg jdh gldkhg jh glsg hdfk hgdfh gldhg dfsh kj shkhaf hla fjkdshkfj <strong>hsdk hgdh </strong>dshk l ghdf hgdhg jdh gldkhg jh glsg hdfk hgdfh gldhg dfs')
        },
        {
            id: 2,
            name: 'name 2',
            description: this.sanitizer.bypassSecurityTrustHtml(' h kj shkhaf hla fjkdshkfj <strong>hsdk hgdh </strong>dshk l ghdf hgdhg jdh gldkhg jh glsg hdfk hgdfh gldhg dfs')
        },
        {
            id: 3,
            name: 'name 3',
            description: this.sanitizer.bypassSecurityTrustHtml(' h kj shkhaf hla fjkdshkfj <strong>hsdk hgdh </strong>dshk l ghdf hgdhg jdh gldkhg jh glsg hdfk hgdfh gldhg dfs')
        },
        {
            id: 4,
            name: 'name 4',
            description: this.sanitizer.bypassSecurityTrustHtml(' h kj shkhaf hla fjkdshkfj <strong>hsdk hgdh </strong>dshk l ghdf hgdhg jdh gldkhg jh glsg hdfk hgdfh gldhg dfsh kj shkhaf hla fjkdshkfj <strong>hsdk hgdh </strong>dshk l ghdf hgdhg jdh gldkhg jh glsg hdfk hgdfh gldhg dfs')
        },
        {
            id: 5,
            name: 'name 5',
            description: this.sanitizer.bypassSecurityTrustHtml(' h kj shkhaf hla fjkdshkfj hsdk hgdh dshk l ghdf hgdhg jdh gldkhg jh glsg hdfk hgdfh gldhg dh kj shkhaf hla fjkdshkfj <strong>hsdk hgdh </strong>dshk l ghdf hgdhg jdh gldkhg jh glsg hdfk hgdfh gldhg dfsh kj shkhaf hla fjkdshkfj <strong>hsdk hgdh </strong>dshk l ghdf hgdhg jdh gldkhg jh glsg hdfk hgdfh gldhg dfsfs')
        }
    ] */

    oki() {
        console.log("Por tu ");
        this.editorConfig.showToolbar = true;
    }
    okio() {
        console.log("Por tu out	");
        this.editorConfig.showToolbar = false;
    }

    allowDrop(e: any) {
        //--console.log("allowDrop");
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
        var x = document.getElementById('editor1')?.
            getElementsByTagName("div")[0]
            .getElementsByClassName("angular-editor-textarea")[0].innerHTML;

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
            /* var buf = Buffer.from(htmlString);
            console.log("htmlString2");
            var da = buf.toString();
            console.log(da);
            saveAs(da, 'file.docx'); // save as docx file */
        });
        /* asBlob(this.htmlContent).then(data => {
            saveAs(data, 'file.docx') // save as docx file
        }); */
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
    /*drag(ev: any) {
        console.log("Draging");
        ev.dataTransfer.setData("text", ev.target.id);
    }*/


    editorConfig: AngularEditorConfig = {
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
        placeholder: 'Enter text here...',
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


}
