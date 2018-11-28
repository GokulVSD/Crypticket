'use strict';

const e = React.createElement;

let tickets = [
    { value: ""},
    { value: ""},
    { value: ""}
  ];

class Ticket extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return tickets.map(ticket => {
        return e(
            'div',
            { className : "ticket" },
            ticket.value
        );
    });
  }
}

document.querySelectorAll("#tickets-pg").forEach(fragmentContainer => {
    ReactDOM.render(
        e(Ticket, null, null),
        fragmentContainer
    );
});
