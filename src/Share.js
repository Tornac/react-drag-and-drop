import { uniqueId } from 'lodash'
import React from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Share(props) {
    const [shareCode, setShareCode] = React.useState('')
    function share() {
        const code = JSON.stringify(
            props.shapes.map(it => {
                return { ...it, id: undefined }
            })
        )
        setShareCode(code)
        window.navigator.clipboard.writeText(code).then(() => toast('copied code to clipboard'))
    }
    function load() {
        const newShapes = JSON.parse(shareCode)
        props.setShapes(
            newShapes.map(it => {
                it.id = uniqueId()
                return it
            })
        )
    }
    function attemptLoad(event) {
        setShareCode(event.target.value)
        // TODO
    }
    return (
        <div>
            <button onClick={share}>Generate Share Code</button>
            <input type="text" value={shareCode} onChange={attemptLoad} />
            <button onClick={load}>Load</button>
            <ToastContainer />
        </div>
    )
}
