import React from 'react';
import './style.css';
import { uniqueId } from 'lodash';
import DraggableCircle from './DraggableCircle.js';

export default function App() {
  const [width, setWidth] = React.useState(200);
  const [height, setHeight] = React.useState(400);
  const [circles, setCircles] = React.useState([
    { id: uniqueId(), r: 20, x: 50, y: 50, color: 'red' },
    { id: uniqueId(), r: 30, x: 50, y: 50, color: 'blue' },
    { id: uniqueId(), r: 40, x: 50, y: 50, color: 'orange' },
  ]);
  function updateCircle(newCircle) {
    //using filter changes the index of the element every time
    //setCircles([...circles.filter((it) => it.id !== newCircle.id), newCircle]);
    let newCircles = [];
    for (let oldCircle of circles)
      newCircles.push(oldCircle.id === newCircle.id ? newCircle : oldCircle);
    setCircles(newCircles);
  }
  return (
    <div>
      <svg style={{ width: width, height: height }}>
        {[...circles]
          .sort((it) => -it.r)
          .map((it) => (
            <DraggableCircle
              key={it.id}
              id={it.id}
              r={it.r}
              x={it.x}
              y={it.y}
              color={it.color}
              updateCircle={updateCircle}
              xMin={0}
              xMax={width}
              yMin={0}
              yMax={height}
            />
          ))}
      </svg>
      <table>
        <tr>
          <th>Id</th>
          <th>Radius</th>
          <th>X</th>
          <th>Y</th>
          <th>Color</th>
        </tr>
        {circles.map((it) => (
          <tr key={it.id}>
            <td>{it.id}</td>
            <td>{it.r}</td>
            <td>{Math.round(it.x)}</td>
            <td>{Math.round(it.y)}</td>
            <th style={{ color: it.color }}>{it.color}</th>
          </tr>
        ))}
      </table>
    </div>
  );
}
