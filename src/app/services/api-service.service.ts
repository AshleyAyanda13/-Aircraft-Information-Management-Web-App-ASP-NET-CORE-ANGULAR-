import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private apiUrl = 'https://localhost:7008/api/Account/Login';
  private apiUrlRegistration = 'https://localhost:7008/api/Account/register';
  private apiUrlInventory = 'https://localhost:7008/api/Inventory/Protected';
  private apiUrlAddData="https://localhost:7008/api/Inventory";
  private apiUrlGetLoggedinUser = 'https://localhost:7008/api/Account/LoggedInUser';
  private apiUrlGetInventoryById = 'https://localhost:7008/api/Inventory/';
  private apipostEditdata="https://localhost:7008/api/Inventory/";
  private apiDeleteData="https://localhost:7008/api/Inventory/";
  private apiSearchInventory="https://localhost:7008/api/Inventory/search?query=";

  constructor(private http: HttpClient) { }

  postData(payload: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, payload);
  }

  
  postRegistrationData(payload: any): Observable<any> {
    return this.http.post<any>(this.apiUrlRegistration, payload);
  }
  
  getInventoryData(): Observable<any> {
    return this.http.get<any>(this.apiUrlInventory);
  }
   getSearchInventoryData(search:any): Observable<any> {
    return this.http.get<any>(this.apiSearchInventory+search);
  }
 postInventoryData(payload: any): Observable<any> {
    return this.http.post<any>(this.apiUrlAddData, payload);
  }
  getLoggedinUser(): Observable<any> {
    return this.http.get<any>(this.apiUrlGetLoggedinUser);
  }
  getInventoryDatawithId(Id:number): Observable<any> {
    return this.http.get<any>(this.apiUrlGetInventoryById+Id);
  }
  postEditData(Id:number,payload: any): Observable<any> {
    return this.http.put<any>(this.apipostEditdata+Id, payload);
  }
Delete(Id: number): Observable<any> {
    return this.http.delete<any>(this.apiDeleteData+Id);
  }
  }





