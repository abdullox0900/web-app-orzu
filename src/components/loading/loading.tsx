import './loading.css'

function Loading() {
    return (
        <div className='w-full h-screen bg-white flex justify-center items-center'>
            <div className="simple-spinner">
                <span></span>
            </div>
        </div>
    )
}

export default Loading