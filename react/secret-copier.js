const e = React.createElement;

class SecretCopier extends React.Component {
    constructor(props) {
        super(props);
    }

    copyContent(){

        var text = this.props.curr + "|Y|" + this.props.sign + this.props.ticketAppend;
        
        // clipboard API
        navigator.clipboard.writeText(text);
        
        // If called within a generator
        if(this.props.incAndUpdate !== undefined){
            
            this.props.incAndUpdate();
        }
    }

    render() {
        return e("div",
            { onClick: () => this.copyContent() },
            this.props.curr + "|Y|" + this.props.sign);
    }
}

export default SecretCopier;