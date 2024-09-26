import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {MatSlideToggleChange, MatSlideToggleModule} from "@angular/material/slide-toggle";
import {ThemePalette} from "@angular/material/core";
import {ApiService} from "../service/api.service";
import {NgIf} from "@angular/common";
import {NgxExtendedPdfViewerModule} from "ngx-extended-pdf-viewer";
import { HttpClient } from "@angular/common/http";
import {MatIconModule} from "@angular/material/icon";

@Component({
    selector: 'app-detail',
    standalone: true,
    imports: [
        MatCardModule,
        MatButtonModule,
        RouterLink,
        RouterOutlet,
        FormsModule,
        MatSlideToggleModule,
        NgIf,
        NgxExtendedPdfViewerModule,
        MatIconModule
    ],
    templateUrl: './detail.component.html',
    styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {
    @Input() title: string = '';
    @Output() backClicked = new EventEmitter<void>();
    @Output() saveClicked = new EventEmitter<void>();
    @Input() value: string = '';
    color: ThemePalette = 'accent';
    checked = false;
    disabled = false;
    dataUser: any;
    userId: any;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private http: HttpClient,
                private apiServices: ApiService) {
    }

    public toggle(event: MatSlideToggleChange) {
        this.checked = event.checked;
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.userId = params.get('id')!
            this.setData();
        });
    }

    setData() {
        this.apiServices.find(this.userId).subscribe(data => {
            this.dataUser = data.data;
        })
    }

    save() {
        const status = this.checked ? '1' : '2'
        console.log("this.checked:"+this.checked)
        this.apiServices.update(this.userId, status).subscribe(data => {
            this.dataUser = data.data;
            this.redirectToOtherPage();
        })
        this.saveClicked.emit();
    }

    redirectToOtherPage() {
        this.router.navigate(['/users']);
    }

}
