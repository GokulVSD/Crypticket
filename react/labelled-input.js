const e = React.createElement;

class LabelledInput extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return e(React.Fragment, null,

            e("div", { className: "input-container wide" },
                e("span",
                    { className: "labels" },
                    this.props.inlabel, " " + this.props.label),

                e("input",
                    {
                        type: "text",
                        spellCheck: "false",
                        maxLength: this.props.maxlen == undefined ? "1000000000" : this.props.maxlen,
                        placeholder: this.props.placeholder == undefined ? "" : this.props.placeholder,
                        onKeyDown: key => this.props.newInput(key),
                        onChange: event => this.props.keyboardBuffer(event),
                        className: this.props.classes + " inputs"
                    },
                    null)
            )
        );
    }
}

export default LabelledInput;