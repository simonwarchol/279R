import React, {useRef, useEffect, useContext} from "react";
import * as d3 from "d3";
import {AppContext} from "./Context.jsx";
import _ from 'lodash';
import {legendColor} from 'd3-svg-legend'

const GroupTime = (props) => {
    const svgRef = useRef(null);
    const context = useContext(AppContext);


    //Base code via https://ncoughlin.com/posts/d3-react/
    useEffect(() => {
        // D3 Code
        console.log('redraw', context.participants)


        // Dimensions
        let dimensions = {
            width: 600,
            height: 600,
            margins: 50,
        };

        dimensions.containerWidth = dimensions.width - dimensions.margins * 2;
        dimensions.containerHeight = dimensions.height - dimensions.margins * 2;

        // SELECTIONS
        const svg = d3
            .select(svgRef.current)
            .classed("group-availability", true)
            .attr("width", dimensions.width)
            .attr("height", dimensions.height);
        // remove container on potential rerender
        svg.select('.container').remove()
        const container = svg
            .append("g")
            .classed("container", true)
            .attr("transform", `translate(${dimensions.margins}, ${dimensions.margins})`);
        // Add Title
        container.append("text")
            .text("Group Availability")
            .attr("x", 300)
            .attr("y", 20)
            .attr("text-anchor", "middle");

        // Add legend
        const colorScale = d3.scaleOrdinal()
            .domain([0, 1, 2, 3, 4])
            .range(["#fdffff", "#cce5c0", "#9bca83", "#68b147", "#369917"]);
        const legendContainer = svg.append("g")
            .attr("class", "color-legend")
            .attr("transform", "translate(300,80)");
        let legend = legendColor()
            .labelFormat(d3.format(".0f"))
            .orient('horizontal')
            .scale(colorScale)
        svg.select(".color-legend")
            .call(legend);

        // Groups time blocks by day
        const timeBlockDays = _.chain(context.timeBlocks)
            .groupBy(d => `${d.dayOfWeek} ${d.month} ${d.day}`)
            .entries()
            .value()

        const dayScale = d3.scalePoint()
            .domain(timeBlockDays.map(d => d[0]))
            .range([0, 400])

        const hourScale = d3.scaleLinear()
            .domain([1, 6])
            .range([0, 400])

        const drawDays = () => {
            // Each day is a group
            container.selectAll('.group-days')
                .data(timeBlockDays, d => d[0])
                .join('g')
                .attr('class', 'group-days')
                .attr('transform', d => `translate(${dayScale(d[0])},100)`)
                .each((dd, ii, g_list, h) => {
                    let g = d3.select(g_list[ii]);
                    // Add day label
                    g.selectAll('.group-title')
                        .data([dd[0]])
                        .join('text')
                        .classed('group-title', true)
                        .attr('text-anchor', 'start')
                        .attr('y', -10)
                        .attr('x', 0)
                        .attr('font-size', 15)
                        .attr('fill', 'black')
                        .text(d => d)
                    // Add hour labels
                    g.selectAll('.group-time-block-rect')
                        .data(dd[1])
                        .join('rect')
                        .classed('group-time-block-rect', true)
                        .attr('x', 0)
                        .attr('y', d => hourScale(d.start))
                        .attr('height', d => hourScale(d.end) - hourScale(d.start))
                        .attr('width', dayScale.step() / 2)
                        .attr('stroke', 'black')
                        .attr('fill', d => colorScale(d.availabilityCount))
                    // Add hour legend
                    g.call(d3.axisLeft(hourScale).tickFormat(d3.format("d")).ticks(6).tickSize(0))
                })
        }
        drawDays()

    }, [svgRef.current, context.timeBlocks, context.isLoaded]); // redraw chart if data changes

    return <svg ref={svgRef}/>;
};

export default GroupTime;