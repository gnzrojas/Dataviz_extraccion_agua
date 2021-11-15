//Cargar librerias

const fs = require("fs"); //lectura/escritura de archivos, nativo de node
const path = require("path") // acceso a directorios
const XLSX = require("xlsx") // para manejo de archivos excel

//Definición de archivo de origen
const agua = path.resolve("docs/nva-base-agua-2019.xlsx");

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
const json_file = path.resolve("docs/extraccion-agua.json");

//Guardar en Json los datos transformados
fs.writeFileSync(json_file, JSON.stringify(output_data));

