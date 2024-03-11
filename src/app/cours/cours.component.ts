import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrl: './cours.component.css'
})
export class CoursComponent implements OnInit {
  NomDevList: string[]=[];
  codeBParameter: string = ''; 
  nomd: string = ''; 
  selectedDate: string = ''; 
  tableData:any[]=[];
isDataLoaded:boolean=false;
money:number=0;
  constructor(private http: HttpClient,private datePipe: DatePipe){}
  ngOnInit(): void {
   this.getNomDevList();
  }
getNomDevList():void{
  const url = `http://localhost:8080/api/v1/Cours/NomDevList`;
    this.http.get<string[]>(url).subscribe(data=>{
    this.NomDevList=data;
  });
}
formatDate(date: Date): string {
  return this.datePipe.transform(date, 'yyyy-MM-dd') || '';

}
fetchTableData():void{
  if(this.nomd&&this.selectedDate){
    const url1=`http://localhost:8080/api/v1/Cours/byNomdevAndDate/${this.nomd}/${this.selectedDate}`;
  this.http.get<any[]>(url1).subscribe(data=>{
    this.tableData=data;
    this.isDataLoaded=true;
    
  });
  }
}
calculateAchat(item: any): number {
  return item.achat * this.money;
}

calculateVente(item: any): number {
  return item.vente * this.money;
}
}
