import React , { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home/home';
import Layout from './hoc/Layout/layout';
import NewArticles from './components/Articles/News/Post/index';

class Routes extends Component {
    render(){
        return (
            <Layout>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/articles/:id" exact component={NewArticles} />
                </Switch>
            </Layout>
        )
    }
}

export default Routes;