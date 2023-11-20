import React from "react";
import { useState } from "react";
import { ColorRing,Oval,Dna } from 'react-loader-spinner';


export function Loader(){
    return(
        <>
        <div className="loader">
         <Dna
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
            />
        </div>
        </>
    )
}