import React from 'react';

export default function DraggableCircle(props) {
  const [isBeingDragged, setBeingDragged] = React.useState(false);
  function moveCircle(event) {
    const ctm = event.target.parentElement.getScreenCTM();

    let touch = event;
    if (event.touches) touch = event.touches[0] || touch;

    let xNew = (touch.clientX - ctm.e) / ctm.a;
    let yNew = (touch.clientY - ctm.f) / ctm.d;

    if (xNew - props.r < props.xMin) xNew = props.xMin + props.r;
    if (xNew + props.r > props.xMax) xNew = props.xMax - props.r;
    if (yNew - props.r < props.yMin) yNew = props.yMin + props.r;
    if (yNew + props.r > props.yMax) yNew = props.yMax - props.r;

    const newCircle = {
      id: props.id,
      r: props.r,
      x: xNew,
      y: yNew,
      color: props.color,
    };
    props.updateCircle(newCircle);
  }
  function onDragStart(event) {
    setBeingDragged(true);
    moveCircle(event);
  }
  function onDragMove(event) {
    if (!isBeingDragged) return;
    moveCircle(event);
  }
  function onDragStop(event) {
    setBeingDragged(false);
    //moveCircle(event);
  }
  return (
    <circle
      r={props.r}
      cx={props.x}
      cy={props.y}
      fill={props.color}
      stroke={isBeingDragged ? 'magenta' : ''}
      strokeWidth="5"
      onTouchStart={onDragStart}
      onTouchEnd={onDragStop}
      onTouchMove={onDragMove}
      onMouseDown={onDragStart}
      onMouseMove={onDragMove}
      onMouseUp={onDragStop}
    />
  );
}
