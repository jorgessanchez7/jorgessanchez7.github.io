require([
  "esri/Map",
  "esri/layers/MapImageLayer",
  "esri/views/MapView",
  "dojo/domReady!"
  
  ], function (Map, MapImageLayer, MapView) {
	  var map = new Map ({
		  basemap: "topo"
	  });
	  
	  var snowtel_network_layer = new MapImageLayer ({
		  url: "http://geoserver2.byu.edu/arcgis/rest/services/The_SnowMen/Snotel_Network/MapServer"
	  });
	  
	  var utah_counties_layer = new MapImageLayer ({
		  url: "http://geoserver2.byu.edu/arcgis/rest/services/The_SnowMen/Utah_Counties/MapServer"
	  });
	  
	  var utah_dem_layer = new MapImageLayer ({
		  url: "http://geoserver2.byu.edu/arcgis/rest/services/The_SnowMen/Utah_DEM/MapServer"
	  });
	  
	  map.layers.add(utah_dem_layer);
	  map.layers.add(utah_counties_layer);
	  map.layers.add(snowtel_network_layer);
	  
	  var view = new MapView ({
		  container: "showMap",
		  map: map,
		  center: [-111.1, 39.1],
		  zoom: 6
	  });
  	 }
);