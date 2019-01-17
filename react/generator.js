import SecretCopier from "./secret-copier.js";

const e = React.createElement;

class Generator extends React.Component {
    constructor(props) {
        super(props);

        var key = getECDSAKey(this.props.password);

        var curr = this.props.curr;

        var sign = key.sign( curr.toString(16).toUpperCase() ).toHex();
        sign = hexToBase64(sign);

        this.state = {
            key: key,
            curr: curr,
            sign: sign
        };
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
                    { secret: this.state.sign }, //replace this with the secret generated for curr with password
                    null)
            ),

            (this.props.type == 2 &&
                e("input",
                    { type: "text", placeholder: "Website or App" }, //replace this with the secret generated for curr with password
                    null)
            )

        );
    }
}

export default Generator;