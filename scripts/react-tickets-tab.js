'use strict';

const e = React.createElement;

let tickets = [
    { value: ""},
    { value: ""},
    { value: ""}
  ];

class TicketsTab extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return tickets.map(ticket => {
        return e(
            'div',
            { className : "ticket" },
            ticket.value + "tickets"
        );
    });
  }
}

$("#tickets-tb").each(function(i,ComponentContainer) {
    ReactDOM.render(
        e(TicketsTab, null, null),
        ComponentContainer
    );
});
