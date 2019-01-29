'use strict';

import Generator from "./generator.js";

const e = React.createElement;

class Generators extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            generators: retrieveObject("generators")
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

        if (isNaN(max)) {
            console.log("count is not a number");
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

        newVerifier(newgenerator);

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

        storeObject("generators", newgenerators);

        newUsername(name, password);

        this.setState({
            generators: newgenerators
        });
    }

    //called by child to update itself (in order to facilitate browser storage)
    removeChild(name, password, type) {

        var generators = this.state.generators;

        var newgenerators = generators.filter(g => {
            if (g.name == name && g.password == password && g.type == type) {
                return false;
            } else {
                return true;
            }
        });

        storeObject("generators", newgenerators);

        if (type === 1)
            deleteVerifier(name, password);
        else
            deleteUsername(name, password);

        this.setState({
            generators: newgenerators
        });
    }

    //called by child to update itself (in order to facilitate browser storage)
    updateChild(name, password) {

        var generators = this.state.generators;

        var index = generators.findIndex(g => g.name == name && g.password == password);

        generators[index].curr += 1;

        storeObject("generators", generators);

        this.setState({
            generators: generators
        });
    }

    render() {

        if (this.state.generators.length == 0) {
            return null;
        }

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
