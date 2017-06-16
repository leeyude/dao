import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import {Tracker} from "meteor/tracker";
import { Cities, Districts } from './../../../collections/cities/cities';
import "./userAdmin.less";
import {YearOptions, MonthOptions, GetDayOptions} from './../../../api/time';

export default class ClientAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientDataLines: [],
      yearSelected: false,
      monthSelected: false,
      dayAvailable: false,
      cities: [], // total list of cities
      citySelected: "", // a city that is selected from the total list
      renderedDistricts: [], // according to the city selected, a list of districts of that city is rendered.
      isAddingUser: true, // false: updating from existing users
      clientDataView: {
        skipped: 0,
        numberOfRecords: 10
      },

    };
  }

  componentDidMount(){
    Tracker.autorun(()=> {
      Meteor.subscribe("cities");
      const cities = Cities.find().fetch();
      this.setState({cities: cities});
    });
  }

  renderCities(){
    const cities = this.state.cities;
    return cities.map(function(eachCity){
      return (<option key={eachCity._id}>{eachCity.name}</option>);
    });
  }

  selectCity(e){
    e.preventDefault();
    const citySelected = $('#city').val();
    this.setState({citySelected: citySelected});

    Tracker.autorun(()=> {
      Meteor.subscribe("districts", citySelected);
      const districts = Districts.find().fetch();
      this.setState({renderedDistricts: districts});
    });
  }

  renderDistricts(){
    const districts = this.state.renderedDistricts;
    return districts.map(function(eachDistrict){
      if(eachDistrict.City_County == this.state.citySelected){
        return (<option key={eachDistrict._id} value={eachDistrict.District_Village}>{eachDistrict.District_Village}</option>)
      };
    }.bind(this));
  }

  renderYear(){
    const yearsOptions = YearOptions();
    return yearsOptions.map((eachYear)=>{
      return (<option key={eachYear}>{eachYear}</option>)
    });
  }

  onChangeYear(e){
    e.preventDefault();
    var year = $('#year').val();
    this.setState({yearSelected: year});
    return false;
  }

  renderMonth(){
    const monthOptions = MonthOptions();
    return monthOptions.map((eachMonth)=>{
      return (<option key={eachMonth.monthNum} value={eachMonth.monthNum}>{eachMonth.traditionalChineseText}</option>)
    });
  }

  onChangeMonth(e){
    e.preventDefault();
    var month = $('#month').val();
    this.setState({monthSelected: month});
    return false;
  }

  getDay(){
    if(this.state.monthSelected != '-' && this.state.yearSelected != '-'){
      if(this.state.monthSelected && this.state.yearSelected){
        const month = this.state.monthSelected;
        const year = this.state.yearSelected;
        const dayOptions = GetDayOptions(month, year);

        return dayOptions.map((eachDay)=>{
          return (<option key={eachDay} value={eachDay}>{eachDay}</option>)
        });
      }
    }
  }

  getClientData(){
    const userDataHandle = Meteor.subscribe("clientUserData", this.state.clientDataView);
    const clientData = Meteor.users.find().fetch();
    return clientData.map((eachUser)=>{
      const createdAt = moment(eachUser.createdAt).format('YYYY-MMM-D');
      return (
        <tr key={eachUser._id} onClick={()=>this.updateClientData(eachUser)}>
          <td>{eachUser.emails[0].address}</td>
          <td>{eachUser.profile.firstName}</td>
          <td>{eachUser.profile.lastName}</td>
          <td>{eachUser.profile.address}</td>
          <td>{eachUser.profile.city}</td>
          <td>{eachUser.profile.district}</td>
          <td>{eachUser.profile.phone}</td>
          <td>{eachUser.profile.birthday.year}-{eachUser.profile.birthday.month}-{eachUser.profile.birthday.day}</td>
          <td>{eachUser.profile.gender}</td>
          <td>{createdAt}</td>
        </tr>
      );
    });
  }

  clickAddClient(e){
    e.preventDefault();
    this.setState({isAddingUser: true});
    $('#email').val('');
    $('#password').val('');
    $('#firstName').val('');
    $('#lastName').val('');
    $('#address').val('');
    $('#city').val('');
    $('#district').val('');
    $('#phoneNumber').val('');
    $('#year').val('');
    $('#month').val('');
    $('#day').val('');
    $('#gender').val('');
  }

  updateClientData(user){
    $('#addClientButton').click();
    this.setState({isAddingUser: false});
    this.setState({citySelected: user.profile.city});
    $('#city').val(user.profile.city);
    this.setState({yearSelected: user.profile.birthday.year});
    this.setState({monthSelected: user.profile.birthday.month});
    
    Tracker.autorun(()=> {
      Meteor.subscribe("districts", user.profile.city);
      const districts = Districts.find().fetch();
      this.setState({renderedDistricts: districts});
      $('#email').val(user.emails[0].address);
      $('#password').val();
      $('#firstName').val(user.profile.firstName);
      $('#lastName').val(user.profile.lastName);
      $('#address').val(user.profile.address);
      $('#phoneNumber').val(user.profile.phone);
      $('#year').val(user.profile.birthday.year);
      $('#month').val(user.profile.birthday.month);
      $('#day').val(user.profile.birthday.day);
      $('#gender').val(user.profile.gender);
      $('#district').val(user.profile.district);
    });




  }

  userHandlingText(){
    if(this.state.isAddingUser){
      return {
        text: "新增",
        className: "addingUser"
      };
    }else{
      return {
        text: "修改",
        className: "updatingUser"
      };
    }
  }

  addUser(e){
    e.preventDefault();
    var email = $('#email').val();
    var password = $('#password').val();
    var firstName = $('#firstName').val();
    var lastName = $('#lastName').val();
    var phoneNumber = $('#phoneNumber').val();
    var gender = $('#gender').val();
    var city = $('#city').val();
    var district = $('#district').val();
    var address = $('#address').val();
    var year = $('#year').val();
    var month = $('#month').val();
    var day = $('#day').val();

    if(this.state.isAddingUser){// if this is adding a user
      // following data from web form entry.
      Accounts.createUser({
        email: email,
        password: password,
        profile: {
          firstName: firstName,
          lastName: lastName,
          address: address,
          city: city,
          district: district,
          phone: phoneNumber,
          birthday: {
            year: year,
            month: month,
            day: day
          },
          gender: gender,
        },
      });
    }else{ // this is to update a user
      // Meteor.users.update()
    };

    this.setState({isAddingUser: true});
    return false;
  }

  render() {
    return (
      <div id="userData" className="row">
        <button id="addClientButton" type="button" className="userDataButton btn btn-info btn-lg" data-toggle="modal" data-target="#clientDataModal" onClick={this.clickAddClient.bind(this)}>新增資料</button>

        <div className="modal fade" id="clientDataModal" role="dialog">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h4 className="modal-title">{this.userHandlingText().text}使用者</h4>
              </div>
              <div className="modal-body">
                <div className="modal-form">
                  <div className='row'>
                    <div className='col-md-6'>
                      <label>E-mail</label>
                      <input type="text" className="form-control" id="email"/>
                    </div>
                    <div className='col-md-6'>
                      <label>Password</label>
                      <input type="password" className="form-control" id="password"/>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-3'>
                      <label>First Name</label>
                      <input type="text" className="form-control" id="firstName"/>
                    </div>
                    <div className='col-md-3'>
                      <label>Last Name</label>
                      <input type="text" className="form-control" id="lastName"/>
                    </div>
                    <div className='col-md-3'>
                      <label>Phone #</label>
                      <input type="text" className="form-control" id="phoneNumber"/>
                    </div>
                    <div className='col-md-3'>
                      <label>Gender</label>
                      <select className="form-control" id="gender">
                        <option>-</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                      </select>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-md-3'>
                      <label>City</label>
                      <select className="form-control" id="city" onChange={this.selectCity.bind(this)}>
                        <option>-</option>
                        {this.renderCities()}
                      </select>
                    </div>
                    <div className='col-md-3'>
                      <label>District</label>
                      <select className="form-control" id="district">
                        <option>-</option>
                        {this.renderDistricts()}

                      </select>
                    </div>
                    <div className='col-md-6'>
                      <label>Address</label>
                      <input type="text" className="form-control" id="address"/>
                    </div>
                  </div>
                  <div className='row'>

                    <div className='col-md-2'>
                      <label>Birth Year</label>
                      <select className="form-control" id="year" onChange={this.onChangeYear.bind(this)}>
                        <option>-</option>
                        {this.renderYear()}

                      </select>
                    </div>
                    <div className='col-md-2'>
                      <label>Birth Month</label>
                      <select className="form-control" id="month" onChange={this.onChangeMonth.bind(this)}>
                        <option>-</option>
                        {this.renderMonth()}

                      </select>
                    </div>
                    <div className='col-md-2'>
                      <label>Birth Day</label>
                      <select className="form-control" id="day">
                        <option>-</option>
                        {this.getDay()}
                      </select>

                    </div>
                  </div>

                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.addUser.bind(this)}>{this.userHandlingText().text}</button>

                <button type="button" className="btn btn-default" data-dismiss="modal">取消</button>

              </div>
            </div>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-hover	">
            <thead>
              <tr>
                <th>E-mail</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>City</th>
                <th>District</th>
                <th>Phone #</th>
                <th>Birthday</th>
                <th>Gender</th>
                <th>Joined Since</th>
              </tr>
            </thead>
            <tbody>
              {this.getClientData()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
