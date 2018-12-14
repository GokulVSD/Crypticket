'use strict';

import SecretCopier from "./react-secret-copier.js";
import Copier from "./react-copier.js";

const e = React.createElement;

let tickets = [
  // { name: "Event Uno", secret: "001|Y|BNhjb45JHDsdfsfhdgF", date: "Sep 25, 2018", time: "9:30 AM UTC", link: "www.google.com", x: 45.345564, y: 112.345346 },
  // { name: "Event Dos", secret: "002|Y|4dfgNhjb45JHfgDF", date: "Oct 25, 2018", time: "11:30 PM UTC", x: 45.345564, y: 112.345346 },
  // { name: "Event Tres", secret: "001|Y|5Nhjb45JHDsdfsfhdgF", date: "Nov 25, 2018", time: "9:30 AM UTC", link: "www.google.com" },
  // { name: "Event Quatro", secret: "003|Y|2Ndfghhjb45gdJHDF", date: "Dec 25, 2018", time: "5:30 AM UTC" }
];

class TicketsTab extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return e(React.Fragment, null,

      e("input",
        { type: "text", placeholder: "Add Ticket", id: "ticket-add-field" },
        null),

      //Incase no tickets
      (tickets.length != 0 &&
        e(React.Fragment, null,

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

              e(SecretCopier,
                { secret: ticket.secret },
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

              (ticket.link != undefined &&
                e("div",
                  { className: "opt-link", onClick: () => window.open("http://" + ticket.link) },
                  ticket.link)
              ),

              (ticket.x != undefined &&
                e("div",
                  null,

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
                  )
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
