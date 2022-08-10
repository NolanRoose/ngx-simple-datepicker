import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public form!: FormGroup;
  public form2!: FormGroup;

  public ngOnInit(): void {
    this.form = new FormGroup({
      date: new FormControl()
    });

    this.form2 = new FormGroup({
      test: new FormControl()
    });

    this.form.valueChanges.subscribe(() => {
      this.form2.reset({}, {emitEvent: false});
    });

    this.form2.valueChanges.subscribe(() => {
      this.form.reset({date: undefined}, {emitEvent: false});
    });
  }

  public reset(): void {
    this.form.reset({date: new Date()}, {emitEvent: false});
  }

  public reset1(): void {
    this.form.reset({date: undefined}, {emitEvent: false});
  }
}
