import {Component, OnInit} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatTableModule} from "@angular/material/table";
import {NgIf} from "@angular/common";
import {RouterLink, RouterOutlet} from "@angular/router";
import {ApiService} from "../service/api.service";
import {format, parseISO} from "date-fns";

@Component({
  selector: 'app-reports.sent',
  standalone: true,
  imports: [
    MatIconModule,
    MatProgressBarModule,
    MatTableModule,
    NgIf,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './reports.sent.component.html',
  styleUrl: './reports.sent.component.scss'
})
export class ReportsSentComponent implements OnInit {

  data: any[] = [];
  displayedColumns: string[] = ['name_company', 'rut_company', 'CreatedAt', 'type', 'ID',];
  loading: boolean = false;

  constructor(private apiServices: ApiService) {
  }

  ngOnInit(): void {
    this.setData();
  }

  setData() {
    this.loading = true;
    this.apiServices.findInforms('1').subscribe(data => {
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