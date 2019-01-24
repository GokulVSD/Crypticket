const e = React.createElement;

class Verifier extends React.Component {
    constructor(props) {
        super(props);

        var key = getECDSAKey(this.props.password);

        var curr = this.props.curr;

        var verified = this.props.verified;

        this.state = {
            key: key,
            curr: curr,
            verified: verified,
            buffer: ""
        };
    }

    //for when parent passes props with an incremented curr
    componentWillReceiveProps(nextProps) {

        if (nextProps.curr != this.state.curr) {

            this.setState({
                key: this.state.key,
                curr: nextProps.curr,
                verified: nextProps.verified,
                buffer: ""
            });
        }
    }

    verifyTicket(key) {

        if (key.keyCode === 13) {

            var ticket = this.state.buffer.trim();
            $(".verifier-inputs").val("").blur();

            var msg = ticket.slice(0, ticket.indexOf('|'));

            var sign = ticket.slice(ticket.lastIndexOf('|') + 1, ticket.indexOf(';'));

            if (msg == "" || sign == "") {
                console.log("invalid format");
                return;
            }

            try {

                if (this.state.key.verify(msg, base64ToHex(sign))) {

                    console.log("ticket was generated using the correct password");

                    var verified = this.state.verified;

                    if (verified.indexOf(msg) > -1) {

                        console.log("ticket has already been verified");
                        return;

                    } else {

                        if (parseInt(msg) > this.props.max) {
                            //ticket is out of range
                            console.log("Ticket is out of range, must be malicious");
                            return;
                        } 

                        if (this.state.curr == this.props.max) {
                            //all tickets have been verified
                            console.log("all tickets verified, can't verify anymore, delete the verifier from the Create page");
                            return;
                        }

                        this.props.updateChild(this.props.name, this.props.password, msg);

                        return;
                    }
                } else {

                    console.log("ticket was not generated using the correct password");

                }
            } catch (e) {

                console.log("Failed: The ticket contains invalid characters |" + e);

            }

            this.setState({
                key: this.state.key,
                curr: this.state.curr,
                verified: this.state.verified,
                buffer: ""
            });
        }
    }

    keyboardBuffer(event) {

        this.setState({
            key: this.state.key,
            curr: this.state.curr,
            verified: this.state.verified,
            buffer: event.target.value
        });
    }

    render() {
        return e(React.Fragment, null,

            e("div",
                { className: "gen-counter" },
                this.state.curr + "/" + this.props.max),

            e("div",
                null,
                this.props.name),

            e("input",
                {
                    type: "text", placeholder: "Enter Ticket Here", className: "verifier-inputs",
                    onKeyDown: key => this.verifyTicket(key),
                    onChange: event => this.keyboardBuffer(event)
                },
                null),

            e("div", null, null),

            e("div",
                { className: "creator-btn", onClick: () => this.verifyTicket({ keyCode: 13 }) },
                "Verify")
        );
    }
}

export default Verifier;