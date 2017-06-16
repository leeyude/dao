import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import {Tracker} from "meteor/tracker";

import coffeeSchemas from './../../../api/schemas/coffeeDataSchemas';
import SchemaTable from './otherProductionRelated/SchemaTable';
import {
  CoffeeProcesses,
  CoffeeCultivars,
  CoffeeAreas,
  CoffeeCountries,
  CoffeeRegions
} from '../../../collections/coffee/coffee.js';
import './coffeeAdmin.less';

export default class OtherProductionRelatedAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      schema: false,
      id: false,
      isAdding: true, // false is updating data on the page
      updatingObject: false,
      areas: false,
      countries: false,
      areaSelectedInRegion: false,
    };
  }

  componentDidMount(){
    Tracker.autorun(()=> {
      Meteor.subscribe("otherProductionRelatedData", "area");
      Meteor.subscribe("otherProductionRelatedData", "country");
      const areas = CoffeeAreas.find().fetch();
      const countries = CoffeeCountries.find().fetch();
      this.setState({areas: areas});
      this.setState({countries: countries});
    });
  }

  requestToAddData(id, schema){
    this.setState({schema: schema});
    this.setState({id: id});
    this.setState({isAdding: true});
  }

  requestToUpdateData(id, schema, item){
    this.setState({id: id});
    this.setState({schema: schema});
    this.setState({isAdding: false});
    this.setState({updatingObject: item});
    $("#coffeeDataModal").modal();
  }

  handleModal(){
    // need header titles ...checked
    // body content ...checked
    // decide on update or newly add
    // query data input and sent to method.
    // mongo db

    if(this.state.id =='process'){
      var title = "Process 處理方式";
    }else if(this.state.id =='cultivar'){
      var title = "Cultivar 品種";
    }else if(this.state.id =='area'){
      var title = "Area 產區";
    }else if(this.state.id =='country'){
      var title = "Country 國家";
    }else if(this.state.id =='region'){
      var title = "Region 區域";
    };

    if(this.state.schema){
      var inputLayout = this.state.schema.map(function(eachItem){
        if(eachItem.type=='text'){
          return (
            <div key={eachItem.value} className='col-sm-6'>
              <label>{eachItem.name}</label>
              <input type="text" className="form-control" id={eachItem.value}/>
            </div>
          );

        }else if (eachItem.type=='option') {
          if(this.state.id =="region"){
            if(eachItem.value == "area"){
              return (
                <div key={eachItem.value} className='col-sm-6'>
                  <label>{eachItem.name}</label>
                  <select className="form-control" id={eachItem.value}
                    onChange={(event) => this.changeAreaInRegion(event)}
                    value={this.state.areaSelectedInRegion}
                  >
                    <option>-</option>
                    {this.getOptions(this.state.id, eachItem.value)}
                  </select>
                </div>
              );
            }else{// is for selecting country
              if(this.state.areaSelectedInRegion){
                return (
                  <div key={eachItem.value} className='col-sm-6'>
                    <label>{eachItem.name}</label>
                    <select className="form-control" id={eachItem.value}>
                      <option>-</option>
                      {this.getOptions(this.state.id, eachItem.value)}
                    </select>
                  </div>
                );
              }else{
                return ( // no area selected so disabled.
                  <div key={eachItem.value} className='col-sm-6'>
                    <label>{eachItem.name}</label>
                    <select disabled className="form-control" id={eachItem.value}>
                      <option disabled>-</option>
                    </select>
                  </div>
                );
              }
            }
          }else{
            return (
              <div key={eachItem.value} className='col-sm-6'>
                <label>{eachItem.name}</label>
                <select className="form-control" id={eachItem.value}>
                  <option>-</option>
                  {this.getOptions(this.state.id, eachItem.value)}
                </select>
              </div>
            );
          }
        }else if (eachItem.type=='boolean'){
          return (
            <div key={eachItem.value} className='col-sm-6'>
              <label>{eachItem.name}</label>
              <select className="form-control" id={eachItem.value}>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
          );
        }
      }.bind(this));
    }


    return (
      <div className="modal fade" id="coffeeDataModal" role="dialog">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">&times;</button>
              <h4 className="modal-title">{title}</h4>
            </div>
            <div className="modal-body">
              <div className="modal-form">
                <div className='row'>
                  {inputLayout}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default" data-dismiss="modal"
                onClick={()=> this.updateOtherCoffeeData(
                  this.state.id,
                  this.state.schema,
                  this.state.isAdding,
                  this.state.updatingObject
                )}>
                {this.state.isAdding ? '新增' : '修改'}
              </button>
              <button type="button" className="btn btn-default" data-dismiss="modal">取消</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  getOptions(id, labelId){
    if(id== "country"){
      var areas = this.state.areas;
      return areas.map((eachArea)=> {
        return (
          <option key={eachArea._id}>
            {eachArea.Name}
          </option>
        );
      });
    }else if(id== "region"){
      var areas = this.state.areas;
      var countries = this.state.countries;

      if(labelId == "area"){ // returns only those areas that have countries associated
        return areas.map((eachArea)=> {
          return countries.map((eachCountry)=> {
            if(eachCountry.Area == eachArea.Name){
              return (
                <option key={eachArea._id}>
                  {eachArea.Name}
                </option>
              );
            }
          });
        });
      }else{
        return countries.map((eachCountry)=> {
          if(eachCountry.Area == this.state.areaSelectedInRegion){
            return (
              <option key={eachCountry._id}>
                {eachCountry.Name}
              </option>
            );
          }
        });
      }
    }
  }

  changeAreaInRegion(e){
    e.preventDefault();
    if($("#area").val()=='-'){
      this.setState({areaSelectedInRegion: false});

    }else{
      this.setState({areaSelectedInRegion: $("#area").val()});

    }
  }

  componentDidUpdate(){
    if(this.state.schema){
      if(this.state.isAdding){
        this.state.schema.map((eachSchema)=>{
          $("#"+eachSchema.value).val('');
        });
      }else{
        this.state.schema.map((eachSchema)=>{
          $("#"+eachSchema.value).val(this.state.updatingObject[eachSchema.name]);
        });

      }
    };

    if(this.state.areaSelectedInRegion){
      $("#area").val(this.state.areaSelectedInRegion);
    }
  }

  updateOtherCoffeeData(id, schema, isAdding, updatingObject){
    var queryObject = {};
    for(i=0; i<schema.length; i++){
      queryObject[schema[i].name]= $("#"+ schema[i].value).val();
    };

    Meteor.call("updateOtherCoffeeData", id, schema, isAdding, queryObject, updatingObject);
  }

  render() {
    return (
      <div id="otherProductionRelated">
        {this.handleModal()}
        <div className="itemContainer col-md-4">
          <h3>Process 處理方式</h3>
          <i id="coffeeDataModal"
            className="fa fa-plus-square-o" aria-hidden="true"
            onClick={()=> this.requestToAddData("process", coffeeSchemas.FieldsProcess)}
            data-toggle="modal" data-target="#coffeeDataModal"
            ></i>
          <div className="tableHolder">
            <SchemaTable
              id="process"
              schema={coffeeSchemas.FieldsProcess}
              updateData={this.requestToUpdateData.bind(this)}/>
          </div>
        </div>
        <div className="itemContainer col-md-4">
          <h3>Cultivar 品種</h3>
          <i id="coffeeDataModal"
            className="fa fa-plus-square-o" aria-hidden="true"
            onClick={()=> this.requestToAddData("cultivar", coffeeSchemas.FieldsCultivar)}
            data-toggle="modal" data-target="#coffeeDataModal"
            ></i>
          <div className="tableHolder">
            <SchemaTable
              id="cultivar"
              schema={coffeeSchemas.FieldsCultivar}
              updateData={this.requestToUpdateData.bind(this)}/>
          </div>
        </div>
        <div className="itemContainer col-md-4">
          <h3>Area 產區</h3>
          <i id="coffeeDataModal"
            className="fa fa-plus-square-o" aria-hidden="true"
            onClick={()=> this.requestToAddData("area", coffeeSchemas.FieldsArea)}
            data-toggle="modal" data-target="#coffeeDataModal"
            ></i>
          <div className="tableHolder">
            <SchemaTable
              id="area"
              schema={coffeeSchemas.FieldsArea}
              updateData={this.requestToUpdateData.bind(this)}/>
          </div>

        </div>
        <div className="itemContainer col-md-4">
          <h3>Country 國家</h3>
          <i id="coffeeDataModal"
            className="fa fa-plus-square-o" aria-hidden="true"
            onClick={()=> this.requestToAddData("country", coffeeSchemas.FieldsCountry)}
            data-toggle="modal" data-target="#coffeeDataModal"
            ></i>
          <div className="tableHolder">
            <SchemaTable
              id="country"
              schema={coffeeSchemas.FieldsCountry}
              updateData={this.requestToUpdateData.bind(this)}/>
          </div>
        </div>
        <div className="itemContainer col-md-4">
          <h3>Region 區域</h3>
          <i id="coffeeDataModal"
            className="fa fa-plus-square-o" aria-hidden="true"
            onClick={()=> this.requestToAddData("region", coffeeSchemas.FieldsRegion)}
            data-toggle="modal" data-target="#coffeeDataModal"
            ></i>
          <div className="tableHolder">
            <SchemaTable
              id="region"
              schema={coffeeSchemas.FieldsRegion}
              updateData={this.requestToUpdateData.bind(this)}/>
          </div>
        </div>
      </div>
    );
  }
}
