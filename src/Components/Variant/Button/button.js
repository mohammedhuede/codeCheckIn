import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
function Buttons() {
  return (
    <>
      <Button variant="primary btn-lg" type="submit">Sign in</Button>
      <Button variant="secondary btn-lg" type="submit">Sign in</Button>
      <Button variant="disabled btn-lg" type="submit">Sign in</Button>
    </>
  );
}

export default Buttons;