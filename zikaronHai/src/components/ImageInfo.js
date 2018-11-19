import React from 'react';

import arrowIcon from '../icons/icon-arrow-left.png'
import {OCR} from './OCR'
import { Link } from 'react-router-dom';
const ocr = new OCR;

export const ImageInfo = () =>
    <div >
        <h3>!מעולה</h3>
        <h3>הוספת שלט מורשת</h3>
        <p>האם כותרת השלט היא</p>
        <p>{ocr.getTitleName()}</p>
        <p>טעינו ? ספר לנו איזו כותרת רשומה</p>
        <Link  to="/fixtitle"><img src={arrowIcon} alt="arrow image" style={{width: '10px', height: '10px'}}/></Link>
    {/* // TODO add onclick */}
    </div>

const ChooseBetterImage = () =>
    <div className="choose-better-image ib ">
        <h3>בחר את התמונה הטובה ביותר</h3>
    {/* // TODO add here images from firebase same sign and current image */}
    </div>


const Finish = () =>
    <div className="finish">
        <button>סיימתי</button>
    {/* // TODO add onclick
    // add disabled if not chose one image */}
    </div>
const ImageInfoPage = () =>
    <div>
        <ImageInfo />
        < ChooseBetterImage />
        <Finish />

    </div>

export default ImageInfoPage;