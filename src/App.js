import React from "react"
import "./style.css"
import { uniqueId } from "lodash"
import ShapeSvg from "./ShapeSvg"
import CirclesTable from "./CirclesTable.js"

export default function App() {
    const [width, setWidth] = React.useState(200)
    const [height, setHeight] = React.useState(400)
    const [circles, setCircles] = React.useState([
        { id: uniqueId(), r: 20, x: 50, y: 50, color: "red" },
        { id: uniqueId(), r: 30, x: 50, y: 50, color: "blue" },
        { id: uniqueId(), r: 40, x: 50, y: 50, color: "orange" },
    ])
    function updateCircle(newCircle) {
        //using filter changes the index of the element every time
        //setCircles([...circles.filter((it) => it.id !== newCircle.id), newCircle]);
        let newCircles = []
        for (let oldCircle of circles)
            newCircles.push(
                oldCircle.id === newCircle.id ? newCircle : oldCircle
            )
        setCircles(newCircles)
    }
    return (
        <div>
            <ShapeSvg
                width={width}
                height={height}
                circles={circles}
                updateCircle={updateCircle}
            />
            <CirclesTable circles={circles} />
        </div>
    )
}
