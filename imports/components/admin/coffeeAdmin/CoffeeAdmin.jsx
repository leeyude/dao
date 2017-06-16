import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import {Tracker} from "meteor/tracker";

import RawBeanAdmin from './RawBeanAdmin';
import RoastedBeanAdmin from './RoastedBeanAdmin';
import OtherProductionRelatedAdmin from './OtherProductionRelatedAdmin';


export default CoffeeAdmin = class CoffeeAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      typeName: "Raw Bean",
    };
  }

  renderCoffeeManagementOption(){
    var coffeeManagementType = [
      {_id: 1, typeName: "Raw Bean", typeTitle: "生豆"},
      {_id: 2, typeName: "Roasted Bean", typeTitle: "熟豆"},
      {_id: 3, typeName: "Other Production-related", typeTitle: "其他生產相關"}
    ];

    var currentBeanManagementType = this.state.typeName;

    var beanManagementTypeOutput = coffeeManagementType.map(function(type){
      if(type.typeName == currentBeanManagementType){
        return (
          <div key={type._id} className="userType selected">
            {type.typeTitle}
          </div>
        );
      }else{
        return (
          <div key={type._id} className="userType" onClick={()=>this.selectManagementType(type)}>
            {type.typeTitle}
          </div>
        );
      };
    }.bind(this));

    return beanManagementTypeOutput;
  }

  selectManagementType(type){
    this.setState({typeName: type.typeName});
    return false;
  }

  renderCoffeeManagementColumn(){
    if(this.state.typeName == "Raw Bean"){
      return (
        <div className="RawBeanBlock">
          <RawBeanAdmin/>
        </div>
      );
    }else if(this.state.typeName == "Roasted Bean"){
      return (
        <div className="RoastedBeanBlock">
          <RoastedBeanAdmin/>
        </div>
      );
    }else{
      return (
        <div className="OtherProductionRelatedBlock">
          <OtherProductionRelatedAdmin/>
        </div>
      );
    };
  }

  render() {
    return (
      <div id="coffeeAdmin">
        <div id="coffeeBeanManagementType" className="row">
          <div className="userTypeBlock">
            {this.renderCoffeeManagementOption()}
          </div>
        </div>
        {this.renderCoffeeManagementColumn()}
      </div>
    );
  }
}
