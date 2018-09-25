import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import axios from 'axios'
import { URL } from '../../../config'
import styles from './newsList.css'

class NewsList extends Component {

    state = {
        items: [],
        start:this.props.start,
        end:this.props.start+this.props.amount,
        amount:this.props.amount
    }

    componentWillMount(){
        this.request(this.state.start, this.state.end)
    }

    loadMore(){
        let end = this.state.end + this.state.amount;

        this.request(this.state.end, end)
    }

    request(start, end){
        axios.get(`${URL}/articles?_start=${this.state.start}&_end=${this.state.end}`)
        .then(response => {
            this.setState({
                items: [...this.state.items, ...response.data]
            })
        })
    }

    renderNews = (type) => {
        let template = null; 

        switch(type) {
            case('card'):
            console.log(type)
                template = this.state.items.map((item, i)=>(
                    <div key={i}>
                        <div className={styles.newsList_item} >
                            <Link to={`/articles/${item.id}`}>
                                <h2>{item.title}</h2>
                            </Link>

                        </div>
                    </div>
                ))
                break;
            default:
                template=null;  
        }
        return template;
    }

    render() {
        console.log(this.state.items)
        return (
            <div>
                {this.renderNews(this.props.type)}
                <div onClick = {()=>this.loadMore()}>
                    Load More
                </div>
            </div>
            
        )
    }
}

export default NewsList ;