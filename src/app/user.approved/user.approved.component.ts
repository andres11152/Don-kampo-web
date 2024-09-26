import {Component, OnInit} from '@angular/core';
import {MatTableModule} from "@angular/material/table";
import {RouterLink, RouterOutlet} from "@angular/router";
import {ApiService} from "../service/api.service";
import {MatIconModule} from "@angular/material/icon";
import {NgIf} from "@angular/common";
import {MatProgressBarModule} from "@angular/material/progress-bar";

@Component({
  selector: 'app-user.approved',
  standalone: true,
    imports: [
        MatTableModule,
        RouterLink,
        RouterOutlet,
        MatIconModule,
        NgIf,
        MatProgressBarModule
    ],
  templateUrl: './user.approved.component.html',
  styleUrl: './user.approved.component.scss'
})
export class UserApprovedComponent implements OnInit {
    data: any[] = [];
    displayedColumns: string[] = ['name', 'type_user', 'email', 'phone', 'document', 'uid'];
    loading: boolean = false;
    constructor(private apiServices: ApiService) {}

    ngOnInit(): void {
        this.setData();
    }

    setData() {
        this.loading = true;
        this.apiServices.findAll('1').subscribe(data => {
            this.loading = false;
            this.data = data.data;
        })
    }
}
