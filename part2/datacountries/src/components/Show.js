import { useState } from 'react'
import Country from './Country'

const Show = ({ country }) => {

    const [show, setShow] = useState(false)

    const handleClick = () => {
        setShow(!show);
    }

    if(!show){
        return <button onClick={handleClick}>show</button>
    }else{
        return(
            <div>
                <Country country={country}/>
                <button onClick={handleClick}>hide</button>
            </div>
        )
    }
    
}

export default Show