'use strict';

import Verifier from "./verifier.js";

const e = React.createElement;

class Verifiers extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            verifiers: retrieveObject("verifiers")
        };
    }

    //used to add functions to the window for updates from Generators
    componentDidMount() {

        window.newVerifier = this.newVerifier.bind(this);
        window.deleteVerifier = this.deleteVerifier.bind(this);
    }

    newVerifier(g) {

        var newverifier = { name: g.name, password: g.password, curr: 0, max: g.max, verified: [] };

        var verifiers = this.state.verifiers;

        verifiers.unshift(newverifier);

        storeObject("verifiers", verifiers);

        this.setState({
            verifiers: verifiers
        });
    }

    deleteVerifier(name) {

        var verifiers = this.state.verifiers;

        var newverifiers = verifiers.filter(v => {
            if (v.name == name) {
                return false;
            } else {
                return true;
            }
        });

        storeObject("verifiers", newverifiers);

        this.setState({
            verifiers: newverifiers
        });
    }

    //called by child to update itself (in order to facilitate browser storage)
    updateChild(name, password, msg) {

        var verifiers = this.state.verifiers;

        var index = verifiers.findIndex(v => v.name == name && v.password == password);

        verifiers[index].curr += 1;

        verifiers[index].verified.push(msg);

        storeObject("verifiers", verifiers);

        this.setState({
            verifiers: verifiers
        });
    }

    render() {

        if (this.state.verifiers.length == 0) {
            return e('div',
                { className: "empty-div" },
                "Create Crypticket Generators from the Create page and verify them here");
        }

        return e(React.Fragment, null,

            this.state.verifiers.map(verifier => {
                return e("div",
                    { key: verifier.name + verifier.password, className: "ticket vrf" },
                    e(Verifier,
                        {
                            name: verifier.name,
                            password: verifier.password,
                            curr: verifier.curr,
                            max: verifier.max,
                            verified: verifier.verified,
                            updateChild: this.updateChild.bind(this)
                        },
                        null)
                )
            })
        );
    }
}

$("#verifiers").each(function (i, ComponentContainer) {
    ReactDOM.render(
        e(Verifiers, null, null),
        ComponentContainer
    );
});
