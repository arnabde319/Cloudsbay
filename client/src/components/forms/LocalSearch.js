import React from "react";

const localSearch = (props) => {

    const handleSearchChange = (e) => {
        e.preventDefault();
        props.setKeyword(e.target.value.toLowerCase());
    }

    return (
        <div className="pt-4 pb-4">
            <input type = 'search' placeholder="Filter" value={props.keyword} onChange = {handleSearchChange} className='form-control'/>
        </div>  
    )
}

export default localSearch;