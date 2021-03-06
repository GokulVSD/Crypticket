import SecretCopier from "./secret-copier.js";
import Copier from "./copier.js";

const e = React.createElement;

class Ticket extends React.Component {
    constructor(props) {
        super(props);
    }

    //for adding crypticket animation
    componentDidMount() {

        setTimeout(function () {
            $(ReactDOM.findDOMNode(this)).removeClass("hiding");
        }.bind(this), 1);
    }

    //for delete animation
    animateAndDelete() {

        $(ReactDOM.findDOMNode(this)).addClass("hiding");

        setTimeout(function () {
            this.props.deleteTicket(this.props.ticket);
        }.bind(this), 300);
    }

    render() {
        return e('div',
            { className: "ticket hiding" },

            e("div",
                { className: "ticket-del-btn gen tick", onClick: () => setTimeout( () => this.animateAndDelete(), 200) },
                e("i",
                    { className: "far fa-trash-alt" },
                    null)
            ),

            e("h1",
                { className: ("" + (this.props.ticket.name.length > 11 ? "s" + (this.props.ticket.name.length > 15 ? "s" + (this.props.ticket.name.length > 19 ? "s" : "") : "") : "")) },
                this.props.ticket.name),

            e(SecretCopier,
                {
                    curr: this.props.ticket.secret.slice(0, this.props.ticket.secret.indexOf('|')),
                    sign: this.props.ticket.secret.slice(this.props.ticket.secret.lastIndexOf('|') + 1, this.props.ticket.secret.indexOf(';')),
                    ticketAppend: this.props.ticket.secret.slice(this.props.ticket.secret.indexOf(';')),
                },
                null),


            e("div",
                { className: "input-container wide secret ns" },
                e("div", null, this.props.ticket.date)
            ),

            e("div",
                { className: "input-container wide secret ns" },
                e("div", null, this.props.ticket.time)
            ),

            //Optional ticket parameters

            //Links
            (this.props.ticket.link != undefined && this.props.ticket.link != "" &&
                e("div",
                    { className: "opt-link", onClick: () => window.open("http://" + this.props.ticket.link), 'data-tip': "Visit Link", 'data-for': 'tt' },
                    this.props.ticket.link
                )
            ),

            e("div", null, null),

            //Location + Navigation
            (this.props.ticket.x != undefined &&
                e(React.Fragment, null,

                    e("h6",
                        { className: "head-title intick" },
                        e("i", { className: "fas fa-map-marker-alt" }, null),
                        " Location"),

                    e("div", null, null),

                    e("div",
                        { className: "input-container half cpr", 'data-tip': "Copied!", 'data-event': 'click', 'data-event-off' : 'nothing', 'data-for': 'tt1', 'data-iscapture':true },
                        e(Copier,
                            { title: "X", content: this.props.ticket.x },
                            null)
                    ),

                    e("div",
                        { className: "input-container half cpr", 'data-tip': "Copied!", 'data-event': 'click', 'data-event-off' : 'nothing', 'data-for': 'tt1', 'data-iscapture':true },
                        e(Copier,
                            { title: "Y", content: this.props.ticket.y },
                            null)
                    ),

                    e(ReactTooltip, { className: "cust-tt", id: 'tt1', effect: "solid" }, null),
                    e(ReactTooltip, { className: "cust-tt", id: 'tt' }, null),

                    e("div", null, null),

                    e("div",
                        { className: "bnr-btn nibnr", onClick: () => setTimeout(() => window.open("https://www.google.com/maps/dir/my+location/" + this.props.ticket.x + "," + this.props.ticket.y), 200) },
                        e("i", { className: "fas fa-location-arrow" }, null),
                        " Start Navigation")
                )
            )
        );
    }
}

export default Ticket;