import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useState} from 'react'

const  MyModal =(props)=> {

const [answer, setAnswer] = useState(false)
    
const confirm = ()=>{
    setAnswer(true)
    props.answer(true)
    props.onHide()
}

const cancel = ()=>{
    props.answer(false)
    props.onHide()
}

  return (
    <Modal
      show={props.show}
      backdrop={props.backdrop}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={cancel}>Close</Button>
        <Button onClick={confirm}>Ok</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyModal