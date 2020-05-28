import React, { useState, useEffect } from 'react';
import {MODAL_TITLES, MODAL_TEXTS} from '../data/Modal_Text';

interface ModalProps {
    isFirstRun?: boolean;
    setIFR: Function;
    setTIA: Function;
}

const Modal: React.FC<ModalProps> = ({
    isFirstRun,
    setIFR,
    setTIA,
    }) => {

    const [cardPage, setCardPage] = useState<number>(0);
    const [CurrentAnimation, setCurrentAnimation] = useState<string>('');
    const [isModal, setIsModal] = useState<boolean>(true);
    const [isSmallModalVisible, setIsSmallModalVisible] = useState<boolean>(false);
    const [isShowing, setIsShowing] = useState<boolean>(true);

    const nextCard = () => {
        if(cardPage === 2 && isFirstRun) {
            setCurrentAnimation('side-bar--hide-modal');
            setCardPage(6);
            setIsModal(false);
            setTimeout(()=>{
                setIsSmallModalVisible(true);
                setCurrentAnimation('side-bar--show')
                setCardPage(3);
                setTIA(3)
            },600);
        } else if (cardPage <= 4){
            if (isFirstRun){
                if (cardPage === 3) {setTIA(4)}
                if (cardPage === 4) {setTIA(5)}
            }
            setIsShowing(false);
            setTimeout(() => {
                setCardPage(cardPage=>cardPage+1);
            }, 200)
        } else {
            if (isFirstRun){setTIA(0)}
            setIFR(false);
            setIsSmallModalVisible(false);
            setCurrentAnimation('side-bar--hide')
            setIsShowing(false);
            setTimeout(() => {
                setCardPage(1);
            }, 300)
        }
    }

    const skipCards = () => {
        if (isModal) {
            if (isFirstRun){setTIA(0)}
            setIFR(false);
            setCurrentAnimation('side-bar--hide-modal');
            setTimeout(() => {
                setIsModal(false);
                setCardPage(1);
            }, 300);
        } else {
            if (isFirstRun){setTIA(0)}
            setIFR(false);
            setIsSmallModalVisible(false);
            setCurrentAnimation('side-bar--hide');
            setTimeout(() => {
                setCardPage(1)
            }, 300);
        }
    }

    const toggleCard = () => {
        setIsSmallModalVisible(!isSmallModalVisible);
        setCurrentAnimation(isSmallModalVisible ? 'side-bar--hide' : 'side-bar--show')
    }

    useEffect(() => {
        setIsShowing(true);
    }, [cardPage]);

    return (
        <div className={`
                side-bar 
                ${CurrentAnimation} 
                ${isModal ? 'side-bar--is-modal': ''}`}>
            <div className={
                    `side-bar__content 
                    ${isShowing ? 'side-bar__content--show' : 'side-bar__content--hide'}`}>
                <h1 className='side-bar__title'>{MODAL_TITLES[cardPage]}</h1> 
                <p  className='side-bar__text'> {MODAL_TEXTS[cardPage]}</p>
            </div>
            <div className="side-bar__next">
                <p onClick={()=>skipCards()}>
                    Skip
                </p>
                <span
                    onClick={()=>nextCard()} 
                    className="material-icons">
                    arrow_forward
                </span>
                
            </div>
            <div onClick={()=>toggleCard()}
                 className={
                     `toggle-side 
                     ${isSmallModalVisible ? 'toggle-side--toggle': ''}
                     ${isModal ? 'toggle-side--disabled' : ''}`}>
                <span className="material-icons">
                    help_outline
                </span>
            </div>
        </div>
    )
}

export default Modal;
