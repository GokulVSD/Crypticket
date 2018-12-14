'use strict';

const e = React.createElement;

let tickets = [
  { name: "Event Uno", secret: "001|Y|BNhjb45JHDsdfsfhdgF", date: ""},
  { name: "Event Dos", secret: "002|Y|4dfgNhjb45JHfgDF" },
  { name: "Event Tres", secret: "003|Y|2Ndfghhjb45gdJHDF" }
];

class TicketsTab extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return e("div", null,

      e("input",
        { type: "text", placeholder: "Add Ticket", id: "ticket-add-field" },
        null),

      e("div",
        { id: "ticket-del-btn" },
        e("i",
          { className: "far fa-trash-alt" },
          null)
      ),

      tickets.map(ticket => {
        return e(
          'div',
          { key: ticket.secret, className: "ticket" },

          e("h1",
            null,
            ticket.name),

          e("SecretCopier",
          { secret: ticket.secret },
          null),

          e("span",
          { className: "date"},
          ticket.date),

          e("span",
          { className: "time"},
          ticket.time),
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
