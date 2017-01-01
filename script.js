/* global vis */
// provide data in the DOT language


var parsedData = vis.network.convertDot("owo {1 -> 1 -> 2; 2 -> 3; 2 -- 4; 2 -> 7 }");

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
var network = new vis.Network(container, data, options);

window.genGraph = function(DOTstring) {

    var parsedData = vis.network.convertDot(DOTstring);

    var data = {
        nodes: parsedData.nodes,
        edges: parsedData.edges
    };
    network.setData(data);
};
