import React from 'react'

export default function DraggableRect(props) {
    const [isBeingDragged, setBeingDragged] = React.useState(false)
    function move(event) {
        const ctm = event.target.parentElement.getScreenCTM()

        let touch = event
        if (event.touches) touch = event.touches[0] || touch

        let xNew = (touch.clientX - ctm.e) / ctm.a - 0.5 * props.w
        let yNew = (touch.clientY - ctm.f) / ctm.d - 0.5 * props.h

        if (xNew < props.xMin) xNew = 0
        if (xNew + props.w > props.xMax) xNew = props.xMax - props.w
        if (yNew < props.yMin) yNew = 0
        if (yNew + props.h > props.yMax) yNew = props.yMax - props.h

        props.updateShape({
            id: props.id,
            type: 'rect',
            x: xNew,
            y: yNew,
            w: props.w,
            h: props.h,
            color: props.color,
        })
    }
    function onDragStart(event) {
        setBeingDragged(true)
        move(event)
    }
    function onDragMove(event) {
        if (!isBeingDragged) return
        move(event)
    }
    function onDragStop(event) {
        setBeingDragged(false)
    }
    return (
        <rect
            x={props.x}
            y={props.y}
            width={props.w}
            height={props.h}
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
    )
}
