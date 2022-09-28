import React, {useRef, useEffect, useContext} from "react";
import * as d3 from "d3";
import {AppContext} from "./Context.jsx";
import _ from 'lodash';

const UserTime = (props) => {
    const svgRef = useRef(null);
    const context = useContext(AppContext);


    //Base code via https://ncoughlin.com/posts/d3-react/
    useEffect(() => {
        // D3 Code

        // Dimensions
        let dimensions = {
            width: 600,
            height: 600,
            margins: 50,
        };

        const unavailableColor = "#ffdedf";
        const availableColor = "#3a9917";

        dimensions.containerWidth = dimensions.width - dimensions.margins * 2;
        dimensions.containerHeight = dimensions.height - dimensions.margins * 2;

        // SELECTIONS
        const svg = d3
            .select(svgRef.current)
            .classed("your-availability", true)
            .attr("width", dimensions.width)
            .attr("height", dimensions.height);
        svg.select('.container').remove()
        const container = svg
            .append("g")
            .classed("container", true)
            .attr("transform", `translate(${dimensions.margins}, ${dimensions.margins})`);
        // Add Title
        container.append("text")
            .text("Your Availability")
            .attr("x", 200)
            .attr("y", 20)
            .attr("text-anchor", "middle");

        container.append("rect")
            .attr("x", 90)
            .attr("y", 50)
            .attr("width", 20)
            .attr("height", 20)
            .attr("fill", unavailableColor);

        container.append("text")
            .text("Unavailable")
            .attr("x", 100)
            .attr("y", 40)
            .attr("text-anchor", "middle");

        container.append("rect")
            .attr("x", 290)
            .attr("y", 50)
            .attr("width", 20)
            .attr("height", 20)
            .attr("fill", availableColor);

        container.append("text")
            .text("Available")
            .attr("x", 300)
            .attr("y", 40)
            .attr("text-anchor", "middle")


        const brushingRect = svg.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", 0)
            .attr("height", 0)
            .attr("fill", "red")

        const drag = d3.drag()
            .on("start", (e) => {
                console.log("drag start", e)

            })
            .on("drag", (e) => {
                console.log("drag", e)
                d3.select(brushingRect.node())
                    .attr("x", e.subject.x > e.x ? e.x : e.subject.x)
                    .attr("y", e.subject.y > e.y ? e.y : e.subject.y)
                    .attr("width", e.subject.x > e.x ? e.subject.x - e.x : e.x - e.subject.x)
                    .attr("height", e.subject.y > e.y ? e.subject.y - e.y : e.y - e.subject.y)

                d3.selectAll('.time-block-rect')
                    .each((dat, i, rects) => {
                        const rect = d3.select(rects[i])
                        const rectX = _.toNumber(rect.attr("x")) + dayScale(`${dat.dayOfWeek} ${dat.month} ${dat.day}`)
                        const rectY = _.toNumber(rect.attr("y")) + hourScale(dat.start)
                        console.log('asdf', rectX, rectY)
                    })
            })
            .on("end", () => {
                drawDays();
                console.log('drag end')
            })
        drag(svg);

        let initialClickAvailable = true;


        const timeBlockDays = _.chain(context.timeBlocks)
            .groupBy(d => `${d.dayOfWeek} ${d.month} ${d.day}`)
            .entries()
            .map(d => {
                d[1] = d[1].map(dd => {
                    dd.availabilityCount = 0;
                    return dd;
                })
                return d
            })
            .value()

        const dayScale = d3.scalePoint()
            .domain(timeBlockDays.map(d => d[0]))
            .range([10, 400])

        const hourScale = d3.scaleLinear()
            .domain([1, 6])
            .range([0, 400])


        console.log('timeBlockDays', timeBlockDays)
        const drawDays = () => {
            // container.selectAll('.days').remove()
            container.selectAll('.days')
                .data(timeBlockDays, d => d[0])
                .join('g')
                .attr('class', 'days')
                .attr('transform', d => `translate(${dayScale(d[0])},100)`)
                .each((dd, ii, g_list, h) => {
                    let g = d3.select(g_list[ii]);
                    g.selectAll('.title')
                        .data([dd[0]])
                        .join('text')
                        .classed('title', true)
                        .attr('text-anchor', 'start')
                        .attr('y', -10)
                        .attr('x', 0)
                        .attr('font-size', 15)
                        .attr('fill', 'black')
                        .text(d => d)


                    g.selectAll('rect')
                        .data(dd[1])
                        .join('rect')
                        .classed('time-block-rect', true)
                        .attr('x', 0)
                        .attr('y', d => hourScale(d.start))
                        .attr('height', d => hourScale(d.end) - hourScale(d.start))
                        .attr('width', dayScale.step() / 2)
                        .attr('stroke', 'black')
                        .attr('fill', d => {
                            if (d.availabilityCount === 0) return unavailableColor
                            return availableColor
                        })
                        .on('mousedown', (e, d) => {
                            if (d.availabilityCount === 0) {
                                initialClickAvailable = true
                                d.availabilityCount = 1
                            } else {
                                initialClickAvailable = false
                                d.availabilityCount = 0
                            }
                        })
                        .attr('fill', d => {
                            if (d.availabilityCount === 0) return unavailableColor
                            return availableColor
                        })
                    g.call(d3.axisLeft(hourScale).tickFormat(d3.format("d")).ticks(6).tickSize(0))

                })
        }


        drawDays()

    }, [svgRef.current, context.timeBlocks]); // redraw chart if data changes

    return <svg ref={svgRef}/>;
};

export default UserTime;