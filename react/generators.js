'use strict';

const e = React.createElement;

class Generators extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {

        return e(React.Fragment, null,

            e("div",
            { className: "head-title"},
            "Generators")
        );
    }
}

$("#generators").each(function (i, ComponentContainer) {
    ReactDOM.render(
        e(Generators, null, null),
        ComponentContainer
    );
});
