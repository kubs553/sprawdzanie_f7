import $$ from 'dom7';
import Framework7 from 'framework7/framework7.esm.bundle.js';

// Import F7 Styles
import 'framework7/css/framework7.bundle.css';

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.css';
// Import Cordova APIs
import cordovaApp from './cordova-app.js';
// Import Routes
import routes from './routes.js';

// Import main app component
import App from '../app.f7.html';

var app = new Framework7({
  root: '#app', // App root element
  component: App, // App main component
  id: 'io.framework7.myapp', // App bundle ID
  name: 'My App', // App name
  theme: 'auto', // Automatic theme detection


  // App routes
  routes: routes,


  // Input settings
  input: {
    scrollIntoViewOnFocus: Framework7.device.cordova && !Framework7.device.electron,
    scrollIntoViewCentered: Framework7.device.cordova && !Framework7.device.electron,
  },
  // Cordova Statusbar settings
  statusbar: {
    iosOverlaysWebView: true,
    androidOverlaysWebView: false,
  },
  on: {
    init: function () {
      var f7 = this;
      if (f7.device.cordova) {
        cordovaApp.init(f7);
      }
      $$(document).on('page:init', '.page[data-name="kalkulator"]', function (e) {
        $$('button[id="dodaj"]').on('click', function() {
          var liczba1 = document.getElementById('liczba1').value;
          var liczba2 = document.getElementById('liczba2').value;
         document.getElementById('wynik').value = Number(liczba1) + Number(liczba2);
        });
        $$('button[id="odejmij"]').on('click', function() {
          var liczba1 = document.getElementById('liczba1').value;
          var liczba2 = document.getElementById('liczba2').value;
         document.getElementById('wynik').value = Number(liczba1) - Number(liczba2);
        });
        $$('button[id="pomnoz"]').on('click', function() {
          var liczba1 = document.getElementById('liczba1').value;
          var liczba2 = document.getElementById('liczba2').value;
         document.getElementById('wynik').value = Number(liczba1) * Number(liczba2);
        });
        $$('button[id="podziel"]').on('click', function() {
          var liczba1 = document.getElementById('liczba1').value;
          var liczba2 = document.getElementById('liczba2').value;
         document.getElementById('wynik').value = Number(liczba1) / Number(liczba2);
        });
      }), 
	  $$(document).on('page:init', '.page[data-name="tabelka"]', function (e) {
        $$('button[id="guzik"]').on('click', function() {
			  var i = 0;
			  var table = document.getElementById("tabela");
			  var row = table.insertRow(0);
			  var cell1 = row.insertCell(0);
			  var cell2 = row.insertCell(1);
			  var cell3 = row.insertCell(2);
			  cell1.innerHTML = "18";
			  cell2.innerHTML = Number(++i);
			  cell3.innerHTML = "kolumna";
        });
      })
      $$(document).on('page:init', '.page[data-name="sprawdzanie"]', function (e) {
        $$("input").keyup(function() {
          var kategoria = $$(this).val().trim();
          if(kategoria != '')
          {
             app.request({
                url: 'http://jakubmatysiak.pl/sprawdz.php',
                type: 'post',
                data: {kategoria: kategoria},
                success: function(wynik){
                    $$('#czy_dostepne').html(wynik);
                 }
             });
          }
          else
          {
             $$("#czy_dostepne").html("");
          } 
       });
      })
    $$(document).on('page:init', '.page[data-name="regex"]', function (e) {
      $$('input[type="text"]').on('keyup keydown change', function() {
        var imie = document.getElementById("imie").value;
        var wzor_imie = new RegExp("[A-Z][a-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]*");
        var nazwisko = document.getElementById("nazwisko").value;
        var wzor_nazwisko = new RegExp("[A-Z][a-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]*");
        var kod = document.getElementById("kod").value;
        var wzor_kod = new RegExp ("[0-9]{2}-[0-9]{3}");
        var miasto = document.getElementById("miasto").value;
        var wzor_miasto = new RegExp("[A-Z][a-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]*");
        var telefon = document.getElementById("telefon").value;
        var wzor_telefon = new RegExp("[0-9]{3}-[0-9]{3}-[0-9]{3}");
        var email = document.getElementById("email").value;
        var wzor_email = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (wzor_imie.test(imie))
        {
          $$('#imie').css('backgroundColor', 'green');
        }
        else
        {
          $$('#imie').css('backgroundColor', 'red');
        }
        if (wzor_nazwisko.test(nazwisko))
        {
          $$('#nazwisko').css('backgroundColor', 'green');
        }
        else
        {
          $$('#nazwisko').css('backgroundColor', 'red');
        }
        if (wzor_kod.test(kod))
        {
          $$('#kod').css('backgroundColor', 'green');
        }
        else
        {
          $$('#kod').css('backgroundColor', 'red');
        }
        if (wzor_miasto.test(miasto))
        {
          $$('#miasto').css('backgroundColor', 'green');
        }
        else
        {
          $$('#miasto').css('backgroundColor', 'red');
        }
        if (wzor_telefon.test(telefon))
        {
          $$('#telefon').css('backgroundColor', 'green');
        }
        else
        {
          $$('#telefon').css('backgroundColor', 'red');
        }
        if (wzor_email.test(email))
        {
          $$('#email').css('backgroundColor', 'green');
        }
        else
        {
          $$('#email').css('backgroundColor', 'red');
        }
      });
    })
  /*  var db = null;
    var example = angular.module('starter', ['ionic', 'ngCordova'])
        .run(function($ionicPlatform, $cordovaSQLite) {
            $ionicPlatform.ready(function() {
                if(window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }
                if(window.StatusBar) {
                    StatusBar.styleDefault();
                }
                db = $cordovaSQLite.openDB("my.db");
                $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS kategorie (kategorie text)");
            });
        });
        example.controller("ExampleController", function($scope, $cordovaSQLite) {
          $scope.insert = function(kategorie) {
              var query = "INSERT INTO people (kategorie) VALUES (romans)";
              $cordovaSQLite.execute(db, query, [kategorie]).then(function(res) {
                  console.log("INSERT ID -> " + res.insertId);
              }, function (err) {
                  console.error(err);
              });
          }
          $scope.select = function(lastname) {
              var query = "SELECT firstname, lastname FROM people WHERE lastname = ?";
              $cordovaSQLite.execute(db, query, [lastname]).then(function(res) {
                  if(res.rows.length > 0) {
                      console.log("SELECTED -> " + res.rows.item(0).firstname + " " + res.rows.item(0).lastname);
                  } else {
                      console.log("No results found");
                  }
              }, function (err) {
                  console.error(err);
              });
          }
      }); */
    },
  },
});

