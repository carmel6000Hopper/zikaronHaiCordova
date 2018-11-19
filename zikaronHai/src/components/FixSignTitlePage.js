import React from 'react';

import arrowIcon from '../icons/icon-arrow-left.png'

const FixSignTitle = () =>
    <div className="image-info-container ib">
        <h3>מה הכותרת שמופיעה על השלט</h3>
        {/* // TODO add list of possible names */}
    </div>


const Finish = () =>
    <div className="finish">
        <button>עדכן מיקום</button>
    {/* // TODO add onclick
    // add disabled if not chose one image */}
    </div>
export const FixSignTitlePage = () =>
    <div>
        <FixSignTitle />
        <Finish />
    </div>

export default FixSignTitlePage;