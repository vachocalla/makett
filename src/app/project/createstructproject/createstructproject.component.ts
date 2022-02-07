import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environment';
import { AuthService } from '../../service/auth.service';
import {
    CdkDragDrop,
    CdkDragEnter,
    CdkDragMove,
    moveItemInArray,
} from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-createstructproject',
    templateUrl: './createstructproject.component.html',
    styleUrls: ['./createstructproject.component.scss']
})
export class CreatestructprojectComponent implements OnInit {

    constructor(
        private http: HttpClient,
        public authService: AuthService
    ) { }

    ngOnInit(): void {
    }

    public items: Array<number> = [];

    /* --------------------------------------------------- */
    public item = new FormGroup({
        name: new FormControl('', Validators.required),
    });

    public structproject = new FormGroup({
        name: new FormControl('', Validators.required),
        type: new FormControl('', Validators.required),
        tags: new FormControl('', Validators.required),
        //content: new FormControl('', Validators.required),
    });

    autocomplete = [
        /* { display: 'Pizza', value: 1 },
        { display: 'Pasta', value: 2 },
        { display: 'Parmesan', value: 3 }, */
    ];

    onSubmitItem(){
        this.items.push( this.item.value.name );
        this.item.reset();
    }

    onSubmit(){
        console.log( {...this.structproject.value, struct: this.items } );
        this.http.post<any>(environment.API + '/modelstructprojects', {...this.structproject.value, struct: this.items } )
            .subscribe({
                next: data => {
                    console.log("contents data");
                    console.log(data);
                    // notificacion
                    this.authService.dashboardStatus = 0;
                },
                error: error => {
                    console.error('There was an error!', error);
                }
            });
    }
    
    /* --------------------------------------------------- */
    /* --------------------------------------------------- */
    /* --------------------------------------------------- */
    /* --------------------------------------------------- */

    @ViewChild('dropListContainer') dropListContainer?: ElementRef;

    dropListReceiverElement?: HTMLElement;
    dragDropInfo?: {
        dragIndex: number;
        dropIndex: number;
    };

    dragEntered(event: CdkDragEnter<number>) {
        const drag = event.item;
        const dropList = event.container;
        const dragIndex = drag.data;
        const dropIndex = dropList.data;

        this.dragDropInfo = { dragIndex, dropIndex };

        const phContainer = dropList.element.nativeElement;
        const phElement = phContainer.querySelector('.cdk-drag-placeholder');

        if (phElement) {
            phContainer.removeChild(phElement);
            phContainer.parentElement?.insertBefore(phElement, phContainer);

            moveItemInArray(this.items, dragIndex, dropIndex);
        }
    }

    dragMoved(event: CdkDragMove<number>) {
        if (!this.dropListContainer || !this.dragDropInfo) return;

        const placeholderElement =
            this.dropListContainer.nativeElement.querySelector(
                '.cdk-drag-placeholder'
            );

        const receiverElement =
            this.dragDropInfo.dragIndex > this.dragDropInfo.dropIndex
                ? placeholderElement?.nextElementSibling
                : placeholderElement?.previousElementSibling;

        if (!receiverElement) {
            return;
        }

        receiverElement.style.display = 'none';
        this.dropListReceiverElement = receiverElement;
    }

    dragDropped(event: CdkDragDrop<number>) {
        if (!this.dropListReceiverElement) {
            return;
        }

        this.dropListReceiverElement.style.removeProperty('display');
        this.dropListReceiverElement = undefined;
        this.dragDropInfo = undefined;
    }

}
