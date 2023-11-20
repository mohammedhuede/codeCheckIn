import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import { Link } from '@mui/material';
import { reviewInsuranceListSample } from '../../../../constants/constants';


function Insurance({ insurances }) {
     const getFilteredInsurances = () => {
          return (reviewInsuranceListSample.filter(el => insurances?.includes(el.label)))
     }
     return (
          <div className=''>
               {insurances?.length && getFilteredInsurances()?.length > 0 ?
                    <div className='insurance-sec'>
                         {insurances?.length && getFilteredInsurances()?.map((insurance, i) => {
                              return (
                                   <div key={i} className='profile-insurance-block'>
                                        <img src={`/images/${insurance.img}.png`} />
                                        <p className='fs-12 mt-16'>{insurance.label}</p>
                                   </div>
                              )
                         })}
                    </div> :
                    <div className='empty-state text-center mt-120'>
                         <img src={"/images/emptyicon.svg"} />
                         <p className='fs-16 font-medium'>No Insurance Provided </p>
                    </div>}


          </div>
     );
}

export default Insurance;