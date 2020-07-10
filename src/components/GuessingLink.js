import React from 'react';
import Modal from 'react-modal';


class GuessingLink extends React.Component{
    componentDidMount(){
        if(this.props.appElementId){
            Modal.setAppElement(`#${this.props.appElementId}`);
        }
    }
   
    copyElementText=(id)=>{
        //console.log(id)
        let text = document.getElementById(id).innerText;
        let elem = document.createElement("textarea");
        document.body.appendChild(elem);
        elem.value = text;
        elem.select();
        document.execCommand("copy");
        document.body.removeChild(elem);
    }
    render(){
        return(
        <Modal
        className="modal"
        closeTimeoutMS={200}
        isOpen={!!this.props.modalLink}
        contentLabel="Copy Link"
        onRequestClose={this.props.onCloseModal}
        >
        {this.props.modalLink && <p className="modal__text" id="link">{this.props.modalLink}</p>}
        <div className="modal__button">
            <button className="btn btn--red" onClick={this.props.onCloseModal}>X</button>
            <button className="btn btn--blue" onClick ={()=>{
            this.copyElementText('link');
            }}>copy</button>
        </div>
        </Modal>
        );
    }
}


export default GuessingLink;