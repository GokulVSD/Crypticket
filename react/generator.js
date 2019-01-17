import SecretCopier from "./secret-copier.js";

const e = React.createElement;

class Generator extends React.Component {
    constructor(props) {
        super(props);

        var key = getECDSAKey(this.props.password);

        var curr = this.props.curr;

        var sign = key.sign(curr.toString(16).toUpperCase()).toHex();
        sign = hexToBase64(sign);

        this.state = {
            key: key,
            curr: curr,
            sign: sign
        };
    }

    incAndUpdate() {
        
        var newCurr = this.state.curr + 1;

        if( newCurr > this.props.max){
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

    render() {
        return e(React.Fragment, null,

            (this.props.type == 1 &&

                e("div",
                    { className: "gen-counter" },
                    this.state.curr + "/" + this.props.max)
            ),

            e("div",
                null,
                this.props.name),

            e("div",
                { className: "ticket-del-btn gen" },
                e("i",
                    { className: "far fa-trash-alt" },
                    null)
            ),

            (this.props.type == 1 &&
                e(SecretCopier,
                    {
                        curr: this.state.curr,
                        sign: this.state.sign,
                        ticketAppend: this.props.ticketAppend,
                        incAndUpdate: this.incAndUpdate.bind(this)
                    },
                    null)
            ),

            (this.props.type == 2 &&
                e("input",
                    { type: "text", placeholder: "Website or App" }, //replace this when you want to implement password generator
                    null)
            )

        );
    }
}

export default Generator;