import SecretCopier from "./secret-copier.js";
import LabelledInput from "./labelled-input.js";

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

        this.props.removeChild(this.props.name, this.props.password, this.props.type);
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
    newInput(key) {

        if (key.keyCode === 13) {

            var appName = this.state.buffer.trim();
            $(".app-inputs").val("").blur();

            if (appName == "" || appName == undefined) {

                this.doFailureAnimation();
                return;
            }

            var pass = this.state.key.sign(appName.toUpperCase()).toHex();

            pass = hexToBase64(pass).slice(0, 12).replace(/\//g, "x") + "+0Pw";

            if (addApp(this.props.name, this.props.password, appName)) {

                this.doFailureAnimation();

                $(".modal-body").html("Looks like you've already created a password for this website/app. If you really need another one, change the name a bit");
                $("#modal").modal("show");

                return;
            }

            // clipboard API
            navigator.clipboard.writeText(pass);

            this.doSuccessAnimation();

            //Inform the user "copied to clipboard, you can find the password in the passwords tab in view".
            ReactTooltip.show(ReactDOM.findDOMNode(this.refs[this.props.name + this.props.password + this.props.type]));

            setTimeout(() => ReactTooltip.hide(ReactDOM.findDOMNode(this.refs[this.props.name + this.props.password + this.props.type])), 2000 );

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

    doSuccessAnimation() {

        setTimeout(() => {
            $(ReactDOM.findDOMNode(this)).addClass("bg-green");
            setTimeout(() => {
                $(ReactDOM.findDOMNode(this)).removeClass("bg-green")
            }, 50);
        }, 1);
    }

    doFailureAnimation() {

        setTimeout(() => {
            $(ReactDOM.findDOMNode(this)).addClass("bg-red");
            setTimeout(() => {
                $(ReactDOM.findDOMNode(this)).removeClass("bg-red")
            }, 50);
        }, 1);
    }

    render() {
        return e("div", { className: "ticket hiding vrf" },

            (this.props.type == 1 &&

                e("div",
                    { className: "gen-counter" },
                    this.state.curr + "/" + this.props.max)
            ),

            (this.props.type == 2 &&

                e("div",
                    { className: "gen-counter pass" },
                    "Passwords")
            ),

            e("h2",
                { className: ("" + (this.props.name.length > 11 ? "s" + (this.props.name.length > 15 ? "s" + (this.props.name.length > 19 ? "s" : "") : "") : "")) },
                this.props.name),

            e("div",
                { className: "ticket-del-btn gen", onClick: () => setTimeout(() => this.animateAndDelete(), 200) },
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

            e(ReactTooltip, { className: "cust-tt", id: 'tt3', effect: "solid" }, null),

            (this.props.type == 2 &&
                e('div',
                    {
                        ref: this.props.name + this.props.password + this.props.type, 'data-tip': "<div>Copied! You can also find it in</div><div>View > Passwords tab</div>",
                        'data-event': 'do-nothing', 'data-html': true, 'data-for': 'tt3', 'data-iscapture': true
                    },
                    e(LabelledInput,
                        {
                            placeholder: "Name of a Website or App, eg: Reddit", classes: "app-inputs", label: "App",
                            inlabel: e("i", { className: "fas fa-plus-circle" }, null),
                            maxlen: "20",
                            useref: this.props.name + this.props.type + this.props.password,
                            newInput: this.newInput.bind(this),
                            keyboardBuffer: this.keyboardBuffer.bind(this)
                        },
                        null)
                )
            )

        );
    }
}

export default Generator;