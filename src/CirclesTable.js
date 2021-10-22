import React from 'react';

export default function CirclesTable(props) {
  return (
    <table>
      <tr>
        <th>Id</th>
        <th>Radius</th>
        <th>X</th>
        <th>Y</th>
        <th>Color</th>
      </tr>
      {props.circles.map((it) => (
        <tr key={it.id}>
          <td>{it.id}</td>
          <td>{it.r}</td>
          <td>{Math.round(it.x)}</td>
          <td>{Math.round(it.y)}</td>
          <th style={{ color: it.color }}>{it.color}</th>
        </tr>
      ))}
    </table>
  );
}
