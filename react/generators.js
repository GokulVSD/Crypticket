'use strict';

import Generator from "./generator.js";

const e = React.createElement;

class Generators extends React.Component {

    constructor(props) {
        super(props);

        let generators = [
            { type: 1, name: "TestGenEvent 1", password: "123", ticketAppend: ";sometext1;", curr: 1, max: 100 },
            { type: 2, name: "TestGenPass 1", password: "789" },
            { type: 1, name: "TestGenEvent 2", password: "456", ticketAppend: ";sometext2;", curr: 3, max: 60 }
        ]
        this.state = {
            generators: generators
        }
    }

    componentDidMount() {
        window.newGenerator = this.newGenerator.bind(this);
    }

    newGenerator() {
        var name = $("#event-name")[0].value.trim();
        var password = $("#event-password")[0].value.trim();
        var max = $("#no-of-tickets")[0].value.trim();
        var date = $("#date")[0].value.trim();
        var time = $("#time")[0].value.trim();
        var url = $("#url")[0].value.trim();
        var x = $("#x-coord")[0].value.trim();
        var y = $("#y-coord")[0].value.trim();

        //do validation here

        if ($("#optional-ticket-generator").hasClass("xup")) {
            //optional is off
        }

        //use btoa to encode, atob to decode

        var ticketAppend = ";" + btoa(name) + ":" + btoa(date) + ":" + btoa(time) + ":;" + btoa(url) + ";" + btoa(x) + ":" + btoa(y) + ":;";

        var newgenerator = { type: 1, name: name, password: password, ticketAppend: ticketAppend, curr: 1, max: parseInt(max) };

        var newgenerators = this.state.generators;
        newgenerators.unshift(newgenerator);

        this.setState({
            generators: newgenerators
        })
    }

    //remove these when the time comes
    btoa(str) {
        return str;
    }
    atob(str) {
        return str;
    }

    render() {

        return e(React.Fragment, null,

            e("div",
                { className: "head-title" },
                "Generators"),

            this.state.generators.map(generator => {
                return e("div",
                    { key: generator.name + generator.type + generator.password, className: "ticket" },
                    e(Generator,
                        {
                            name: generator.name,
                            type: generator.type,
                            password: generator.password,
                            curr: generator.curr,
                            max: generator.max,
                            ticketAppend: generator.ticketAppend
                        },
                        null)
                )
            })
        );
    }
}

$("#generators").each(function (i, ComponentContainer) {
    ReactDOM.render(
        e(Generators, null, null),
        ComponentContainer
    );
});
