var network;
init();

function init() {
    /* global vis $ firebase*/
    // provide data in the DOT language
    var DOTstring = "owo {1 -> 1 -> 2; 2 -> 3; 2 -- 4; 2 -> 7 }";
    if (window.location.search != "") {

        firebase.database().ref('/DOTstrings/' + window.location.search.substring(1)).once('value').then(function(snapshot) {
            DOTstring = snapshot.val().DOTstring;
            genGraph(DOTstring);
            document.getElementById("DOTinput").value = DOTstring;
            document.getElementById("loading").className = "ts dimmer";
        });
    }
    else {
        document.getElementById("loading").className = "ts dimmer";
    }
    var parsedData = vis.network.convertDot(DOTstring);

    var data = {
        nodes: parsedData.nodes,
        edges: parsedData.edges
    };

    var options = parsedData.options;

    // you can extend the options like a normal JSON variable:
    options.nodes = {
        color: 'red'
    };

    var container = document.getElementById('mynetwork');
    // create a network
    network = new vis.Network(container, data, options);
}

function genGraph(DOTstring) {
    var parsedData = vis.network.convertDot(DOTstring);

    var data = {
        nodes: parsedData.nodes,
        edges: parsedData.edges
    };
    network.setData(data);
};

function submit(DOTstring) {
    document.getElementById("submit").disabled = true;
    var uuid = guid();
    firebase.database().ref('DOTstrings/' + uuid).set({
        DOTstring: DOTstring
    }).then(() => {
        document.getElementById("respURL").innerHTML = window.location.origin + window.location.pathname + "?" + uuid;
        document.getElementById("msgSubmit").style.display = "inline";
        document.getElementById("submit").disabled = false;
    });

}

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

network.on('click', function(params) {
    var options = {
        scale: 1,
        animation: { // -------------------> can be a boolean too!
            duration: 300,
            easingFunction: "easeInQuad"
        }
    }

    if (params.nodes[0]) network.focus(params.nodes[0], options);
})
