const e = React.createElement;

class SecretCopier extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return e("div",
            null,
            this.props.secret);
    }
}

export default SecretCopier;