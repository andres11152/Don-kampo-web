import {Component, OnInit} from '@angular/core';
import {ApiService} from "../service/api.service";
import {NgForOf, NgIf} from "@angular/common";
import {MatTableModule} from '@angular/material/table';
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'app-user',
    standalone: true,
    imports: [NgForOf, MatTableModule, RouterLink, RouterOutlet, MatButtonModule, NgIf, MatIconModule, MatProgressSpinnerModule, MatProgressBarModule, MatCheckboxModule, FormsModule],
    templateUrl: './user.component.html',
    styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {
    data: any[] = [];
    displayedColumns: string[] = ['name','term', 'type_user', 'email', 'phone', 'document', 'uid',];
    loading: boolean = false;
    isChecked: boolean = false;

    constructor(private apiServices: ApiService) {}

    ngOnInit(): void {
        this.setData();
    }

    setData() {
        this.loading = true;
        this.apiServices.findAll('3').subscribe(data => {
            this.loading = false;
            this.data = data.data;
        })
    }

}
