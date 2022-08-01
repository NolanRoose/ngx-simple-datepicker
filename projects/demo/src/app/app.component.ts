import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public form!: FormGroup;

  public ngOnInit(): void {
    this.form = new FormGroup({
      date: new FormControl(new Date())
    });
  }
}
