
// Grafico para aguas superficiales
var graphDiv = document.getElementById("grafico_sup"); 

Plotly.d3.json("extraccion-agua.json", function (err, json_data) {
    if (err) {
        console.log("Error al leer JSON", err);
        return;

    }

    console.log("JSON", json_data);
})


/*
var data_sup = [{
  x: [],
  y: [],
  type: 'scatter'
}];

var layout = {
  title: 'Aguas superficiales, Región de Valparaíso',
  xaxis: {
    title: 'Año',
    showgrid: false,
    zeroline: false
  },
  yaxis: {
    title: 'lts/seg',
    showline: false
  }
};
Plotly.newPlot(graphDiv, data, layout);


var dataRetrievedLater = graphDiv.data;
var layoutRetrievedLater = graphDiv.layout;
*/

