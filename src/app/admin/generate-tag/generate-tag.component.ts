import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// Popup start
@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example.html'
})

export class DialogOverviewExampleGenerateTagAdminComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleGenerateTagAdminComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog
  ) { }

  onNoClick(): void {
    this.dialogRef.close(); 
  }
}
// popup end

// tab start
export interface ExampleTab {
  label: string;
  content: string;
}
// tab End

@Component({
  selector: 'app-generate-tag',
  templateUrl: './generate-tag.component.html',
  styleUrls: ['./generate-tag.component.scss']
})

export class GenerateTagComponent {

  // tabs start
  tabs = ['First', 'Second', 'Third'];
  selected = new FormControl(0);

  tabLoadTimes: Date[] = [];

  asyncTabs: Observable<ExampleTab[]>;

  links = ['First', 'Second', 'Third'];
  activeLink = this.links[0];
  background = '';

  addTab(selectAfterAdding: boolean) {
    this.tabs.push('New');

    if (selectAfterAdding) {
      this.selected.setValue(this.tabs.length - 1);
    }
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }

  getTimeLoaded(index: number) {
    if (!this.tabLoadTimes[index]) {
      this.tabLoadTimes[index] = new Date();
    }

    return this.tabLoadTimes[index];
  }
  // tabs end
 
  // Popup start
  animal = '';
  name = '';
  // popup end

  public form: FormGroup = Object.create(null);
  constructor(private fb: FormBuilder, private location: Location, public dialog: MatDialog, private router: Router) { }

  // Popup start
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleGenerateTagAdminComponent, {
      width: '900px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
  // popup end

  ngOnInit() {
    this.form = this.fb.group({
      uname: [null, Validators.compose([Validators.required])],
    });
  }
  backPage() {
    this.location.back();
  }

}

