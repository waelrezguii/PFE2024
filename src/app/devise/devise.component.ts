import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-devise',
  templateUrl: './devise.component.html',
  styleUrl: './devise.component.css'
})
export class DeviseComponent implements OnInit {
  devises:any[]=[];

  constructor(private http:HttpClient) {
    
  }
  ngOnInit(): void {
   this.LoadDevises();
  }
LoadDevises():void{
  const url='http://localhost:8080/api/v1/devise/all';
  this.http.get<any[]>(url).subscribe(devises =>
    {
this.devises=devises;
    });

}
}
