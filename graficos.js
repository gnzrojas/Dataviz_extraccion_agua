
// Grafico para aguas superficiales

//Crear referencia a archivo extraccion-agua.js

src = "https://cdn.plot.ly/plotly-latest.min.js";
src = "https://cdn.plot.ly/plotly-locale-es-latest.js";

Plotly.d3.json("extraccion-agua.json", function (err, json_data) {
  if (err) {
    console.log("Error al leer json", err);
    return;
  }

  lista_anno = [];
  lista_sup = [];
  lista_subt = [];
  lista_adq = [];

  for (var llave in json_data) {

    lista_anno.push(json_data[llave]["Año"]),
      lista_sup.push(json_data[llave]["Aguas superficiales"]);
    lista_subt.push(json_data[llave]["Aguas subterraneas"]);
    lista_subt.push(json_data[llave]["Aguas adquiridas a terceros"]);
  }

  //console.log(lista_sup);

  var trace1 = {
    type: 'bar',
    x: lista_anno,
    y: lista_sup,
    marker: {
      color: '#C8A2C8',
      line: {
        width: 1.5
      }
    },

  }
  var data = [trace1];

  var layout = {
    title: 'Extracción de aguas subterráneas, Región de Valparaíso', font: { size: 15, color: 'black' },
    xaxis: { title: 'Años', titlefont: { color: 'black', size: 14 } },
    yaxis: { title: 'Lts/seg', titlefont: { color: 'black', size: 14 } },
  };

  var config = { responsive: true };

  a = Plotly.newPlot('chart_sup', data, layout, config)
});

