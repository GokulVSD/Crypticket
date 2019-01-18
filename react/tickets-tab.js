'use strict';

import SecretCopier from "./secret-copier.js";
import Copier from "./copier.js";

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

      //Do secret validation and evaluation here
      if (newCrypticket == '') return;

      var ticketAppend = newCrypticket.split(";");
      ticketAppend.shift();

      var details = ticketAppend[0].split(":");
      var url = ticketAppend[1];
      var coords = ticketAppend[2].split(":"); console.log(details);console.log(url);console.log(coords);

      var newTicket = {
        name: atob(details[0]),
        secret: newCrypticket,
        date: atob(details[1]),
        time: atob(details[2])
      };

      if(url != undefined) newTicket.link = atob(url);

      if(coords[0] != "") {
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

  render() {

    return e(React.Fragment, null,

      e("input",
        {
          type: "text", placeholder: "Add Ticket", id: "ticket-add-field",
          onKeyDown: key => this.addTicket(key),
          onChange: event => this.keyboardBuffer(event)
        },
        null),

      //Incase no tickets
      (this.state.tickets.length != 0 &&
        e(React.Fragment, null,

          e("div",
            { className: "ticket-del-btn" },
            e("i",
              { className: "far fa-trash-alt" },
              null)
          ),

          this.state.tickets.map(ticket => {
            return e(
              'div',
              { key: ticket.secret, className: "ticket" },

              e("h1",
                null,
                ticket.name),

              e(SecretCopier,
                {
                  curr: ticket.secret.slice(0, ticket.secret.indexOf('|')),
                  sign: ticket.secret.slice(ticket.secret.lastIndexOf('|') + 1, ticket.secret.indexOf(';')),
                  ticketAppend: ticket.secret.slice(ticket.secret.indexOf(';'))
                },
                null),

              e("div",
                null,

                e("span",
                  null,
                  ticket.date),

                e("span",
                  null,
                  ticket.time)
              ),

              //Optional ticket parameters

              //Links
              (ticket.link != undefined &&
                e("div",
                  { className: "opt-link", onClick: () => window.open("http://" + ticket.link) },
                  ticket.link)
              ),

              //Location + Navigation
              (ticket.x != undefined &&
                e(React.Fragment, null,

                  e("h6",
                    null,
                    "LOCATION"),

                  e("span",
                    null,
                    e(Copier,
                      { title: "X", content: ticket.x },
                      null)
                  ),

                  e("span",
                    null,
                    e(Copier,
                      { title: "Y", content: ticket.y },
                      null)
                  ),

                  e("div",
                    { className: "nav-btn", onClick: () => window.open("https://www.google.com/maps/dir/my+location/" + ticket.x + "," + ticket.y) },
                    "START NAVIGATION")
                )
              )
            );
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
