import React from "react";
import { Parallax, Background } from 'react-parallax';

export default function Banner(props){
    let topNav = props.topnav
    let location = props.location
    return(
        topNav.map(nav=>(
            nav.linkto===location?
                nav.board.url!==null?
                    <React.Fragment key={nav.id}>
                        <Parallax
                            blur={10}
                            bgImage={nav.board.url}
                            strength={200}
                        >
                            Blur transition from min to max
                            <div style={{ height: '400px' }} />
                        </Parallax>
                    </React.Fragment> :<div key={nav.id}></div>
                :<div key={nav.id}></div>
        ))
    )
}