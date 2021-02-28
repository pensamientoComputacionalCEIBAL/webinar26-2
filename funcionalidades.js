const api = new XMLHttpRequest ();

var url, datos, validadorDeConsulta;

$( document ).ready(function() {

$( "#vDocumento" ).click(function() { 
validarDocumento ();
$("#documento").focus(); });

$("#documento").keypress(function(e) { 
var code = (e.keyCode ? e.keyCode : e.which);
if(code == 13){ 
validarDocumento();
$("#documento").focus();
return false; } });

$("#documento").focus(); });

/*--------------------------------------------------------------------------------*/

function validarDocumento () {
 url = 'https://spreadsheets.google.com/feeds/list/1a5ARI6HcvAmT_wG0u-EdyVBxMEUHaLj9_4uXrNPQ-KI/1/public/values?alt=json'
 api.open('GET',url,true);
 api.send();
 $("#resultados").html("¡Tu petición está siendo procesada!, <b>por favor espera…</b>");

 api.onreadystatechange = function () {
 if (this.status == 500) { sinResultados (); }
 else if (this.status == 200 && this.readyState == 4) {
  datos = JSON.parse (this.responseText); // Transformación a formato JSON.
  validadorDeConsulta = 0;
  if (datos.feed.openSearch$totalResults.$t != '0') {
  var i = datos.feed.entry.length - 1;
  while (i >= 0) {
  if (datos.feed.entry[i]["gsx$documento"].$t == $("#documento").val()) {
   validadorDeConsulta = 1;
   $("#resultados").html(
   '<div class="text-center color_primario Trnsp"><li class ="list-group-item shadow-sm"> <b>Nombre del participante: </b>' + datos.feed.entry[i]["gsx$nombre"].$t + " " + datos.feed.entry[i]["gsx$apellido"].$t  +
   ' (<b>Doc. <i class="text-danger">' + datos.feed.entry[i]["gsx$documento"].$t + "</b></i>)" +
   '<li class ="list-group-item shadow-sm text-center">' +
   '<a href=' + datos.feed.entry[i]["gsx$mergeddocurl-generadorprimero"].$t + ' target="_blank"><strong>Certificado de participación (PERSONAL), ¡clic aquí para descargar!</strong></a>' + '</li></div>');
   i = 0;
  } i--; } } }
if (validadorDeConsulta == 0) { sinResultados (); } }
$("#documento").focus(); }
/*--------------------------------------------------------------------------------*/
function sinResultados () {
$("#resultados").html('¡Ups!, <b>¡no hay resultados para el documento ingresado!.</b>'); }
/*--------------------------------------------------------------------------------*/