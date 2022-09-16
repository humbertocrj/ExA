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
       
          {props.text}
       
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={cancel}>Cancelar</Button>
        <Button onClick={confirm}>Confirmar</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyModal