import React from 'react';
import ReactDOM from 'react-dom';

export default class SchemaHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  renderTitles(){
    return this.props.schema.map((eachItem)=>{
      return (
        <th key={eachItem.value}>{eachItem.name}</th>
      );
    });
  }

  render() {
    return (
      <thead>
        <tr>
          {this.renderTitles()}
          <th></th>
        </tr>
      </thead>
    );
  }
}
