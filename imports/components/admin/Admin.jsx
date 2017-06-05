import React from 'react';
import ReactDOM from 'react-dom';
import UserAdmin from './userAdmin/UserAdmin';
import EventAdmin from './eventAdmin/EventAdmin';
import CoffeeAdmin from './coffeeAdmin/CoffeeAdmin';
import "./admin.less";


export default Admin = class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: false,
    };
  }

  returnAdminComponents(){
    return ([
      {_id: 1, adminComponent: "userAdmin", title: "使用者", componentName: "UserAdmin", tag: <UserAdmin/>},
      {_id: 2, adminComponent: "coffeeAdmin", title: "咖啡資料", componentName: "CoffeeAdmin", tag: <CoffeeAdmin/>},
      {_id: 3, adminComponent: "eventAdmin", title: "活動", componentName: "EventAdmin", tag: <EventAdmin/>}
    ])
  }

  renderAdminItems(){
    var adminItems = this.returnAdminComponents().map(item => (
      <div
        key={item._id} onClick={()=>this.selectAdminItem(item)}
        className="adminItemTitle">
        {item.title}
      </div>
    ));

    return adminItems;
  }

  selectAdminItem(item){
    this.setState({view: item.adminComponent});
    return false;
  }

  renderAdminView(){
    var view = this.state.view;
    var componentSelection = this.returnAdminComponents().map(function(item){
      if(view==item.adminComponent){
        return (
          <div key={item._id}>
            {item.tag}
          </div>
        );
      };
    });
    return componentSelection;
  }


  render() {
    return (
      <div>
        <div id="admin">
          <div id="controlPanel" className="col-sm-2">
            {this.renderAdminItems()}
          </div>
          <div id="displayPanel" className="col-sm-10">
            {this.renderAdminView()}
          </div>
        </div>
      </div>
    );
  }
}
