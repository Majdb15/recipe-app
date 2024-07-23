import React from 'react';
import './style.css'
import '../../styles/colors.css'
import '../../styles/utilities.css'

const TextArea = ({placeHolder,type,onTextChange}) => {


    return (
        <div className='flex column full-width  my-text-area center'>
            <textarea 
            type={type}
            className='rounded full-width '
            placeholder={placeHolder}
            onChange={(e)=>onTextChange(e)}
            ></textarea>

        </div>
    )
}

export default TextArea;