import React from 'react'
import style from './header.css'
import { Link } from 'react-router-dom'
import FontAwesome from 'react-fontawesome'

const Header = ()=>{

    const navBar = ()=> {
        return (
            <div className={style.bars}>
                <FontAwesome name="bars"
                    style = {{
                        color: '#dfdfdf',
                        padding:'10px',
                        cursor:'pointer'  
                    }}
                />   

            </div>
        )
    }

    const logo = ()=>{
        return (
            <Link to="/" className={style.logo}>
                <img alt="nba logo" src="/images/nba_logo.png"/>
            </Link>
        )
    }

   return (
       <header className={style.header}>
       <div className={style.headerOpt}>
           {navBar()}
           {logo()}
           Header whatever
       </div>
       </header>
   ) 
}

export default Header;