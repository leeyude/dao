import React from 'react';
import ReactDOM from 'react-dom';
import SchemaHeader from './SchemaHeader';
import SchemaContent from './SchemaContent';

export default class SchemaTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <table id={this.props.id} className="table table-striped table-hover">
        <SchemaHeader schema={this.props.schema}/>
        <SchemaContent id={this.props.id} schema={this.props.schema}
        updateData={this.props.updateData}/>
      </table>
    );
  }
}
