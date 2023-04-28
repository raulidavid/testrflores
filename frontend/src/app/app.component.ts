import { Component } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-app';
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
}
