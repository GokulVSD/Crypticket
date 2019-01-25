const e = React.createElement;

class LabelledInput extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return e(React.Fragment, null,

            e("span",
                null,
                this.props.label),

            e("input",
                {
                    type: "text",
                    placeholder: this.props.placeholder == undefined ? "" : this.props.placeholder,
                    onKeyDown: key => this.props.newInput(key),
                    onChange: event => this.props.keyboardBuffer(event),
                    className: this.props.classes
                },
                null)
        );
    }
}

export default LabelledInput;