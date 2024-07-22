import React from 'react';
import './style.css'
import '../../styles/colors.css'
import '../../styles/utilities.css'

const Input = ({label,placeHolder,type}) => {


    return (
        <div className='flex column full-width my-input center'>
            <input 
            type={type}
            className='rounded '
            placeholder={placeHolder}
            ></input>

        </div>
    )
}

export default Input;