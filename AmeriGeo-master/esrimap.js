var map;
var dates = {highres: [], dates: []}
var values = {highres: [], max: [], mean: [], min: [], std_dev_range_lower: [], std_dev_range_upper: []};
var returnShapes;

require([
  "esri/Map",
  "esri/views/MapView",
  "esri/PopupTemplate",
  "esri/request",
  "esri/config",
  "dojo/_base/array",
  "dojo/dom",
  "dojo/domReady!",
], function(Map, MapView, PopupTemplate, esriRequest, esriConfig, arrayUtils, dom) {
  var map = new Map({
    basemap: "osm"
  });

    esriConfig.request.proxyUrl = "tethys.byu.edu";

  var view = new MapView({
      container: "viewDiv",
      map: map,
      center: [-70, -10],
      zoom: 3
  });

    var popupTemplate = new PopupTemplate()
    view.popup.dockOptions = {
        buttonEnabled: false,
        breakpoint: {
            width: 1000,
            height: 600
        }
    };

     function firstriver() {
        var comid = "166150";
        getstreamflow(comid);
    };

     function secondriver() {
        var comid = "177865";
        getstreamflow(comid);
    };

     function thirdriver() {
        var comid = "140220";
        getstreamflow(comid);
    };
     function fourthriver() {
        var comid = "178123";
        getstreamflow(comid);
    };
     function fifthriver() {
        var comid = "160967";
        getstreamflow(comid);
    };

      function sixthriver() {
        var comid = "176020";
        getstreamflow(comid);
    };
      function seventhriver() {
        var comid = "185439";
        getstreamflow(comid);
    };
//      function eightthriver() {
//        var comid = "148750";
//        getstreamflow(comid);
//    };



    function getstreamflow(comid) {
        var watershed = "south_america";
        var subbasin = "continental";
        var comid;
    	var layerUrl = "https://tethys.byu.edu/apps/streamflow-prediction-tool/api/GetForecast/?watershed_name=" + watershed + "&subbasin_name=" + subbasin + "&reach_id=" + comid + "&forecast_folder=most_recent&return_format=csv";
        esriConfig.request.proxyUrl = "tethys.byu.edu";
        $.ajax({
            type: 'GET',
	    async: false,
            url: layerUrl,
            dataType: 'text',
            contentType: "text/plain",
            headers: {
                'Authorization': "Token 2d03550b3b32cdfd03a0c876feda690d1d15ad40"
            },
            success: function(data) {
                if ($('#graph').length) {
                    Plotly.purge('graph');
                    $('#graph').remove();
                };

                $('div .esri-popup__main-container').append('<div id="graph"></div>');
                var allLines = data.split('\n');
                var headers = allLines[0].split(',');

                for (var i=1; i < allLines.length; i++) {
                    var data = allLines[i].split(',');

                    if (headers.includes('high_res (m3/s)')) {
                        dates.highres.push(data[0]);
                        values.highres.push(data[1]);

                        if (data[2] !== 'nan') {
                            dates.dates.push(data[0]);
                            values.max.push(data[2]);
                            values.mean.push(data[3]);
                            values.min.push(data[4]);
                            values.std_dev_range_lower.push(data[5]);
                            values.std_dev_range_upper.push(data[6]);
                        }
                    } else {
                        dates.dates.push(data[0]);
                        values.max.push(data[1]);
                        values.mean.push(data[2]);
                        values.min.push(data[3]);
                        values.std_dev_range_lower.push(data[4]);
                        values.std_dev_range_upper.push(data[5]);
                    }
                }
            },
            complete: function() {
                var mean = {
                    name: 'Mean',
                    x: dates.dates,
                    y: values.mean,
                    mode: "lines",
                    line: {color: 'blue'}
                };

                var max = {
                    name: 'Max',
                    x: dates.dates,
                    y: values.max,
                    fill: 'tonexty',
                    mode: "lines",
                    line: {color: 'rgb(152, 251, 152)', width: 0}
                };

                var min = {
                    name: 'Min',
                    x: dates.dates,
                    y: values.min,
                    fill: 'none',
                    mode: "lines",
                    line: {color: 'rgb(152, 251, 152)'}
                };

                var std_dev_lower = {
                    name: 'Std. Dev. Lower',
                    x: dates.dates,
                    y: values.std_dev_range_lower,
                    fill: 'tonexty',
                    mode: "lines",
                    line: {color: 'rgb(152, 251, 152)', width: 0}
                };

                var std_dev_upper = {
                    name: 'Std. Dev. Upper',
                    x: dates.dates,
                    y: values.std_dev_range_upper,
                    fill: 'tonexty',
                    mode: "lines",
                    line: {color: 'rgb(152, 251, 152)', width: 0}
                };

                var data = [min, max, std_dev_lower, std_dev_upper, mean];

                if(values.highres.length > 0) {
                    var highres = {
                        name: 'HRES',
                        x: dates.highres,
                        y: values.highres,
                        mode: "lines",
                        line: {color: 'black'}
                    };

                    data.push(highres)
                }

                var layout = {
                    title: titleCase(watershed) + ' Forecast<br>Reach ID: ' + comid,
                    xaxis: {title: 'Date'},
                    yaxis: {title: 'Streamflow m3/s', range: [0, Math.max(...values.max) + Math.max(...values.max)/5]},
                    //shapes: returnShapes,
                }
  
                Plotly.newPlot("graph", data, layout);

                var index = dates.dates.length - 2;
		console.log(index);
                getreturnperiods(dates.dates[0], dates.dates[index], watershed, subbasin, comid);


                dates.highres = [], dates.dates = [];
                values.highres = [], values.max = [], values.mean = [], values.min = [], values.std_dev_range_lower = [], values.std_dev_range_upper = [];
            }

        });;

        return
    };

	

    function getreturnperiods(start, end, watershed, subbasin, comid) {
        var layerUrl = "https://tethys.byu.edu/apps/streamflow-prediction-tool/api/GetReturnPeriods/?watershed_name=" + watershed + "&subbasin_name=" + subbasin + "&reach_id=" + comid;
        esriConfig.request.proxyUrl = "tethys.byu.edu";
        $.ajax({
            type: 'GET',
            url: layerUrl,
	    async: false,
            dataType: 'text',
            contentType: "text/plain",
            headers: {
                'Authorization': "Token 2d03550b3b32cdfd03a0c876feda690d1d15ad40"
            },
            success: function (data) {
                var returnPeriods = JSON.parse(data);

                var return_max = parseFloat(returnPeriods["max"]);
                var return_20 = parseFloat(returnPeriods["twenty"]);
                var return_10 = parseFloat(returnPeriods["ten"]);
                var return_2 = parseFloat(returnPeriods["two"]);

                var band_alt_max = -9999

                var shapes = [{
                    type: 'rect',
                    layer: 'below',
                    xref: 'x',
                    yref: 'y',
                    x0: start,
                    y0: return_20,
                    x1: end,
                    y1: Math.max(return_max, band_alt_max),
                    line: {width: 0},
                    fillcolor: 'rgba(128, 0, 128, 0.4)'
                },
                // return 10 band
                {
                    type: 'rect',
                    layer: 'below',
                    xref: 'x',
                    yref: 'y',
                    x0: start,
                    y0: return_10,
                    x1: end,
                    y1: return_20,
                    line: {width: 0},
                    fillcolor: 'rgba(255, 0, 0, 0.4)'
                },
                // return 2 band
                {
                    type: 'rect',
                    layer: 'below',
                    xref: 'x',
                    yref: 'y',
                    x0: start,
                    y0: return_2,
                    x1: end,
                    y1: return_10,
                    line: {width:0},
                    fillcolor: 'rgba(255, 255, 0, 0.4)'
                }];

                passShape(shapes);
            }
        })
    };

    function passShape(shapes) {
        var update = {
            shapes: shapes,
        };
        Plotly.relayout('graph', update);
    }

    function titleCase(str) {
        str = str.toLowerCase();
        str = str.split('_');

        for (var i = 0; i < str.length; i++) {
            str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
        }

        return str.join(' ');
    };



	let lat_list = [
		-14.115203,
		-23.599377,
		0.234906,
		-23.428544,
		-8.846648,
		-21.855075,
		-32.501466,
//	    -5.052363
	];
	let lon_list = [
	    -67.512691,
		-54.030787,
	    -75.965563,
	    -63.587962,
	    -49.636322,
	    -69.515510,
	    -55.663173,
//	    -75.989515
	];
	let name_list = [

		"Río Beni",
		"Río Paraná",
		"Río Putumayo",
	    "Río Bermejo",
	    "Río Araguaia",
	    "Río Loa",
	    "Río Negro",
//	    "Río Marañón"
	];
	let content_list = [
		firstriver,
		secondriver,
		thirdriver,
		fourthriver,
		fifthriver,
		sixthriver,
		seventhriver,
//		eightthriver
	];

	for(let i = 0; i < lon_list.length; i++){
		view.graphics.add({
			symbol: {
				type: "text",
				color: "#2f5799",
				text: "\ue613",
				font: {
					size: 20,
					family: "CalciteWebCoreIcons"
				}
			},
			geometry: {
				type: "point",
				longitude: lon_list[i],
				latitude: lat_list[i]
			},
            popupTemplate: {
				title: name_list[i],
				content: content_list[i]
            }
		});
	};
});
