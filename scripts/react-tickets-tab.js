'use strict';

const e = React.createElement;

let tickets = [
  { value: "ticket1" },
  { value: "ticket2" },
  { value: "ticket3" }
];

class TicketsTab extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return e("div", null,

      e("input",
        { key: "ticket-input", type: "text", placeholder: "Add Ticket", id: "ticket-add-field" },
        null),

      e("div",
        { key: "ticket-delete", id: "ticket-del-btn" },
        e("i",
          { className: "far fa-trash-alt" },
          null)
      ),

      tickets.map(ticket => {
        return e(
          'div',
          { key: ticket.value, className: "ticket" },
          ticket.value
        );
      })

    );
  }
}

$("#tickets-tb").each(function (i, ComponentContainer) {
  ReactDOM.render(
    e(TicketsTab, null, null),
    ComponentContainer
  );
});
