import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { takeWhile, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'fbc-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit, OnDestroy {


  constructor() { }

  componentExists = true;

  inputControl: FormControl = new FormControl();

  ngOnInit() {
    console.log(this.inputControl);

    this.inputControl.valueChanges
    .pipe(
      takeWhile(t => this.componentExists),
      debounceTime(2000)
      )
    .subscribe(v => console.log('new Value:', v));
  }

  ngOnDestroy(): void {
    this.componentExists = false;
  }
}
