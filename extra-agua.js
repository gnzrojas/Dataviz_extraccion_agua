//Cargar librerias

const fs = require("fs"); //lectura/escritura de archivos, nativo de node
const { csv2json, json2csv } = require("json-2-csv");
const path = require("path") // acceso a directorios
const XLSX = require("xlsx") // para manejo de archivos excel

//Definición de archivo de origen
const agua = path.resolve("nva-base-agua-2019.xlsx");

//Definir filtros de información
const region = ["Valparaíso"];

// Leer datos del archivo de origen
var buf = fs.readFileSync(agua); //Almacena archivo en memoria
var wb = XLSX.read(buf, { type: "buffer" }); // Interpreta el formato excel desde la lectura
var hoja = wb.Sheets["Hoja1"]; //Accede a una hoja por su nombre
var hoja_json = XLSX.utils.sheet_to_json(hoja); //Convierte la hoja a formato json

console.log(hoja_json[1]);

// Objeto en donde se guardará la transformación en formato json
var output_data = {}; //Crear archivo json vacio

//Ciclo para extraer información de cada fila
for (let i = 0; i < hoja_json.length; i++) {
    let region_filter = hoja_json[i]["Región"] // extraer información de columna "Región"
    let fecha_filter = hoja_json[i]["Año"] // extraer información de la columna "Año"

    if (region == region_filter) {

        let data_region = output_data[fecha_filter];

        if (data_region) {
            data_region["Año"] = hoja_json[i]["Año"];
            data_region["Región"] = hoja_json[i]["Región"];
            data_region["Aguas superficiales"] = hoja_json[i]["Aguas Superficiales (1) / Surface water"];
            data_region["Aguas subterraneas"] = hoja_json[i]["Aguas Subterráneas (2) / Groundwater"];
            data_region["Aguas adquiridas a terceros"] = hoja_json[i]["Aguas adquiridas a terceros (3) / Purchased water"];
            data_region["Unidad"] = hoja_json[i]["Unidades"];
        } else {
            data_region = {};
            data_region["Año"] = hoja_json[i]["Año"];
            data_region["Región"] = hoja_json[i]["Región"];
            data_region["Aguas superficiales"] = hoja_json[i]["Aguas Superficiales (1) / Surface water"];
            data_region["Aguas subterraneas"] = hoja_json[i]["Aguas Subterráneas (2) / Groundwater"];
            data_region["Aguas adquiridas a terceros"] = hoja_json[i]["Aguas adquiridas a terceros (3) / Purchased water"];
            data_region["Unidad"] = hoja_json[i]["Unidades"];
        }
        output_data[fecha_filter] = data_region

    }
}
//Definir archivo de salida JSON
const json_file = path.resolve("extraccion-agua.json");

//Guardar en Json los datos transformados
fs.writeFileSync(json_file, JSON.stringify(output_data));


const CSVToJSON = require("csv2json");
const JSONToCSV = require('json2csv').parse;
const FileSystem = require("fs");

JSONToCSV().fromFile("extraccion-agua.json").then(source => {
  console.log(source);
  source.push({
    "Año": "2010",
    "Región": "Valparaíso",
    "Aguas superficiales": "767",
    "Aguas subterraneas": "332",
    "Aguas adquiridas a terceros": "0",
    "Unidad": "lts/seg"
  });
  const  data = CSVToJSON(source, {fields: ["Año","Región", "Aguas superficiales", "Aguas subteraneas", "Aguas adquiridas a terceros", "Unidad"]}) ;
  FileSystem.writeFileSync("extr-agua.csv")
})


/*Generar archivo CSV
const argv = require('yargs').argv;
const { readFile, writeFile } = require('fs').promises;
const { json2csvAsync } = require('json-2-csv');

const inputFileName = argv._[0];
const outputFileName = argv._[1];

async function parseJSONFile (output_data) {
  try {
    const file = await readFile(output_data);
    return JSON.parse(file);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

async function writeCSV (output_data, data) {
  await writeFile(output_data, data, 'utf8');
}

(async () => {
  const data = await parseJSONFile(output_data);
  const csv = await json2csvAsync(data);
  await writeCSV(data, csv);
  console.log('Successfully converted ${data}!');
});
*/


/*
const { json2csvAsync } = require("json-2-csv");

(async() => {
  const data= await parseJSONFile(output_data);
  const csv = await json2csvAsync(data);
  await writeCSV("extraccion-agua.csv", csv)
}) ();*/


/*
var output_csv = [] // Objeto Array vacío

// Ciclo para obtener los datos procesados de cada comuna
for (let n = 0; n < region.length; n++) {
  let nombre_region = region[n];
  datos_region= output_data[nombre_region];
  output_csv.push({
    "Región": nombre_region,
    "Año": datos_region["Año"],
    "Aguas Superficiales (1)/Surface water": datos_region["Aguas Superficiales (1)/Surface water"],
    "Aguas Subterráneas (2) / Groundwater": datos_region["Aguas Subterráneas (2) / Groundwater"],
    "Aguas adquiridas a terceros (3) / Purchased water": datos_region["Aguas adquiridas a terceros (3) / Purchased water"],
    "Unidades": datos_region["Unidades"],
  })
}


console.log("Salida para CSV", output_csv);

// Definir archivo de salida (CSV)
const csv_file = path.resolve("extraccion-agua.csv");

// Configurar objeto de escritura CSV, indicando los nombres de columnas como encabezados
const csvWriter = createCsvWriter({
  path: csv_file,
  header: [
    { id: "Región", title: "Región" },
    { id: "Año", title: "Año" },
    { id: "Unidades", title: "Unidades" },
    { id: "Aguas Superficiales (1)/Surface water", title: "Aguas Superficiales (1)/Surface water" },
    { id: "Aguas Subterráneas (2) / Groundwater", title: "Aguas Subterráneas (2) / Groundwater" },
    { id: "Aguas adquiridas a terceros (3) / Purchased water", title: "Aguas adquiridas a terceros (3) / Purchased water" },
  ]
});

// Escribir el archivo de salida CSV
csvWriter.writeRecords(output_csv).then(() => {
  console.log("Archivo CSV escrito!!!");
}).catch((error) => {
  console.log("Error al escribir el archivo CSV", error);
})
*/