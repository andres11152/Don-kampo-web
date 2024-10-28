import {Component, OnInit} from '@angular/core';
import {MatTableModule} from "@angular/material/table";
import {RouterLink, RouterOutlet} from "@angular/router";
import {ApiService} from "../../service/api.service";
import {MatIconModule} from "@angular/material/icon";
import {NgIf} from "@angular/common";
import {MatProgressBarModule} from "@angular/material/progress-bar";

@Component({
  selector: 'admin.approved',
  standalone: true,
    imports: [
        MatTableModule,
        RouterLink,
        RouterOutlet,
        MatIconModule,
        NgIf,
        MatProgressBarModule
    ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent  {
   
}
