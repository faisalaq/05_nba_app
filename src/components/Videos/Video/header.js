import React from 'react' 
import TeamNfo from '../../Articles/Elements/teamNfo'


const Header = (props)=>{


    const teamNfo = (team)=>{
        return team ? 
            <TeamNfo team={team}/>
        :
            null
    }

    return (
        <div>
            {teamNfo(props.teamData)}
        </div>
    )
}

export default Header;