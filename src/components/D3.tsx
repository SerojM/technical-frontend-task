import React, {
  ReactElement, useEffect, useRef, useState,
} from 'react';
import * as d3 from 'd3';
import LeftSideBar from './Layouts/LeftSideBar';

const customData = [
  { id: 1, value: 34 },
  { id: 2, value: 334 },
  { id: 3, value: 134 },
  { id: 4, value: 324 },
  { id: 5, value: 74 },
  { id: 6, value: 23 },
  { id: 7, value: 51 },
  { id: 8, value: 99 },
  { id: 9, value: 87 },
  { id: 10, value: 134 },
  { id: 11, value: 200 },
  { id: 12, value: 25 },
];

export default function D3(): ReactElement {
  const ref = useRef<HTMLHeadingElement>(null);
  const w = 300;
  const h = 350;

  const [dataset, setDataset] = useState<object[]>(customData);

  const runVisual = () => {
    if (dataset && ref?.current) {
      let rect;
      if (ref?.current?.children[0]) {
        rect = d3.select(ref?.current?.firstElementChild).selectAll('rect').data(dataset, (d: any) => d.id);
        // update
        rect.transition()
          .duration(1000)
          .attr('x', (d, i) => i * 25)
          .attr('y', (d: any) => h - d.value)
          .attr('width', 20)
          .attr('height', (d: any) => d.value)
          .attr('fill', '#750000');

        // enter
        rect.enter().append('rect')
          .attr('x', (d, i) => (i + 1) * 25)
          .attr('y', (d: any) => h - d.value)
          .attr('width', 20)
          .attr('height', (d: any) => d.value)
          .attr('fill', '#360000');

        // exit
        rect.exit().transition().duration(1000).attr('x', -25)
          .remove();
      } else {
        const svg = d3.select(ref.current)
          .append('svg')
          .attr('width', w)
          .attr('height', h);
        rect = svg.selectAll('rect').data(dataset, (d: any) => d.id);

        // enter
        rect.enter().append('rect')
          .attr('x', (d, i) => (i + 1) * 25)
          .attr('y', (d: any) => h - d.value)
          .attr('width', 20)
          .attr('height', (d: any) => d.value)
          .attr('fill', '#750000');
      }
    }
    setTimeout(() => {
      const newArrDataset = [...dataset];
      newArrDataset.shift();
      newArrDataset.push({ id: Math.random(), value: Math.floor(Math.random() * h) });
      setDataset(newArrDataset);
    }, 1000);
  };

  useEffect(() => {
    runVisual();
  }, [dataset]);

  return (
    <LeftSideBar>
      <div className="d3__wrapper">
        <h2>D3 Visualisation</h2>
        <div ref={ref} />
      </div>
    </LeftSideBar>
  );
}
