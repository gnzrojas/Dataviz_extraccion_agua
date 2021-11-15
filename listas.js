const Plotly = require('plotly.js-dist')

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

})

console.log(lista_anno)