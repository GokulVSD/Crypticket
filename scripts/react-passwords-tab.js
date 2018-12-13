'use strict';

let passwords = [
    { value: "password1"},
    { value: "password2"},
    { value: "password3"}
  ];

class PasswordsTab extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return passwords.map(password => {
        return e(
            'div',
            { key: password.value, className : "ticket" },
            password.value
        );
    });
  }
}

$("#passwords-tb").each(function(i,ComponentContainer) {
    ReactDOM.render(
        e(PasswordsTab, null, null),
        ComponentContainer
    );
});
