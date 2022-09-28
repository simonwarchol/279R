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
        let initialClickAvailable = true;


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

        const brushingRect = container.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", 0)
            .attr("height", 0)
            .attr("fill", "none")


        let dragStart = {}

        // Code below suggested by colab
        const doRectanglesOverlap = (r1, r2) => {
            return !(r2.left > r1.right ||
                r2.right < r1.left ||
                r2.top > r1.bottom ||
                r2.bottom < r1.top);
        }


        const drag = d3.drag()
            .on("start", (e) => {
                const event = d3.pointer(e, container.node());
                dragStart = {
                    x: event[0],
                    y: event[1],
                }
            })
            .on("drag", (e) => {
                const d3Event = d3.pointer(e, container.node());
                const event = {x: d3Event[0], y: d3Event[1]}
                d3.select(brushingRect.node())
                    .attr("x", dragStart.x > event.x ? event.x : dragStart.x)
                    .attr("y", dragStart.y > event.y ? event.y : dragStart.y)
                    .attr("width", dragStart.x > event.x ? dragStart.x - event.x : event.x - dragStart.x)
                    .attr("height", dragStart.y > event.y ? dragStart.y - event.y : event.y - dragStart.y)
                let brushingRectDom = brushingRect.node().getBoundingClientRect()
                d3.selectAll('.time-block-rect')
                    .each((dat, i, rects) => {
                        const timeRectDom = d3.select(rects[i]).node().getBoundingClientRect();
                        if (doRectanglesOverlap(timeRectDom, brushingRectDom)) {
                            dat.inDrag = true
                        } else {
                            delete dat.inDrag;
                        }
                    })
                drawDays();
            })
            .on("end", () => {
                brushingRect.x = brushingRect.y = brushingRect.width = brushingRect.height = null;
                d3.selectAll('.time-block-rect')
                    .each((dat, i, rects) => {
                        if (dat.inDrag && initialClickAvailable) {
                            dat.availabilityCount = 1;
                            delete dat.inDrag;
                        } else if (dat.inDrag && !initialClickAvailable) {
                            dat.availabilityCount = 0;
                            delete dat.inDrag;
                        }
                    })
                d3.select(brushingRect.node())
                    .attr("x", 0)
                    .attr("y", 0)
                    .attr("width", 0)
                    .attr("height", 0)

                // Update the context
                drawDays();

                let tmpParticipants = _.cloneDeep(context.participants);
                const flattenedTimeBlock = _.chain(timeBlockDays)
                    .map(d => d[1].map(dd => dd))
                    .flatten()
                    .value()

                flattenedTimeBlock.forEach((dd, i) => {
                    tmpParticipants[0].availabilityList[i] = dd.availabilityCount === 1;
                })
                console.log('tmp,', tmpParticipants)
                context.setParticipants(tmpParticipants);


            })
        drag(container);


        const timeBlockDays = _.chain(context.timeBlocks)
            .cloneDeep()
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
            .range([0, 400])

        const hourScale = d3.scaleLinear()
            .domain([1, 6])
            .range([0, 400])

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


                    g.selectAll('.time-block-rect')
                        .data(dd[1])
                        .join('rect')
                        .classed('time-block-rect', true)
                        .attr('x', 0)
                        .attr('y', d => hourScale(d.start))
                        .attr('height', d => hourScale(d.end) - hourScale(d.start))
                        .attr('width', dayScale.step() / 2)
                        .attr('stroke', 'black')
                        .attr('fill', d => {
                            if (d.inDrag && initialClickAvailable) {
                                return availableColor
                            } else if (d.inDrag && !initialClickAvailable) {
                                return unavailableColor;
                            } else if (d.availabilityCount === 0) {
                                return unavailableColor
                            } else {
                                return availableColor
                            }
                        })
                        .on('mousedown', (e, d) => {
                            if (d.availabilityCount === 0) {
                                initialClickAvailable = true
                                // d.availabilityCount = 1
                            } else {
                                initialClickAvailable = false
                                // d.availabilityCount = 0
                            }
                        })

                    g.call(d3.axisLeft(hourScale).tickFormat(d3.format("d")).ticks(6).tickSize(0))

                })
        }


        drawDays()

    }, [svgRef.current, context.isLoaded]); // redraw chart if data changes

    return <svg ref={svgRef}/>;
};

export default UserTime;