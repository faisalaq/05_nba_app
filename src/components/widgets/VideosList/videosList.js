import React , { Component } from 'react'
import styles from './videosList.css'
import axios from 'axios'
import Buttons from '../Buttons/buttons'
import { URL } from '../../../config'
import VideosListTemplate from './videosListTemplate'

class VideosList extends Component {
    state = {
        teams: [],
        videos: [],
        start: this.props.start,
        end: this.props.start + this.props.amount,
        amount: this.props.amount
    }

    componentWillMount(){
        this.request(this.state.start, this.state.end)
    }

    request= (start, end)=>{
        if(this.state.teams.length < 1) {
            axios.get(`${URL}/teams`)
            .then(response =>{
                this.setState({
                    teams: response.data 
                })
            })
        }

        axios.get(`${URL}/videos?_start=${start}&_end=${end}`)
        .then(response => {
            this.setState({
                videos: [...this.state.videos, ...response.data],
                start,
                end

            })
        })
    }

    renderTitle = ()=>{
        return this.props.title ?
            <h3><strong>NBA</strong> Title</h3> 
            :
            null
    }

    loadMore= () =>{
        let end = this.state.end + this.state.amount
        this.request(this.state.end, end)
    }

    renderButton= ()=>{
        return this.props.loadMore ?
            <Buttons 
                type='loadmore'
                loadMore= {()=> this.loadMore()}
                cta="Load More Videos"
            />
            :
            <Buttons 
                    type="linkTo"
                    LinkTo = "/videos"
                    cta="More Videos"
                />
        
    }

    renderVideos = (type)=>{

        let template = null;

        switch(type){
            case('card'):
                template = <VideosListTemplate data={this.state.videos} teams={this.state.teams}/>
                break;
            default:
                template = null;
        }
        return template
    }

    render(){
        return (
            <div className={styles.videoList_wrapper}>
                {this.renderTitle()}
                {this.renderVideos(this.props.type)}
                {this.renderButton()}
            </div>
        )
    }

}

export default VideosList;