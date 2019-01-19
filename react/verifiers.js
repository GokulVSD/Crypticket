'use strict';

const e = React.createElement;

class Verifiers extends React.Component {

    constructor(props) {
        super(props);

        let verifiers = [
            { name: "Test1", password: "123", curr: 2, max: 5, verified: ["1","2"] },
            { name: "Test2", password: "456", curr: 1, max: 3, verified: ["2"] },
            { name: "Test3", password: "789", curr: 3, max: 4, verified: ["1","2","3"] }
        ];

        this.state = {
            verifiers: verifiers
        };
    }

    //use this later to add a function for updates
    componentDidMount() {
        
    }

    render() {

        return e(React.Fragment, null,

            this.state.verifiers.map(verifier => {
                return e("div",
                    { key: verifier.name + verifier.password, className: "ticket" },
                    e("span",
                        {
                            // name: generator.name,
                            // type: generator.type,
                            // password: generator.password,
                            // curr: generator.curr,
                            // max: generator.max,
                            // ticketAppend: generator.ticketAppend
                        },
                        "null")
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
