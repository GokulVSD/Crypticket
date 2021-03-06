const e = React.createElement;

class SecretCopier extends React.Component {
    constructor(props) {
        super(props);
    }

    copyContent() {

        var text = this.props.curr + "|Y|" + this.props.sign + this.props.ticketAppend;

        // clipboard API
        navigator.clipboard.writeText(text);

        setTimeout(() => ReactTooltip.hide(), 1000);

        // If called within a generator
        if (this.props.incAndUpdate !== undefined) {

            this.doSuccessAnimation();

            this.props.incAndUpdate();
        }
    }

    doSuccessAnimation() {

        setTimeout(() => {
            $(ReactDOM.findDOMNode(this).parentNode).addClass("bg-green");
            setTimeout(() => {
                $(ReactDOM.findDOMNode(this).parentNode).removeClass("bg-green")
            }, 50);
        }, 1);
    }

    render() {
        return e("div",
            { className: "input-container wide secret", onClick: () => this.copyContent(), 
            'data-tip': "Copied!", 'data-event': 'click', 'data-event-off' : 'nothing', 'data-for': (this.props.incAndUpdate !== undefined ?'tt3':'tt1'), 'data-iscapture':true },
            e("div", null,
                this.props.curr, e("img", { src: "assets/logo-ticket.png" }, null), this.props.sign
            ),
            
        );
    }
}

export default SecretCopier;