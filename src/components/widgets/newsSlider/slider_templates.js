import React from 'react'
import Slick from 'react-slick'
import { Link } from 'react-router-dom'
import styles from './slider.css'

const SliderTemplates = (props)=> {
    let template = null;

    const settings = {
        dots:true,
        infinite:true,
        arrows:false,
        speed:500,  
        slideToShow:1,
        slideToScroll:1,
        ...props.settings
    }

    switch(props.type) {
        case('featured'):
            template = props.data.map((item, i)=>{
                return (
                    <div key={i}>
                        <div className={styles.featured_item}>
                            <div className={styles.featured_image}
                                style={{
                                    background: `url(../images/articles/${item.image})`
                                }}
                            ></div>
                            <Link to={`/articles/${item.id}`}>
                                <div className={styles.featured_caption}> {item.title}</div>
                            </Link>
                        </div>
                    </div>
                )
            })
            break;
        default:
            template = null
    }

    return (
        <div>
            <Slick {...settings}>
                {template}
            </Slick>
        </div>
    )
}

export default SliderTemplates;