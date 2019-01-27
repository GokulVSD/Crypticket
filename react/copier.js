const e = React.createElement;

class Copier extends React.Component {
    constructor(props) {
        super(props);
    }

    copyContent(){
        // clipboard API
        navigator.clipboard.writeText(this.props.content);
    }

    render() {
        return e(React.Fragment, null,

            e("span",
            { className: "labels", onClick: () => this.copyContent() },
            this.props.title),

            e("input",
            { type: "text", placeholder: this.props.content, readOnly: "readonly", className: "inputs", onClick: () => this.copyContent() },
            null)
        );
    }
}

export default Copier;