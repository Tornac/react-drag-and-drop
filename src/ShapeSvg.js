import React from 'react'
import DraggableCircle from './DraggableCircle.js'
import DraggableRect from './DraggableRect.js'

export default function ShapeSvg(props) {
    const circles = props.shapes
        .filter(it => it.type === 'circle')
        .sort(it => -it.r)
        .map(it => (
            <DraggableCircle
                key={it.id}
                id={it.id}
                r={it.r}
                x={it.x}
                y={it.y}
                color={it.color}
                updateCircle={props.updateShape}
                xMin={0}
                xMax={props.width}
                yMin={0}
                yMax={props.height}
            />
        ))
    const rects = props.shapes
        .filter(it => it.type === 'rect')
        .sort(it => -it.w * it.h)
        .map(it => (
            <DraggableRect
                id={it.id}
                x={it.x}
                y={it.y}
                w={it.w}
                h={it.h}
                updateShape={props.updateShape}
                color={it.color}
                xMin={0}
                xMax={props.width}
                yMin={0}
                yMax={props.height}
            />
        ))
    return (
        <svg style={{ width: props.width, height: props.height }}>
            {circles}
            {rects}
        </svg>
    )
}
