import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { TabeService } from '../tabe.service';
import { ModalDirective } from 'ngx-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-create-table',
  templateUrl: './create-table.component.html',
  styleUrls: ['./create-table.component.css']
})
export class CreateTableComponent implements OnInit {

  //#region variables
  lstData = [];
  lstCountry = [];
  lstState = [];
  lstCity = [];
  // lstHobbies = [];
  country: any;
  state: any;
  city: any;
  modaltitle: any;
  modalBtn: any;
  isSelect: boolean;
  // hobbie: boolean;
  message: any;
  testForm: FormGroup;
  editIndex: number = -1;
  editData: any = null;
  //#endregion

  // #region Functions 
  testForm_fb() { 
    this.testForm = this.fb.group({
      id: [null],
      name: [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z]+$')])],
      date: [null, Validators.required],
      mobilenumber: [null, Validators.compose([Validators.required, Validators.pattern('[0-9]\\d{9}')])],
      // mobilenumber: [null, Validators.compose([Validators.required, Validators.pattern('[0-9]+$'), Validators.maxLength(10), Validators.minLength(10)])],
      address: [null, Validators.required],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      gender: [null],
      // hobbie: [null],
      age: [null, Validators.compose([Validators.required, Validators.pattern('[0-9]\\d{0,1}')])],
      country: [null, Validators.required],
      state: [null, Validators.required],
      city: [null, Validators.required]
    });
  };
  // #endregion

  @ViewChild('AddModal') addModal: ModalDirective;
  //#region Test Form Functions
  showAddModal() {
    this.modaltitle = "Add Record";
    this.modalBtn = "Save";
    this.lstCountry = this.tabeService.countryList();
    // this.lstHobbies = this.tabeService.hobbieList();
    this.testForm.reset();
    this.testForm.patchValue({
      id: 0, gender: 'Male',
      country: '',
      state: '',
      city: ''
    });
    this.addModal.show();
  };

  // showEditModal(EditList) {
  //   this.modaltitle = "Edit Record";
  //   this.modalBtn = "Save Changes";
  // this.lstCountry = this.tabeService.countryList();
  // this.lstState = this.tabeService.stateList();
  // this.lstCity = this.tabeService.cityList();
  // // this.lstHobbies = this.tabeService.hobbieList();

  // const contryId = this.lstCountry.find(x => x.Cname.toLowerCase() == EditList.country.toLowerCase());
  // if (contryId) {
  //   this.lstState = this.lstState.filter(x => x.Cid == contryId.Cid);
  // };

  // const stateId = this.lstState.find(x => x.Sname.toLowerCase() == EditList.state.toLowerCase());
  // if (stateId) {
  //   this.lstCity = this.lstCity.filter(x => x.Sid == stateId.Sid);
  // }

  // const cityId = this.lstCity.find(x => x.Ctname.toLowerCase() == EditList.city.toLowerCase());

  // // const hobbies = this.lstHobbies.find(x => x.hobbieName == EditList.hobbie);

  // // console.log('lstHobbies',this.lstHobbies);

  // const newDate = (new Date(EditList.date)).toISOString().substring(0, 10);
  // this.testForm.patchValue({
  //   id: EditList.id,
  //   name: EditList.name,
  //   date: newDate,
  //   mobilenumber: EditList.number,
  //   email: EditList.email,
  //   address: EditList.address,
  //   gender: EditList.gender,
  //   // hobbie: hobbies,
  //   age: EditList.age,
  //   country: contryId ? contryId.Cid : '',
  //   state: stateId ? stateId.Sid : '',
  //   city: cityId ? cityId.Ctid : ''
  // });
  //   this.addModal.show();
  // };

  closeModel() {
    this.addModal.hide();
  };

  AddRecord() {
    for (let v in this.testForm.controls) {
      this.testForm.controls[v].markAsTouched();
    };
    if (this.testForm.valid) {
      const formValue = this.testForm.value;
      formValue.number = formValue.mobilenumber;
      const lstContry = this.tabeService.countryList();
      const lstState = this.tabeService.stateList();
      const lstCity = this.tabeService.cityList();
      // const lstHobbies = this.tabeService.hobbieList();

      const ContryName = lstContry.find(x => x.Cid == formValue.country);
      if (ContryName) { formValue.country = ContryName.Cname; };
      const StateName = lstState.find(x => x.Sid == formValue.state);
      if (StateName) { formValue.state = StateName.Sname; };
      const CityName = lstCity.find(x => x.Ctid == formValue.city);
      if (CityName) { formValue.city = CityName.Ctname; };

      // if(Hobbie) { formValue.hobbie = Hobbie.hobbieName; };

      const index = this.lstData.findIndex(x => x.id == formValue.id);
      if (index > -1) {
        this.lstData.splice(index, 1, formValue);
      } else {
        formValue.id = (new Date()).getTime();
        this.lstData.push(formValue);
      };
      this.closeModel();
    };
  }

  getState(countryId?) {
    if (this.editIndex > -1) {
      let data = this.editData;
      if (countryId == 0) {
        this.lstState = []; this.lstCity = [];
        data.state = '', data.city = '';
      }
      for (let i = 0; i < this.lstCountry.length; i++) {
        if (this.lstCountry[i].Cid == data.country) {
          data.state = this.lstCountry[i];
          this.lstCity = [];
          data.state = '', data.city = '';
        }
        this.lstState = this.tabeService.stateList().filter((item) => item.Cid == data.country);
      }
    } else {
      let country = 0;
      if (countryId) { country = countryId; } else { country = this.testForm.get('country').value; }
      if (country == 0) {
        this.lstState = [];
        this.lstCity = [];
        this.testForm.patchValue({
          state: '',
          city: ''
        });
      } else {
        for (let i = 0; i < this.lstCountry.length; i++) {
          if (this.lstCountry[i].Cid == country) {
            this.state = this.lstCountry[i];
            this.lstCity = [];
            this.testForm.patchValue({
              state: '',
              city: ''
            });
            this.lstState = this.tabeService.stateList().filter((item) => item.Cid == country);
          }
        }
      }
    }
  };

  getCity(stateId?) {
    if (this.editIndex > -1) {
      let data = this.editData;
      if (stateId == 0) {
        this.lstCity = [];
        data.city = '';
      }
      for (let i = 0; i < this.lstState.length; i++) {
        if (this.lstState[i].Sid == data.state) {
          data.city = this.lstState[i];
          data.city = '';
        }
        this.lstCity = this.tabeService.cityList().filter((item) => item.Sid == data.state);
      }
    } else {
      let state = 0;
      if (stateId) { state = stateId; } else { state = this.testForm.get('state').value; }
      if (state == 0) {
        this.lstCity = [];
        this.testForm.patchValue({
          city: ''
        });
      } else {
        for (let i = 0; i < this.lstState.length; i++) {
          if (this.lstState[i].Sid == state) {
            this.city = this.lstState[i];
            this.testForm.patchValue({
              city: ''
            });
            this.lstCity = this.tabeService.cityList().filter((item) => item.Sid == state);
          }
        }
      }
    }
  }

  //#endregion

  //#region Functions
  editRecord(index) {
    this.editIndex = index;
    if (index > -1) {
      let data = this.lstData[index];
      console.log('data:', data)
      this.lstCountry = this.tabeService.countryList();
      const lstState = this.tabeService.stateList();
      const lstCity = this.tabeService.cityList();
      const contryId = this.lstCountry.find(x => x.Cname == data.country);
      const country = contryId ? contryId.Cid : '';
      if (contryId) {
        this.lstState = lstState.filter(x => x.Cid == country);
      };
      const stateId = this.lstState.find(x => x.Sname == data.state);
      const state = stateId ? stateId.Sid : '';
      if (stateId) { this.lstCity = lstCity.filter(x => x.Sid == state); }
      const cityId = this.lstCity.find(x => x.Ctname == data.city);
      const newDate = (new Date(data.date)).toISOString().substring(0, 10);
      const city = cityId ? cityId.Ctid : '';

      this.lstData[index] = {
        name: data.name, date: newDate,
        number: data.number, email: data.email,
        address: data.address, gender: data.gender,
        age: data.age, country: country,
        state: state, city: city
      };
      this.editData = {
        name: data.name, date: newDate,
        number: data.number, email: data.email,
        address: data.address, gender: data.gender,
        age: data.age, country: country,
        state: state, city: city
      };
    };
  };

  saveChanges(index) {
    let data = this.lstData[index];
    // this.lstData[index] = this.editData;
    const contryId = this.lstCountry.find(x => x.Cid == data.country);
    const stateId = this.lstState.find(x => x.Sid == data.state);
    const cityId = this.lstCity.find(x => x.Ctid == data.city);
    const newDate = (new Date(data.date)).toISOString().substring(0, 10);
    // const date = `${newDate.getFullYear()}-${(newDate.getMonth() + 1)}-${newDate.getDate()}`;

    let body = {
      name: data.name, date: newDate,
      number: data.number, email: data.email,
      address: data.address, gender: data.gender,
      age: data.age, country: contryId.Cname,
      state: stateId.Sname, city: cityId.Ctname
    };
    this.lstData[index] = body;
    this.editIndex = -1;
  };

  cancelEdit(index) {
    console.log('editData1', this.editData);
    this.lstData[index] = this.editData;
    if (this.editIndex > -1) {
      let data = this.editData;
      
      var body = {
       country: data.country,
        state: data.state, city: data.city
      };
      // console.log('body:', body)
    };
    this.editData = null;
    this.editIndex = -1;
  }

  deleteRow(index) {
    if (confirm('Are you sure want to delete this record ?')) {
      this.lstData.splice(index, 1);
    };
    this.closeModel();
  }

  SelectAll() {
    for (let i = 0; i < this.lstData.length; i++) {
      this.lstData[i].isSelect = this.isSelect;
    };
  }

  checkboxSelect() {
    this.isSelect = this.lstData.every(function (item: any) {
      return item.select == true;
    })
  }

  deleteAll() {
    const selectedrow = this.lstData.filter(x => x.isSelect == true);
    if (selectedrow.length > 0) {
      if (confirm("Are you sure to delete selected record?")) {
        for (let i = 0; i < selectedrow.length; i++) {
          const ele = selectedrow[i];
          const index = this.lstData.findIndex(x => x.id == ele.id);
          if (index > -1) {
            this.lstData.splice(index, 1);
          }
        }
      }
    }
    else {
      alert("Please select any one record");
    }
    this.isSelect = false;
  }

  refreshData() {
    const data = this.tabeService.getList();
    const existingData = this.lstData;
    const finalData = data;
    for (let i = 0; i < existingData.length; i++) {
      const element = existingData[i];
      const selectedRecord = data.find(x => x.id == element.id);
      if (!selectedRecord) {
        finalData.push(element);
      };
      this.lstData[i].isSelect = false;
    };
    this.lstData = finalData;
    this.isSelect = false;
  };
  //#endregion
  constructor(private tabeService: TabeService, private fb: FormBuilder, private datePipe: DatePipe) {
    this.testForm_fb();
  }

  ngOnInit() {
    this.lstData = this.tabeService.getList();
  }
}