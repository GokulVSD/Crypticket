const e = React.createElement;

class Copier extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return e(React.Fragment, null,

            e("span",
            null,
            this.props.title),

            e("span",
            null,
            this.props.content)
        );
    }
}

export default Copier;