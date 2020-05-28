import React, { useState, useEffect } from 'react';
import {MODAL_TITLES, MODAL_TEXTS} from '../data/Modal_Text';

const CSS_CLASSES = {
    HIDE_MODAL: 'side-bar--hide-modal',
    SHOW_SIDEBAR: 'side-bar--show',
    HIDE_SIDEBAR: 'side-bar--hide',
}

interface ModalProps {
    isFirstRun?: boolean;
    setIsFirstRun: Function;
    setTutorialIsAt: Function;
}

const Modal: React.FC<ModalProps> = ({
    isFirstRun,
    setIsFirstRun,
    setTutorialIsAt,
    }) => {

    const [cardPage, setCardPage] = useState<number>(0);
    const [CurrentAnimation, setCurrentAnimation] = useState<string>('');
    const [isModal, setIsModal] = useState<boolean>(true);
    const [isSmallModalVisible, setIsSmallModalVisible] = useState<boolean>(false);
    const [isShowing, setIsShowing] = useState<boolean>(true);

    const nextCard = () => {
        if(cardPage === 2 && isFirstRun) {
            setCurrentAnimation(CSS_CLASSES.HIDE_MODAL);
            setCardPage(7);
            setIsModal(false);
            setTimeout(()=>{
                setIsSmallModalVisible(true);
                setCurrentAnimation(CSS_CLASSES.SHOW_SIDEBAR)
                setCardPage(3);
                setTutorialIsAt(3)
            },600);
        } else if (cardPage <= 5){
            if (isFirstRun){
                if (cardPage === 3) {setTutorialIsAt(4)}
                if (cardPage === 4) {setTutorialIsAt(5)}
            }
            setIsShowing(false);
            setTimeout(() => {
                setCardPage(cardPage=>cardPage+1);
            }, 200)
        } else {
            if (isFirstRun){setTutorialIsAt(0)}
            setIsFirstRun(false);
            setIsShowing(false);
            setTimeout(() => {
                setCardPage(1);
            }, 300)
        }
    }

    const skipCards = () => {
        if (isModal) {
            if (isFirstRun){setTutorialIsAt(0)}
            setIsFirstRun(false);
            setCurrentAnimation(CSS_CLASSES.HIDE_MODAL);
            setTimeout(() => {
                setIsModal(false);
                setCardPage(1);
            }, 300);
        } else {
            if (isFirstRun){
                setTutorialIsAt(0)
                setIsFirstRun(false);
                setIsSmallModalVisible(false);
                setCurrentAnimation(CSS_CLASSES.HIDE_MODAL);
                setTimeout(() => {
                    setCardPage(1)
                }, 300);
            } else {
                setIsFirstRun(false);
                setIsShowing(false);
                setTimeout(() => {
                    if (cardPage === 6) {
                        setCardPage(1);
                    } else {
                        setCardPage(6);
                    }
                }, 300);
            }
        }
    }

    const toggleCard = () => {
        setIsSmallModalVisible(!isSmallModalVisible);
        setCurrentAnimation(isSmallModalVisible ? CSS_CLASSES.HIDE_SIDEBAR : CSS_CLASSES.SHOW_SIDEBAR)
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
                <p  className='side-bar__text'>
                    {MODAL_TEXTS[cardPage]}
                    {cardPage === 6 ? 
                        <div> 
                            <a target="_blank" rel="noopener noreferrer" href='https://github.com/juanUrdaneta?tab=repositories'>GitHub</a> 
                            <a target="_blank" rel="noopener noreferrer" href='https://www.linkedin.com/in/juanurdnt/'>LinkedIn</a> 
                        </div> : ''}
                </p>
            </div>
            <div className="side-bar__next">
                <p onClick={()=>skipCards()}>
                    {isFirstRun ? 'Skip' : '...?'}
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
