import React from 'react'
import './style.css'
import { uniqueId } from 'lodash'
import ShapeSvg from './ShapeSvg'
import CirclesTable from './CirclesTable.js'

export default function App() {
    const [width, setWidth] = React.useState(200)
    const [height, setHeight] = React.useState(400)
    const [shapes, setShapes] = React.useState([
        { id: uniqueId(), type: 'rect', x: 0, y: 0, w: 50, h: 50, color: 'green' },
        { id: uniqueId(), type: 'circle', r: 20, x: 50, y: 50, color: 'red' },
    ])
    function updateShape(newShape) {
        let newShapes = []
        for (let oldShape of shapes)
            newShapes.push(oldShape.id === newShape.id ? newShape : oldShape)
        setShapes(newShapes)
    }
    return (
        <div>
            <ShapeSvg width={width} height={height} shapes={shapes} updateShape={updateShape} />
            <CirclesTable circles={shapes.filter(it => it.type === 'circle')} />
        </div>
    )
}
