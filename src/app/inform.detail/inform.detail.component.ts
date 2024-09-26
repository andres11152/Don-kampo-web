import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ThemePalette} from "@angular/material/core";
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from "@angular/router";
import {ApiService} from "../service/api.service";
import {MatSlideToggleChange, MatSlideToggleModule} from "@angular/material/slide-toggle";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {NgIf} from "@angular/common";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-inform.detail',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatSlideToggleModule,
    NgIf,
    RouterLink,
    RouterOutlet,
    MatProgressBarModule,
    MatIconModule,
    MatTableModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './inform.detail.component.html',
  styleUrl: './inform.detail.component.scss'
})
export class InformDetailComponent implements OnInit {
  @Input() title: string = '';
  @Output() backClicked = new EventEmitter<void>();
  @Output() saveClicked = new EventEmitter<void>();
  @Input() value: string = '';
  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;
  dataInform: any;
  userId: any;
  loading: boolean = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
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
    this.loading = true;
    this.apiServices.findInform(this.userId).subscribe(data => {
      this.dataInform = data.data;
      this.loading = false;
    })
  }

  save() {
    const status = this.checked ? '1' : '0'
    this.apiServices.updateInform(this.userId, status).subscribe(data => {
      this.dataInform = data.data;
      this.redirectToOtherPage();
    })
    this.saveClicked.emit();
  }

  redirectToOtherPage() {
    this.router.navigate(['/informs']);
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

}
