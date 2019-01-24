'use strict';

import Ticket from "./ticket.js";

const e = React.createElement;

class TicketsTab extends React.Component {

  constructor(props) {
    super(props);

    //Do ticket processing here, retrieve from local storage and parse into the following format:
    let tickets = [
      { name: "Event Uno", secret: "001|Y|BNhjb45JHDsdfsfhdgF;sometext;", date: "Sep 25, 2018", time: "9:30 AM", link: "www.google.com", x: 12.934634, y: 77.611284 },
      { name: "Event Dos", secret: "002|Y|4dfgNhjb45JHfgDF;sometext;", date: "Oct 25, 2018", time: "11:30 PM", x: 45.345564, y: 112.345346 },
      { name: "Event Tres", secret: "001|Y|5Nhjb45JHDsdfsfhdgF;sometext;", date: "Nov 25, 2018", time: "9:30 AM", link: "www.google.com" },
      { name: "Event Quatro", secret: "003|Y|2Ndfghhjb45gdJHDF;sometext;", date: "Dec 25, 2018", time: "5:30 AM" }
    ];

    this.state = {
      tickets: tickets,
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
        console.log("invalid ticket");
        return;
      }


      if (url != undefined) newTicket.link = atob(url);

      if (coords[0] != "") {
        newTicket.x = atob(coords[0]);
        newTicket.y = atob(coords[1]);
      }

      var newTickets = this.state.tickets;
      newTickets.unshift(newTicket);

      this.setState({
        tickets: newTickets,
        buffer: ""
      });
    }
  }

  keyboardBuffer(event) {

    this.setState({
      tickets: this.state.tickets,
      buffer: event.target.value
    });
  }

  deleteTicket(ticket) {

    var tickets = this.state.tickets;
    tickets.splice(tickets.indexOf(ticket), 1);

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
