import React from 'react'

const Loading = () => {
    return (
        <div>

            <div className="spinner-border text-succuss d-flex fs-5"
                style={{
                    width: "15rem", height: "15rem", borderBottom: "5px solid white",
                    opacity: "20%", margin:"auto auto"
                }}
                role="status">
                <span className="sr-only">Loading...</span>
            </div>

        </div>
    )
}

export default Loading
