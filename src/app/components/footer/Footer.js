import React, { useMemo, useState, useEffect } from 'react';

import { Link } from '@mui/material';

import UI from '../../constants/ui';
import { EMPTY_ARRAY } from '../../constants';
import getFooterFromBootstrapById from '../../formatter/footerBootstrap';
import getFooterConfig from './footer.helper';
import useMobileDevice from '../../hooks/useMobileDevice';
import FeedBackForm from './feedbackForm';
import { getLoginDetailFromSession } from '../../helpers/sessionDetails';
import style from './footer.module.css';
import COMMON_STYLE from '../../constants/commonStyle';
import URL_ID from '../../constants/footerUrlIds';

function Footer() {
  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);
  const [loggedInUserRole, setLoggedInUserRole] = useState();

  const isMobileDevice = useMobileDevice();

  useEffect(() => {
    // Added this listener because if we have multiple tabs in browser it should reflect in every tabs.
    window.addEventListener('storage', () => {
      setLoggedInUserRole(getLoginDetailFromSession()?.role);
    });
  }, EMPTY_ARRAY);

  const footerConfig = useMemo(() => {
    const footerFromBootstrapById = getFooterFromBootstrapById();
    return getFooterConfig(footerFromBootstrapById, loggedInUserRole);
  }, [loggedInUserRole]);

  return !isMobileDevice ? (
    <div className="mt-auto">
      <div className={style.spacing} />
      <div className="background-1F2830">
        <div className="d-flex container justify-content-between py-4">
          {footerConfig.map((config, index) => (
            <div key={index}>
              <span className="fw-bold fs-5 text-white">{config.heading}</span>
              {config.columns.map((colum, i) => (
                <div key={i} className="mt-2">
                  {URL_ID.FEEDBACK === colum.id ? (
                    <span
                      onClick={() => {
                        setIsFeedbackVisible(true);
                      }}
                    >
                      <Link underline="none" sx={COMMON_STYLE.FOOTER_LINK}>
                        {colum.label}
                      </Link>
                    </span>
                  ) : (
                    <Link
                      href={colum.url}
                      underline="none"
                      sx={COMMON_STYLE.FOOTER_LINK}
                      target="_blank"
                    >
                      {colum.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="card border-0 text-center">
          <div className="card-body">
            <span className="subtitle-1 color-5B5B5B">
              {UI.ALL_RIGHT_RESERVED} &copy; {new Date().getFullYear()}{' '}
              {UI.MY_COMPANY_NAME}
            </span>
          </div>
        </div>
      </div>
      <FeedBackForm
        isOpen={isFeedbackVisible}
        onClose={() => setIsFeedbackVisible(false)}
      />
    </div>
  ) : null;
}
export default Footer;
