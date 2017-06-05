import React from 'react';
import "./footer.less";


export default Footer = class Footer extends React.Component {
  getLinks() {
    return [
//      {_id: 1, href: '/about', text: '關於我們'},
//      {_id: 2, href: '/qa', text: '常見問題'},
//      {_id: 3, href: '/contact', text: '聯絡我們'},
//      {_id: 4, href: '/terms', text: '服務條款'},
    ];
  }

  footerLink(){
    var returnLink = this.getLinks().map(function(link){
      console.log(link.text);

      return (
        <div key={link._id} href={link.href} className='footerItem col-sm-2'>
          {link.text}
        </div>
      )
    });

    return returnLink;
  }

  render(){
    return (
      <div id="mainFooter">
        <div className="container clearfix mainFooter">
          <div className='row'>
            <div className='col-md-8'>
              {this.footerLink()}
            </div>
            <div className='col-md-4'>

              <div className='footerItem col-sm-8'>
                  ©Dao Coffee 2017
              </div>
              <div className= "footerLogo col-sm-4">
                  <img src="images/dao_logo_white.png" alt="dao" width="120"/>
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
};
