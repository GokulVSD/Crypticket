'use strict';

import Ticket from "./ticket.js";

const e = React.createElement;

class TicketsTab extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tickets: retrieveObject("tickets"),
      buffer: ""
    };
  }

  //Optimization
  shouldComponentUpdate(nextProps, nextState) {

    if (this.state.buffer != nextState.buffer && nextState.buffer != "") {
      return false;
    }
    return true;
  }

  addTicket(key) {

    if (key.keyCode === 13) {

      var newCrypticket = this.state.buffer.trim();

      $("#ticket-add-field").val("").blur();

      if (newCrypticket == '') return;

      var ticketAppend, details, url, coords, newTicket;

      try {

        ticketAppend = newCrypticket.split(";");
        ticketAppend.shift();

        details = ticketAppend[0].split(":");
        url = ticketAppend[1];
        coords = ticketAppend[2].split(":");

        newTicket = {
          name: atob(details[0]),
          secret: newCrypticket,
          date: atob(details[1]),
          time: atob(details[2])
        };

      } catch (e) {
        console.log("invalid ticket, possibly didn't use copy paste");
        return;
      }


      if (url != undefined) newTicket.link = atob(url);

      if (coords[0] != "") {
        newTicket.x = atob(coords[0]);
        newTicket.y = atob(coords[1]);
      }

      var newTickets = this.state.tickets;
      newTickets.unshift(newTicket);

      storeObject("tickets", newTickets);

      this.setState({
        tickets: newTickets,
        buffer: ""
      });
    }
  }

  keyboardBuffer(event) {

    var l = event.target.value.length;
    var i = 0;
    var temp = event.target.value;

    if (l > 16) {

      i = event.target.value.indexOf(';');

      $(ReactDOM.findDOMNode(this)).val(event.target.value.slice(0, i < 0 ? l : i));
    }

    this.setState({
      tickets: this.state.tickets,
      buffer: temp
    });
  }

  deleteTicket(ticket) {

    var tickets = this.state.tickets;
    tickets.splice(tickets.indexOf(ticket), 1);

    storeObject("tickets", tickets);

    this.setState({
      tickets: tickets,
      buffer: this.state.buffer
    });
  }

  render() {

    return e(React.Fragment, null,

      e("input",
        {
          type: "text", placeholder: "Add Crypticket", id: "ticket-add-field",
          onKeyDown: key => this.addTicket(key),
          onChange: event => this.keyboardBuffer(event)
        },
        null),

      //Incase no tickets
      (this.state.tickets.length != 0 &&
        e(React.Fragment, null,

          this.state.tickets.map(ticket => {

            return e(Ticket,
              {
                key: ticket.secret,
                ticket: ticket,
                deleteTicket: this.deleteTicket.bind(this)
              },
              null);
          })
        )
      )
    );
  }
}

$("#tickets-tb").each(function (i, ComponentContainer) {
  ReactDOM.render(
    e(TicketsTab, null, null),
    ComponentContainer
  );
});
