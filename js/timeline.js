function drawTimePoints(error, data){

	var lineHeight = 10;
	var tickHeight = 10;
	var svg = d3.select("body").append("svg").attr("class", "timeline");

	function f1(d){
		return d.Mise_en_service;
	}

	var xscale = d3.scale.linear()
		.domain([d3.min(data, f1), d3.max(data, f1)])
		.range(['5%', '95%'])
		;

	//-------------------------------
	//  Time points labels
	//-------------------------------
	
	var timepoints = svg.selectAll("text.timePoint")
		.data(data)
		.enter()
			.append("text")
			.attr("class", "timePoint")
			.text(function(d){return d.Mise_en_service})
			.attr("id", function(d){return "tl" + d.Mise_en_service})
			.attr("data-year", function(d){return d.Mise_en_service})
			.attr("y", lineHeight + tickHeight + 20)
			.attr("x", function(d){return xscale(d.Mise_en_service)})
			.style("text-alingn", "center")
			.append("title")
				.text(function(d){return d.Fabriquant + " " + d.Nom})
		;

	//-------------------------------
	//  Time points ticks lines
	//-------------------------------
	
	var ticks = svg.selectAll("line.tick")
		.data(data)
		.enter()
			.append("line")
			.attr("y1", lineHeight)
			.attr("y2", lineHeight + tickHeight)
			.attr("x1", function(d){return xscale(d.Mise_en_service)})
			.attr("x2", function(d){return xscale(d.Mise_en_service)})
		;

	//-------------------------------
	//  Time line
	//-------------------------------
	
	svg.append("line")
		.attr("y1", lineHeight)
		.attr("y2", lineHeight)
		.attr("x1", "0%")
		.attr("x2", "100%")
		;
}

function highlight(year){
	var target = d3.select('[data-year="' + year + '"]');

	d3.selectAll(".timePoint").classed("highlight", false);
	target.classed("highlight", true);
}

function drawTimeLine(path){
	d3.tsv(path, drawTimePoints);
}

function updateTimeLine(event, from, to){

	var current = document.getElementsByClassName("slide")[to];
	var year = current.attributes["data-date"].value;
	highlight(year);
}
