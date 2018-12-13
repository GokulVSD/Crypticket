'use strict';

class PasswordsTab extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return tickets.map(ticket => {
        return e(
            'div',
            { className : "ticket" },
            ticket.value + "passwords"
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
