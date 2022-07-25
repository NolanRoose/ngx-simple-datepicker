import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'ngx-simple-datepicker';

  public form!: FormGroup;

  public ngOnInit(): void {
    this.form = new FormGroup({
      date: new FormControl('')
    });
  }
}
