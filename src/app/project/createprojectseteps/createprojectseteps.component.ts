import { Component, OnInit } from '@angular/core';

import { of } from 'rxjs';



@Component({
    selector: 'app-createprojectseteps',
    templateUrl: './createprojectseteps.component.html',
    styleUrls: ['./createprojectseteps.component.scss']
})
export class CreateprojectsetepsComponent implements OnInit {

    steps = [
        {
            type: 'content',
            step: 1,
            name: "email",
            id: '#test-l-1'
        },
        {
            type: 'content',
            step: 2,
            name: "password",
            id: '#test-l-2'
        },
        {
            type: 'content',
            step: 3,
            name: "validate",
            id: '#test-l-3'
        }
    ];

    
    
      constructor() {
      }
    
      ngOnInit() {
      }
    
      
    
      isValidTypeBoolean: boolean = true;
    
      



}
/*
name = 'Angular';
    public stepper: any;

    steps = [
        {
            type: 'content',
            step: 1,
            name: "email",
            id: '#test-l-1'
        },
        {
            type: 'content',
            step: 2,
            name: "password",
            id: '#test-l-2'
        },
        {
            type: 'content',
            step: 3,
            name: "validate",
            id: '#test-l-3'
        }
    ]; */