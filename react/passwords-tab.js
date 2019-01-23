'use strict';

import Copier from "./copier.js";

const e = React.createElement;

class PasswordsTab extends React.Component {
  constructor(props) {
    super(props);

    let passwords = [
      { name: "password1", password: "test1", appNames: ["Google", "Facebook"] },
      { name: "password2", password: "test2", appNames: ["Amazon"] },
      { name: "password3", password: "test3", appNames: [] }
    ];

    this.state = {
      passwords: passwords
    };
  }

  render() {

    return this.state.passwords.map(password => {
      return e(
        'div',
        { key: password.name + password.password, className: "ticket" },

        e('h1',
          null,
          password.name),

        (password.appNames.length == 0 &&
          e('div',
            null,
            "Generate new passwords using the Create page")
        ),

        password.appNames.map(appName => {
          return e(React.Fragment, { key: appName + password.password },

            e(Copier,
              { title: appName, content: hexToBase64(getECDSAKey(password.password).sign(appName.toUpperCase()).toHex()).slice(0, 16) },
              null),

            e('div', null, null)
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
