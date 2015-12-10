function drawTimePoints(error, data){

	var lineHeight = 50;
	var tickHeight = 10;
	var svg = d3.select("svg");

	function f1(d){
		return d.Mise_en_service;
	}

	var xscale = d3.scale.linear()
		.domain([d3.min(data, f1), d3.max(data, f1)])
		.range(['10%', '90%'])
		;

	var timepoints = svg.selectAll("text")
		.data(data)
		.enter()
			.append("text")
			.text(function(d){return d.Mise_en_service})
		.attr("id", function(d){return "tl" + d.Nom})
			.attr("y", lineHeight + tickHeight + 15)
			.attr("x", function(d){return xscale(d.Mise_en_service)})
			.style("text-alingn", "center")
			.append("title")
				.text(function(d){return d.Fabriquant + " " + d.Nom})
		;

	var ticks = svg.selectAll("line.tick")
		.data(data)
		.enter()
			.append("line")
			.attr("y1", lineHeight)
			.attr("y2", lineHeight + tickHeight)
			.attr("x1", function(d){return xscale(d.Mise_en_service)})
			.attr("x2", function(d){return xscale(d.Mise_en_service)})
		;

	svg.append("line")
		.attr("y1", lineHeight)
		.attr("y2", lineHeight)
		.attr("x1", "0%")
		.attr("x2", "100%")
		;
}

d3.tsv("ventilateurs.tsv", drawTimePoints);
