import {Component, OnInit} from '@angular/core';
import {ApiService} from "../service/api.service";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatTableModule} from "@angular/material/table";
import {NgIf} from "@angular/common";
import {RouterLink, RouterOutlet} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {format, parseISO} from 'date-fns';

@Component({
    selector: 'app-inform',
    standalone: true,
    imports: [
        MatIconModule,
        MatProgressBarModule,
        MatTableModule,
        NgIf,
        RouterLink,
        RouterOutlet,
        MatButtonModule,
        MatCardModule
    ],
    templateUrl: './inform.component.html',
    styleUrl: './inform.component.scss'
})
export class InformComponent implements OnInit {

    data: any[] = [];
    displayedColumns: string[] = ['name_company', 'rut_company', 'CreatedAt', 'type','ID',];
    loading: boolean = false;

    constructor(private apiServices: ApiService) {
    }

    ngOnInit(): void {
        this.setData();
    }

    setData() {
        this.loading = true;
        this.apiServices.findInforms('0').subscribe(data => {
            this.loading = false;
            this.data = data.data;
        })
    }

    getTypeInformStatus(type: number): string {
        switch (type) {
            case 0:
                return "Informe contable y tributario";
            case 1:
                return "Informe laboral";
            case 2:
                return "Informe legal";
            case 3:
                return "Informe full";
            default:
                return "Tipo de informe desconocido";
        }
    }

    parseDate(dateStr: string): string {
        const parsedDate = parseISO(dateStr);
        return format(parsedDate, 'MMM d, yyyy');
    }

}
