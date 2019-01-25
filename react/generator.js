import SecretCopier from "./secret-copier.js";

const e = React.createElement;

class Generator extends React.Component {
    constructor(props) {
        super(props);

        var key = getECDSAKey(this.props.password);

        if (this.props.type == 1) {

            var curr = this.props.curr;

            var sign = key.sign(curr.toString()).toHex();
            sign = hexToBase64(sign).substring(0, 12).replace(/I/g, "&").replace(/l/g, "@");

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

    //Optimization
    shouldComponentUpdate(nextProps, nextState) {

        if (this.props.type == 2) {

            if (this.state.buffer != nextState.buffer && nextState.buffer != "") {
                return false;
            }
            return true;
        }
        return true;
    }

    //for when parent passes props with an incremented curr
    componentWillReceiveProps(nextProps) {

        if (nextProps.curr != this.state.curr) {

            var sign = this.state.key.sign(nextProps.curr.toString()).toHex();
            sign = hexToBase64(sign).substring(0, 12).replace(/I/g, "&").replace(/l/g, "@");

            this.setState({
                key: this.state.key,
                curr: nextProps.curr,
                sign: sign
            });
        }
    }

    //for adding generator animation
    componentDidMount() {

        setTimeout(function () {
            $(ReactDOM.findDOMNode(this)).removeClass("hiding");
        }.bind(this), 1);
    }

    //for delete animation
    animateAndDelete() {

        $(ReactDOM.findDOMNode(this)).addClass("hiding");

        setTimeout(function () {
            this.props.removeChild(this.props.name, this.props.password, this.props.type);
        }.bind(this), 300);
    }

    //for event generator
    incAndUpdate() {

        var newCurr = this.state.curr + 1;

        if (newCurr > this.props.max) {
            return;
        }

        this.props.updateChild(this.props.name, this.props.password);
    }

    //these two functions are for password generator
    addPassword(key) {

        if (key.keyCode === 13) {

            var appName = this.state.buffer.trim();
            $(".app-name-inputs").val("").blur();

            var pass = this.state.key.sign(appName.toUpperCase()).toHex();

            pass = hexToBase64(pass).slice(0, 12).replace(/\//g, "x") + "+0Pw";

            addApp(this.props.name, this.props.password, appName);

            // clipboard API
            navigator.clipboard.writeText(pass);

            //Inform the user "copied to clipboard, you can find the password in the passwords tab in view".

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
        return e("div", { className: "ticket hiding" },

            (this.props.type == 1 &&

                e("div",
                    { className: "gen-counter" },
                    this.state.curr + "/" + this.props.max)
            ),

            e("h2",
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