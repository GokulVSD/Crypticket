'use strict';

import Generator from "./generator.js";

const e = React.createElement;

class Generators extends React.Component {

    constructor(props) {
        super(props);

        let generators = [
            { type: 1, name: "TestGenEvent 1", password: "123", ticketAppend: ";dGVzdA==:NDU2:MzU0NjozNDYz:;Z2hq;MzQ1:NDU2Nw==:;", curr: 1, max: 100 },
            { type: 2, name: "TestGenPass 1", password: "789" },
            { type: 1, name: "TestGenEvent 2", password: "456", ticketAppend: ";dGVzdA==:NDU2:MzU0NjozNDYz:;Z2hq;MzQ1:NDU2Nw==:;", curr: 3, max: 60 }
        ]
        this.state = {
            generators: generators
        };
    }

    componentDidMount() {
        window.newGenerator = this.newGenerator.bind(this);
        window.newPassGenerator = this.newPassGenerator.bind(this);
    }

    // for new event generator
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

        if (name == "" || password == "" || max == "" || date == "" || time == "") {
            console.log("all required data not provided");
            return;
        }

        if ($("#optional-ticket-generator").hasClass("xup")) {
            //optional is off
            url = x = y = "";
        } else {

            if ((x != "" && y == "") || (x == "" && y != "")) {
                console.log("partial coordinates given, can't create generator");
                return;
            }
        }

        //use btoa to encode, atob to decode

        var ticketAppend = ";" + btoa(name) + ":" + btoa(date) + ":" + btoa(time) + ":;" + btoa(url) + ";" + btoa(x) + ":" + btoa(y) + ":;";

        var newgenerator = { type: 1, name: name, password: password, ticketAppend: ticketAppend, curr: 1, max: parseInt(max) };

        var newgenerators = this.state.generators;
        newgenerators.unshift(newgenerator);

        storeObject("generators", newgenerators);

        this.setState({
            generators: newgenerators
        });
    }

    //for new password generator
    newPassGenerator() {

        var name = $("#username")[0].value.trim();
        var password = $("#global-password")[0].value.trim();

        //do validation here

        if (name == "" || password == "") {
            console.log("all required data not provided");
            return;
        }

        var newgenerator = { type: 2, name: name, password: password };

        var newgenerators = this.state.generators;
        newgenerators.unshift(newgenerator);

        this.setState({
            generators: newgenerators
        });
    }

    removeChild(name, password, type) {

        var generators = this.state.generators;

        var newgenerators = generators.filter(g => {
            if (g.name == name && g.password == password && g.type == type) {
                return false;
            } else {
                return true;
            }
        });

        this.setState({
            generators: newgenerators
        });
    }

    updateChild(name, password) {

        var generators = this.state.generators;

        var index = generators.findIndex(g => g.name == name && g.password == password );

        generators[index].curr += 1;

        this.setState({
            generators: generators
        });
    }

    render() {

        return e(React.Fragment, null,

            e("div",
                { className: "head-title" },
                "Generators"),

            this.state.generators.map(generator => {
                return e(Generator,
                    {
                        key: generator.name + generator.type + generator.password,
                        name: generator.name,
                        type: generator.type,
                        password: generator.password,
                        curr: generator.curr,
                        max: generator.max,
                        ticketAppend: generator.ticketAppend,
                        removeChild: this.removeChild.bind(this),
                        updateChild: this.updateChild.bind(this)
                    },
                    null);
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
