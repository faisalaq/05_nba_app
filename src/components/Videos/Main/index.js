import React from 'react'
import VideosList from '../../widgets/VideosList/videosList'


const VideosMain = ()=> {

    return (
            <VideosList 
                start={0}
                amount={3}
                type='card'
                loadMore={true}
                title={false}
            />
        
    )
}

export default VideosMain;