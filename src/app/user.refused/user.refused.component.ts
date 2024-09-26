import {Component, OnInit} from '@angular/core';
import {MatTableModule} from "@angular/material/table";
import {RouterLink, RouterOutlet} from "@angular/router";
import {ApiService} from "../service/api.service";
import {MatIconModule} from "@angular/material/icon";
import {NgIf} from "@angular/common";
import {MatProgressBarModule} from "@angular/material/progress-bar";

@Component({
  selector: 'app-user.refused',
  standalone: true,
    imports: [
        MatTableModule,
        RouterLink,
        RouterOutlet,
        MatIconModule,
        NgIf,
        MatProgressBarModule
    ],
  templateUrl: './user.refused.component.html',
  styleUrl: './user.refused.component.scss'
})
export class UserRefusedComponent implements OnInit {
    data: any[] = [];
    displayedColumns: string[] = ['name', 'type_user', 'email', 'phone', 'document', 'uid'];
    loading: boolean = false;
    constructor(private apiServices: ApiService) {
    }

    ngOnInit(): void {
        this.setData();
    }

    setData() {
        this.loading = true;
        this.apiServices.findAll('2').subscribe(data => {
            this.loading = false;
            this.data = data.data;
        })
    }
}