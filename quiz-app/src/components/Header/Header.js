/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.scss';

class Header extends Component {
  
  // "title" className cannot be used (wtf?)

  render() {
    return (
      <div className={s.root}>
        
        <div className={s.headerSection}>
          <div className={s.menuIcon}>
            <img src={require('./menu.svg')} alt="Menu" />
          </div>
          <div className={s.titleSection}>Fixtures</div>
          <div className={s.points}>210 pts</div>
        </div>


        {/* TODO: Move from here to separate module/component/part */}
        <div className={s.contentSection}>

          <div className={s.dateSortedSection}>
            <div className={s.date}>
              23 April - Premier League
            </div>
            
            <div className={s.event}>
              <div className={s.logos}></div>
              <div className={s.info}>
                <div className={s.participants}>
                  Everton vs Chelsea
                </div>
                <div className={s.details}>
                  19:00, 3thd tour, london
                </div>
              </div>
              <div className={s.further}></div>
            </div>

            <div className={s.event}>
              <div className={s.logos}></div>
              <div className={s.info}>
                <div className={s.participants}>
                  Everton vs Chelsea
                </div>
                <div className={s.details}>
                  19:00, 3thd tour, london
                </div>
              </div>
              <div className={s.further}></div>
            </div>
            
          </div>

          <div className={s.dateSortedSection}>
            <div className={s.date}>
              23 April - Premier League
            </div>
            <div className={s.event}>
              <div className={s.logos}></div>
              <div className={s.info}>
                <div className={s.participants}>
                  Everton vs Chelsea
                </div>
                <div className={s.details}>
                  19:00, 3thd tour, london
                </div>
              </div>
              <div className={s.further}></div>
            </div>
          </div>

        </div>
        {/* Move from here to separate module/component/part */}



      </div>
    );
  }

}

export default withStyles(Header, s);
