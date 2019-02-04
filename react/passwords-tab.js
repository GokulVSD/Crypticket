'use strict';

import Copier from "./copier.js";

const e = React.createElement;

class PasswordsTab extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      passwords: retrieveObject("passwords")
    };
  }

  //used to add functions to the window for updates from Generators
  componentDidMount() {

    window.newUsername = this.newUsername.bind(this);
    window.deleteUsername = this.deleteUsername.bind(this);
    window.addApp = this.addApp.bind(this);
  }

  newUsername(name, password) {

    var password = { name: name, password: password, appNames: [] };

    var passwords = this.state.passwords;

    passwords.unshift(password);

    storeObject("passwords", passwords);

    this.setState({
      passwords: passwords
    });
  }

  deleteUsername(name) {

    var passwords = this.state.passwords;

    var newpasswords = passwords.filter(p => {
      if (p.name == name) {
        return false;
      } else {
        return true;
      }
    });

    storeObject("passwords", newpasswords);

    this.setState({
      passwords: newpasswords
    });
  }

  addApp(name, password, appName) {

    var passwords = this.state.passwords;

    var index = passwords.findIndex(p => p.name == name && p.password == password);

    if (passwords[index].appNames.findIndex(a => a == appName) > -1) return true;

    passwords[index].appNames.push(appName);

    storeObject("passwords", passwords);

    this.setState({
      passwords: passwords
    });

    return false;
  }

  render() {

    if (this.state.passwords.length == 0) {
      return e('div',
        { className: "empty-div" },
        "Create Passwords from the Create page, they'll show up here");
    }

    return this.state.passwords.map(password => {
      return e(
        'div',
        { key: password.name + password.password, className: "ticket" },

        e('h1',
        { className: ("" + (password.name.length > 11 ? "s" + (password.name.length > 15 ? "s" + (password.name.length > 19 ? "s" : "") : "") : "")) },
          password.name),

        (password.appNames.length == 0 &&
          e('div',
            { className: "empty-div" },
            "Generate new passwords for this Username from the Create page")
        ),

        password.appNames.map(appName => {
          return e(React.Fragment, { key: appName + password.password },

            e("div", { className: "input-container wide cpr pswdinp", 'data-tip': "Copied!", 'data-event': 'click', 'data-event-off' : 'nothing', 'data-for': 'tt2' },
              e(Copier,
                { title: appName, content: hexToBase64(getECDSAKey(password.password).sign(appName.toUpperCase()).toHex()).slice(0, 12).replace(/\//g, "x") + "+0Pw" },
                null),
                e(ReactTooltip, { id: 'tt2', effect: "solid" }, null)
            )
          );
        })
      );
    });
  }
}

$("#passwords-tb").each(function (i, ComponentContainer) {
  ReactDOM.render(
    e(PasswordsTab, null, null),
    ComponentContainer
  );
});
