import DraggableCircle from "./DraggableCircle.js"
import React from "react"

export default function ShapeSvg(props) {
    return (
        <svg style={{ width: props.width, height: props.height }}>
            {[...props.circles]
                .sort((it) => -it.r)
                .map((it) => (
                    <DraggableCircle
                        key={it.id}
                        id={it.id}
                        r={it.r}
                        x={it.x}
                        y={it.y}
                        color={it.color}
                        updateCircle={props.updateCircle}
                        xMin={0}
                        xMax={props.width}
                        yMin={0}
                        yMax={props.height}
                    />
                ))}
        </svg>
    )
}
