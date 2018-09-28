import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import axios from 'axios'
import { URL } from '../../../config'
import styles from './newsList.css'
import Buttons from '../Buttons/buttons'
import CardInfo from '../../widgets/CardInfo/cardInfo'

class NewsList extends Component {

    state = {
        teams: [],
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
        if(this.state.teams.length < 1){
            axios.get(`${URL}/teams`)
            .then(response=> {
                this.setState({
                    teams: response.data
                })
            })
        }
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
                template = this.state.items.map((item, i)=>(
                    <CSSTransition 
                        classNames={{
                            enter:styles.newsList_wrapper,
                            enterActive:styles.newsList_wrapper_enter
                        }}
                        timeout={500}
                        key={i}
                    >
                        <div >
                            <div className={styles.newsList_item} >
                                <Link to={`/articles/${item.id}`}>
                                    <CardInfo teams={this.state.teams} team={item.team} date={item.date}/>
                                    <h2>{item.title}</h2>
                                </Link>
                                
                            </div>
                        </div>
                    </CSSTransition>
                    
                ))
                break;
            case("cardMain"):
                template = this.state.items.map((item, i)=>(
                    <CSSTransition 
                        classNames={{
                            enter:styles.newsList_wrapper,
                            enterActive:styles.newsList_wrapper_enter
                        }}
                        timeout={500}
                        key={i}
                    >
                        <Link to={`articles/${item.id}`}>
                            <div className={styles.flex_wrapper}>
                                <div className={styles.left} 
                                    style={{
                                        background: `url(/images/articles/${item.image})`
                                    }}
                                >
                                    <div></div>
                                </div>
                                <div className={styles.right}>
                                    <CardInfo teams={this.state.teams} team={item.team} date={item.date}/>
                                    <h2>{item.title}</h2>
                                </div>
                            
                            </div> 
                        </Link>
                    </CSSTransition>
                    
                ))
                break;
            default:
                template=null;  
        }
        return template;
    }

    render() {
        console.log(this.state.teams)
        return (
            <div>
                <TransitionGroup
                    Component="div"
                    className="list"
                >
                    {this.renderNews(this.props.type)}
                </TransitionGroup>
                <Buttons 
                    type="loadmore"
                    loadMore={()=>this.loadMore()}
                    cta="load more news"
                />
            </div>
            
        )
    }
}

export default NewsList ;