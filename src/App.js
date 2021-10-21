import React from 'react';
import './style.css';
import { uniqueId } from 'lodash';

function DraggableCircle(props) {
  const [isBeingDragged, setBeingDragged] = React.useState(false);
  function moveCircle(event) {
    const ctm = event.target.parentElement.getScreenCTM();
    const newCircle = {
      id: props.id,
      r: props.r,
      x: (event.clientX - ctm.e) / ctm.a,
      y: (event.clientY - ctm.f) / ctm.d,
      color: props.color,
    };
    props.updateCircle(newCircle);
  }
  function onDragStart(event) {
    setBeingDragged(true);
    event.target.setPointerCapture(event.pointerId);
    moveCircle(event);
  }
  function onDragMove(event) {
    if (!isBeingDragged) return;
    moveCircle(event);
  }
  function onDragStop(event) {
    setBeingDragged(false);
    moveCircle(event);
  }
  return (
    <circle
      r={props.r}
      cx={props.x}
      cy={props.y}
      fill={props.color}
      stroke={isBeingDragged ? 'magenta' : ''}
      strokeWidth="5"
      onPointerDown={onDragStart}
      onPointerUp={onDragStop}
      onPointerMove={onDragMove}
    />
  );
}

export default function App() {
  const [circles, setCircles] = React.useState([
    { id: uniqueId(), r: 20, x: 100, y: 100, color: 'red' },
    { id: uniqueId(), r: 30, x: 150, y: 150, color: 'blue' },
    { id: uniqueId(), r: 40, x: 200, y: 200, color: 'orange' },
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
      <svg>
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
            />
          ))}
      </svg>
      <table>
        <tr>
          <th>Id</th>
          <th>Radius</th>
          <th>Center X</th>
          <th>Center Y</th>
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
