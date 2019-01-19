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

    verifyTicket(key) {

        if (key.keyCode === 13) {

            var ticket = this.state.buffer.trim();
            $(".verifier-inputs").val("").blur();

            var msg = ticket.slice(0, ticket.indexOf('|'));

            var sign = ticket.slice(ticket.lastIndexOf('|') + 1, ticket.indexOf(';'));

            if(msg == "" || sign == ""){
                console.log("invalid format");
                return;
            }

            try {

                if (this.state.key.verify(msg, base64ToHex(sign))) {
                    console.log("ticket verified");

                    //incomplete, also check if already verified
                    var verified = this.state.verified

                    this.setState({
                        key: this.state.key,
                        curr: this.state.curr + 1,
                        verified: 
                    });

                } else {
                    console.log("ticket verification failed");

                }
            } catch(e) {
                console.log("Failed: The key contains invalid characters");

            }
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
                { className: "creator-btn" },
                "Verify")
        );
    }
}

export default Verifier;