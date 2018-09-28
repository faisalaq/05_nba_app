import React from 'react'
import NewsSlider from '../../../widgets/newsSlider/slider'
import NewsList from '../../../widgets/NewsList/newsList'

const NewsMain = ()=>{
    return (
        <div>
            <NewsSlider 
                start={0}
                amount={3}
                type="featured"
                setting={{
                    dots: false
                }}
            />
            <NewsList 
                start={0}
                amount={3}
                type="cardMain"

            />
        </div>
    )
}

export default NewsMain;