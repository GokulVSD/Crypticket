import SecretCopier from "./secret-copier.js";

const e = React.createElement;

class Generator extends React.Component {
    constructor(props) {
        super(props);

        var key = getECDSAKey(this.props.password);

        if (this.props.type == 1) {

            var curr = this.props.curr;

            var sign = key.sign(curr.toString()).toHex();
            sign = hexToBase64(sign);

            this.state = {
                key: key,
                curr: curr,
                sign: sign
            };
        } else {

            this.state = {
                key: key,
                buffer: ""
            };
        }
    }

    //for delete animation
    animateAndDelete() {

        $(ReactDOM.findDOMNode(this)).addClass("hiding");

        setTimeout(function () {
            this.props.removeChild(this.props.name, this.props.password, this.props.type);
        }.bind(this), 230);
    }

    //for event generator
    incAndUpdate() {

        var newCurr = this.state.curr + 1;

        if (newCurr > this.props.max) {
            return;
        }

        var newSign = this.state.key.sign(newCurr.toString(16).toUpperCase()).toHex();

        newSign = hexToBase64(newSign);

        this.setState({
            key: this.state.key,
            curr: newCurr,
            sign: newSign
        });
    }

    //these two functions are for password generator

    addPassword(key) {

        if (key.keyCode === 13) {

            var appName = this.state.buffer.trim();
            $(".app-name-inputs").val("").blur();

            var pass = this.state.key.sign(appName.toUpperCase()).toHex();

            pass = hexToBase64(pass);

            // clipboard API
            navigator.clipboard.writeText(pass);

            /*
            Inform the user "copied to clipboard, you can find the password in the passwords tab in tickets".
            Backup appName to localstorage for this.props.name and call a force update to passwords-tab.
            */

            this.setState({
                key: this.state.key,
                buffer: ""
            });
        }
    }

    keyboardBuffer(event) {

        this.setState({
            key: this.state.key,
            buffer: event.target.value
        });
    }

    render() {
        return e("div", { className: "ticket" },

            (this.props.type == 1 &&

                e("div",
                    { className: "gen-counter" },
                    this.state.curr + "/" + this.props.max)
            ),

            e("div",
                null,
                this.props.name),

            e("div",
                { className: "ticket-del-btn gen", onClick: () => this.animateAndDelete() },
                e("i",
                    { className: "far fa-trash-alt" },
                    null)
            ),

            (this.props.type == 1 &&
                e(SecretCopier,
                    {
                        curr: this.state.curr.toString(),
                        sign: this.state.sign,
                        ticketAppend: this.props.ticketAppend,
                        incAndUpdate: this.incAndUpdate.bind(this)
                    },
                    null)
            ),

            //might have to replace this in the future if you want the copy button for the input
            (this.props.type == 2 &&
                e("input",
                    {
                        type: "text", placeholder: "Website or App Name", className: "app-name-inputs",
                        onKeyDown: key => this.addPassword(key),
                        onChange: event => this.keyboardBuffer(event)
                    },
                    null)
            )

        );
    }
}

export default Generator;