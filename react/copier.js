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
            { onClick: () => this.copyContent() },
            this.props.title),

            e("span",
            { onClick: () => this.copyContent() },
            this.props.content)
        );
    }
}

export default Copier;