import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Badge } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { inclusionsOptionsForStep5 as inclusionsOptions } from '../../constants/constants';

function OffCanvasExample({ name, doc, inclusions, children, ...props }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getQualification = (qualArr) => {
    let arr = []
    for (let i = 0; i < qualArr.length; i++) {
      if (i === qualArr.length - 1) {
        arr.push(`${qualArr[i]}`)
      } else if (i === qualArr.length - 2) {
        arr.push(`${qualArr[i]} and `)
      }
      else {
        arr.push(`${qualArr[i]}, `)
      }
    }
    return arr.join('')
  }

  const inclusionsFunc = (doctor) => {
    let arr = inclusionsOptions.filter(obj => doctor[obj.value])
    return arr
  }
  return (
    <>
      <div variant="primary" onClick={handleShow} className="me-2 cursor-pointer">
        {children}
      </div>
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <div className='d-flex align-items-start'>
              <img src={doc?.docImageUrl ? doc?.docImageUrl : "/images/dr-empty-state-image.svg"} alt='doctor' className='drdetail-profile' />
              <div className='ml-16'>
                <Badge bg="secondary">{doc?.hospitalName}</Badge>
                <h4 className='mt-8 fs-18'>{doc?.name}</h4>
                <p className='fs-14 mt-16'>{getQualification(doc?.qualification)}</p>
                <p className='fs-14'>{doc?.designation}  •  {doc?.experience}</p>
              </div>
            </div>
            <div className='sidebar-grey-block flex-align-center'>
              <p className='fs-10 text-grey'>Facilities Offered</p>
              {
                Array.isArray(inclusionsFunc(doc)) && inclusionsFunc(doc).length ? inclusionsFunc(doc).map((inc, l) => {
                  return (
                    <div key={l} className="display-content">
                      {['top'].map((placement) => (
                        <OverlayTrigger
                          key={placement}
                          placement={placement}
                          overlay={
                            <Tooltip id={`tooltip-${placement}`}>
                              <div>
                                <div className='tootltip-item '>{inc.label}</div>
                              </div>
                            </Tooltip>
                          }
                        >
                          <Button className='btn-tertiary ml-16 '><img src={`/images/${inc.value}.svg`} alt='inclusion' className='w-12' /></Button>
                        </OverlayTrigger>
                      ))}
                    </div>
                  )
                }) : null
              }
            </div>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className=''>
            <hr
              style={{
                background: '#E4E7EC',
                color: '#E4E7EC',
                height: '1px',
                width: '100%',
                opacity: '1',
                margin: '0px',
              }}
            />
          </div>
          <h2 className='fs-16 mt-24'>Overview</h2>
          <p className='text-grey fs-14 mt-12'>
            {doc.overview}
          </p>
          <div className='mt-24'>
            <hr
              style={{
                background: '#E4E7EC',
                color: '#E4E7EC',
                height: '1px',
                width: '100%',
                opacity: '1',
                margin: '0px',
              }}
            />
          </div>
          {Array.isArray(doc.treatments) && doc.treatments.length ?
            (<><h2 className='fs-16 mt-24'>Treatments</h2>
              <div className='mt-12'>
                {doc.treatments.map((treat, k) => {
                  return <Badge key={k} bg="light" className='mr-4 mb-4'>{treat.label}</Badge>
                })}
              </div>
            </>)
            : null}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export function Example({ doc, inclusions, ...props }) {
  return (
    <>
      {['end'].map((placement, idx) => (
        <OffCanvasExample key={idx} placement={placement} name={placement} doc={doc} inclusions={inclusions} children={props.children} />
      ))}
    </>
  );
}
