import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import {
  CoffeeProcesses,
  CoffeeCultivars,
  CoffeeAreas,
  CoffeeCountries,
  CoffeeRegions
} from '../../../../collections/coffee/coffee.js';

export default class SchemaContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      schema: this.props.schema,
      dataDisplay: false,

    };
  }

  componentDidMount(){
    Tracker.autorun(()=> {
      var subcriptionIsReady = Meteor.subscribe("otherProductionRelatedData", this.state.id);
      if(subcriptionIsReady.ready()){
        if(this.state.id =='process'){
          var dataDisplay = CoffeeProcesses.find().fetch();
        }else if(this.state.id =='cultivar'){
          var dataDisplay = CoffeeCultivars.find().fetch();
        }else if(this.state.id =='area'){
          var dataDisplay = CoffeeAreas.find().fetch();
        }else if(this.state.id =='country'){
          var dataDisplay = CoffeeCountries.find().fetch();
        }else if(this.state.id =='region'){
          var dataDisplay = CoffeeRegions.find().fetch();
        };

        this.setState({dataDisplay: dataDisplay});

      }
    });
  }

  renderTableRows(){
    if(this.state.dataDisplay){
      var schema = this.state.schema;
      return this.state.dataDisplay.map(function(eachItem){
        return <tr
          key={eachItem._id}
          onClick={()=> this.props.updateData(this.props.id, this.props.schema, eachItem)}>
          {schema.map(function(eachSchema){
            return (<td key={eachItem[eachSchema.name]}>
              {eachItem[eachSchema.name]}
            </td>);
          })}
          <td onClick={()=> this.deleteThisData(this.state.id, eachItem)}>
            <div>x</div>
          </td>
        </tr>;
      }.bind(this));
    }
  }

  deleteThisData(id, item){
    Meteor.call("deleteOtherCoffeeData", id, item)
  }

  render() {
    return (
      <tbody>
          {this.renderTableRows()}
      </tbody>
    );
  }
}
