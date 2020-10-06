import React, {useState, useEffect} from 'react';
import CommentCont from './CommentCont';
import Axios from 'axios';
import Modal from 'react-bootstrap/Modal'
import './Comment.css'
import {Image, ModalBody} from 'react-bootstrap';
import '../../assets/ModalPage.css'
import '../../assets/DelModal.css'
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const Comment = (props) =>{
    const [isOpen, setIsOpen] = React.useState(false);
    const [state, setState] = useState({isLoading : true, comments : []})
    const showModal = () => {
        setIsOpen(true);
      };
    
      const hideModal = () => {
        setIsOpen(false);
      };
    useEffect(() => {
        const getData = async() => {
            try{
                var result = await Axios.get(`/api/get_article_comment?article_id=${props.id}`);
                setState({isLoading : false, comments : result.data})
            } catch(error) {
                alert(error)
                setState({isLoading : false, comments : []})
            }
        }
        getData();
    },[props.id])

    //deleteModal
    const [isOpen2, setIsOpen2] = React.useState(false);
    const showModal2 = () => {
        setIsOpen2(true);
      };
      const hideModal2 = () => {
        setIsOpen2(false);
      };
    return state.isLoading ? (
        <div className="loading">
            <span>Loading...</span>
        </div>
        ) : (
        <div className="comment">
            <div className="comment-title">
                <div className="left font-s26-w7-b9">댓글 <span className="font-s18-w5-b9">({state.comments.length})</span></div>
                <div className="right font-s26-w7-b9" onClick={() => showModal(true)}>댓글쓰기</div>
                <Modal className="modal-size" backdrop="static" show={isOpen}  onHide={hideModal}  >
                <ModalHeader bsPrefix = "modal-title">
                <Image src="/image/Modal/logo.png" className = "modal-title"/>
                <div className = "modal-title2">
                댓글쓰기
                </div>
                </ModalHeader>
                <ModalBody bsPrefix ="modal-name">
                <Form className="middle-modal">
                <Form.Group controlId="formGroupEmail">
                    <Form.Label>이름</Form.Label>
                    <Form.Control type="name" className = "myfont-size" placeholder="5자 제한" />
                </Form.Group>

                <Form.Group controlId="formGroupPassword">
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control type="password" className = "myfont-size" placeholder="●●●●" />
                </Form.Group>

                <Form.Group controlId="formGroupPassword">
                <Form.Label>댓글</Form.Label>
                <Form.Control className = "comment-form" type="comment" placeholder="작품 감상평 또는 응원의 댓글을 달아주세요.(80자 제한)" />
                </Form.Group>

                </Form>

                </ModalBody>

                <Button onClick={hideModal} variant="success">등록</Button>
                <div onClick={hideModal} variant="close">
                    <Image src="/imgs/x.png" className="x-close" alt="logo" />
                </div>
                </Modal>                
            </div>
            <div className="comment-cont">
                {
                    state.comments.map((item, index) => (
                        <CommentCont key={index} id={item.id} name={item.uploader_name} cont={item.comment} date={item.upload_date} onClick={() => showModal2(true)}></CommentCont>
                    ))
                }
            </div>

            <Modal backdrop="static" show={isOpen2}  onHide={hideModal2} className= "modal-size2" >
                <ModalHeader bsPrefix = "modal-title">
                <Image src="/image/Modal/logo.png" className = "modal-title"/>
                <div className = "modal-title2">
                댓글삭제
                </div>
                </ModalHeader>
                <ModalBody bsPrefix ="modal-name">

                <Form className="middle-modal">
                <Form.Group controlId="formGroupPassword">
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control type="password" className = "myfont-size" placeholder="댓글 작성시 입력했던 비밀번호를 입력해 주세요." />
                </Form.Group>
                </Form>

                </ModalBody>

                <Button onClick={hideModal2} variant="success">삭제</Button>
                <div onClick={hideModal2} variant="close">
                    <Image src="/imgs/x.png" className="x-close2" alt="logo" />
                </div>
                </Modal>     



        </div>
    );
    
}

export default Comment;

// onClick={() => showModal(true)}
