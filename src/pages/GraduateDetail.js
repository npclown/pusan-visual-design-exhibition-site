import React from 'react';

const GraduateDetail = ({match})=>{
    const {params: {idx}} = match
    return (
        <>
          <p>
            <strong>
                졸업자 idx:
            </strong>
            {idx}
          </p>
        </>
      );
    };


export default GraduateDetail
