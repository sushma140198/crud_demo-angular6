import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})

export class TabeService {

  constructor(private datePipe: DatePipe) { }
  getList() {
    return [
      { id: 1, isSelect: "", name: 'Sushma', date: '2019-2-19', number: '1234567894', email: 'sushma123@gmail.com', address: 'Ahmedabad', gender: 'FeMale', hobbie: "Writing", age: 20, country: "India", state: "Gujarat", city: "Ahmedabad" },
      { id: 2, isSelect: "", name: 'Shraddha', date: '2019-2-19', number: '1234567894', email: 'sushma123@gmail.com', address: 'Ahmedabad', gender: 'FeMale', hobbie: "Playing", age: 22, country: "USA", state: "NewYork", city: "NewYork city" },
      { id: 3, isSelect: "", name: 'Preha', date: '2019-2-19', number: '1234567894', email: 'sushma123@gmail.com', address: 'Ahmedabad', gender: 'FeMale', hobbie: "Reading", age: 21, country: "India", state: "Rajasthan", city: "Udaipur" },
      { id: 4, isSelect: "", name: 'Bansi', date: '2019-2-19', number: '1234567894', email: 'sushma123@gmail.com', address: 'Ahmedabad', gender: 'FeMale', hobbie: "Travelling", age: 23, country: "USA", state: "California", city: "California city city2" },
      { id: 5, isSelect: "", name: 'Happy', date: '2019-2-21', number: '1234567894', email: 'sushma123@gmail.com', address: 'Ahmedabad', gender: 'Male', hobbie: "Photography", age: 2, country: "India", state: "Gujarat", city: "Surat" }
    ]
  }

  countryList() {
    return [
      { Cid: 1, Cname: "India" },
      { Cid: 2, Cname: "USA" }
    ]
  }

  stateList() {
    return [
      { Sid: 1, Sname: "Gujar at", Cid: 1 },
      { Sid: 2, Sname: "Rajasthan", Cid: 1 },
      { Sid: 3, Sname: "NewYork", Cid: 2 },
      { Sid: 4, Sname: "California", Cid: 2 }
    ]
  }

  cityList() {
    return [
      { Ctid: 1, Ctname: "Ahmedabad", Sid: 1 },
      { Ctid: 2, Ctname: "Surat", Sid: 1 },
      { Ctid: 3, Ctname: "Udaipur", Sid: 2 },
      { Ctid: 4, Ctname: "R city", Sid: 2 },
      { Ctid: 5, Ctname: "NewYork city", Sid: 3 },
      { Ctid: 6, Ctname: "NewYork city2", Sid: 3 },
      { Ctid: 7, Ctname: "California city", Sid: 4 },
      { Ctid: 8, Ctname: "California city city2", Sid: 4 }
    ]
  }

  hobbieList(){
    return [
      { hobbieId:1, hobbieName:'Writing', selected : ''},
      { hobbieId:2, hobbieName:'Playing', selected : ''},
      { hobbieId:3, hobbieName:'Reading',selected : '' },
      { hobbieId:4, hobbieName:'Travelling',selected : '' },
      { hobbieId:5, hobbieName:'Photography',selected : '' },
    ]
  }
}
