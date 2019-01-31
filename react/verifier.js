import LabelledInput from "./labelled-input.js";

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

    //Optimization
    shouldComponentUpdate(nextProps, nextState) {

        if (this.state.buffer != nextState.buffer && nextState.buffer != "") {
            return false;
        }
        return true;
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

    newInput(key) {

        if (key.keyCode === 13) {

            var ticket = this.state.buffer.trim();
            $(".verifier-inputs").val("").blur();

            if (this.state.curr == this.props.max) {
                //all tickets have been verified

                $(".modal-body").html("All Cryptickets for this event have been verified, delete this Verifier from the Create page");
                $("#modal").modal("show");
                return;
            }

            var msg = ticket.slice(0, ticket.indexOf('|'));

            var sign = ticket.slice(ticket.lastIndexOf('|') + 1, ticket.indexOf(';') > 0 ? ticket.indexOf(';') : ticket.length);

            if (msg == "" || sign == "") {
                console.log("invalid format");
                this.doFailureAnimation();
                return;
            }

            var correctsign = hexToBase64(this.state.key.sign(msg).toHex());

            try {

                if (correctsign.substring(0, 12) === sign.replace(/&/g, "I").replace(/@/g, "l")) {

                    console.log("ticket was generated using the correct password");

                    var verified = this.state.verified;

                    if (verified.indexOf(msg) > -1) {

                        console.log("ticket has already been verified");
                        this.doFailureAnimation();
                        return;

                    } else {

                        if (parseInt(msg) > this.props.max) {
                            //ticket is out of range
                            console.log("Ticket is out of range, must be malicious");
                            this.doFailureAnimation();
                            return;
                        }

                        this.doSuccessAnimation();

                        this.props.updateChild(this.props.name, this.props.password, msg);

                        return;
                    }
                } else {

                    console.log("ticket was not generated using the correct password");
                    this.doFailureAnimation();

                }
            } catch (e) {

                console.log("Failed: The ticket contains invalid characters |" + e);
                this.doFailureAnimation();

            }

            this.setState({
                key: this.state.key,
                curr: this.state.curr,
                verified: this.state.verified,
                buffer: ""
            });
        }
    }

    doSuccessAnimation() {

        setTimeout(() => {
            $(ReactDOM.findDOMNode(this).parentNode).addClass("bg-green");
            setTimeout(() => {
                $(ReactDOM.findDOMNode(this).parentNode).removeClass("bg-green")
            }, 50);
        }, 80);
    }

    doFailureAnimation() {

        setTimeout(() => {
            $(ReactDOM.findDOMNode(this).parentNode).addClass("bg-red");
            setTimeout(() => {
                $(ReactDOM.findDOMNode(this).parentNode).removeClass("bg-red")
            }, 50);
        }, 80);
    }

    keyboardBuffer(event) {

        var l = event.target.value.length;
        var i = 0;

        if (l > 16) {

            i = event.target.value.indexOf(';');

            $(ReactDOM.findDOMNode(this)).next().next().children("input").val(event.target.value.slice(0, i < 0 ? l : i));
        }

        this.setState({
            key: this.state.key,
            curr: this.state.curr,
            verified: this.state.verified,
            buffer: event.target.value.slice(0, i < 0 ? l : i)
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

            e(LabelledInput,
                {
                    placeholder: "Paste or Enter Here", classes: "verifier-inputs", label: "Crypticket",
                    inlabel: e("img", { src: "assets/logo-ticket.png", style: { width: "25px", filter: "brightness(0) invert(1)", marginBottom: "3px" } }, null),
                    newInput: this.newInput.bind(this),
                    keyboardBuffer: this.keyboardBuffer.bind(this)
                },
                null),

            e("div", null, null),

            e("div",
                { className: "bnr-btn nibnr what", onClick: () => this.newInput({ keyCode: 13 }) },
                e("i", { className: "fas fa-check-circle" }, null), " Verify ")
        );
    }
}

export default Verifier;