import SecretCopier from "./secret-copier.js";

const e = React.createElement;

class Generator extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return e(React.Fragment, null,

            (this.props.type == 1 &&

                e("span",
                    null,
                    this.props.curr + "/" + this.props.max)
            ),

            e("span",
                null,
                this.props.name),

            e("div",
                { className: "ticket-del-btn" },
                e("i",
                    { className: "far fa-trash-alt" },
                    null)
            ),

            (this.props.type == 1 &&
                e(SecretCopier,
                    { secret: this.props.password }, //replace this with the secret generated for curr with password
                    null)
            )

        );
    }
}

export default Generator;