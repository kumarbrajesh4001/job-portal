/* eslint-disable no-nested-ternary */
import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import classNames from 'classnames';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box } from '@mui/material';

import PropTypes from 'prop-types';
import noop from 'lodash/noop';

import { getLoginDetailFromSession } from '../../helpers/sessionDetails';
import { getRequest } from '../../services';
import STATUS_CODE from '../../constants/statusCode';
import URL from '../../constants/urls';
import STORAGE_KEY from '../../constants/storageKey';
import LOGIN_TYPE from '../../constants/loginType';
import getCurrentHomeUrl, { getFirstPathName } from './navbarComponent.helper';
import styles from './navigationComponent.module.css';
import otherRoutes from '../../assets/otherRoutes.svg';
import AvailablePoints from '../availablePoints';
import UI from '../../constants/ui';
import { EMPTY_OBJECT } from '../../constants';
import useMobileDevice from '../../hooks/useMobileDevice';

const KEBAB_LINK = `color-1F2830 ${styles.navLink} px-3 py-1 w-100 subtitle-1`;
const ACTIVE_KEBAB_LINK = styles.activeKebabLink;
const MENU_ITEM = 'px-0 py-0';

function NavbarComponent(props) {
  const { loggedInUserRole, setLoggedInUserRole, availablePoint } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeUrl, setActiveUrl] = useState(URL.FIND_JOBS);

  const location = useLocation();
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const currentHomeUrl = useMemo(
    () => getCurrentHomeUrl(loggedInUserRole),
    [loggedInUserRole]
  );

  const isMobileDevice = useMobileDevice();

  const handleLogout = () => {
    setAnchorEl(null);
    getRequest('/logout')
      .then((res) => {
        if (res.code === STATUS_CODE.SUCCESSFULLY_LOGOUT) {
          localStorage.removeItem(STORAGE_KEY.CANDIDATE_DETAILS);
          localStorage.removeItem(STORAGE_KEY.EMPLOYER_DETAILS);
          localStorage.removeItem(STORAGE_KEY.SESSION_DETAILS);
          navigate(URL.HOME);
          setLoggedInUserRole();
        }
      })
      .catch(() => {});
  };

  const handleOpenActionMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const onSelectNavOption = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const { pathname } = location;
    const firstPathName = getFirstPathName(pathname);
    setActiveUrl(firstPathName);
  }, [location.pathname]);

  const renderMenu = useMemo(
    () => (
      <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
        {loggedInUserRole === LOGIN_TYPE.EMPLOYER ? (
          <div>
            <div className="px-3 py-2 w-100 text-primary">
              {getLoginDetailFromSession()?.name}
            </div>

            <hr className="mt-1 mb-1" />
            {isMobileDevice && (
              <div>
                <MenuItem onClick={onSelectNavOption} className={MENU_ITEM}>
                  <Link
                    to={URL.FIND_CANDIDATES}
                    className={classNames(KEBAB_LINK, {
                      [ACTIVE_KEBAB_LINK]: activeUrl === URL.FIND_CANDIDATES,
                    })}
                  >
                    {UI.FIND_TALENT}
                  </Link>
                </MenuItem>
                <hr className="my-2" />
              </div>
            )}
            <MenuItem onClick={onSelectNavOption} className={MENU_ITEM}>
              <Link
                to={URL.EMPLOYER_PROFILE}
                className={classNames(KEBAB_LINK, {
                  [ACTIVE_KEBAB_LINK]: activeUrl === URL.EMPLOYER_PROFILE,
                })}
              >
                {UI.PROFILE}
              </Link>
            </MenuItem>
            <MenuItem onClick={onSelectNavOption} className={MENU_ITEM}>
              <Link
                to={URL.POST_JOB}
                className={classNames(KEBAB_LINK, {
                  [ACTIVE_KEBAB_LINK]: activeUrl === URL.POST_JOB,
                })}
              >
                {UI.POST_JOB}
              </Link>
            </MenuItem>
            <MenuItem onClick={onSelectNavOption} className={MENU_ITEM}>
              <Link
                to={URL.POSTED_JOBS}
                className={classNames(KEBAB_LINK, {
                  [ACTIVE_KEBAB_LINK]: activeUrl === URL.POSTED_JOBS,
                })}
              >
                {UI.POSTED_JOB}
              </Link>
            </MenuItem>

            <MenuItem onClick={onSelectNavOption} className={MENU_ITEM}>
              <Link
                to={URL.MY_CANDIDATES}
                className={classNames(KEBAB_LINK, {
                  [ACTIVE_KEBAB_LINK]: activeUrl === URL.MY_CANDIDATES,
                })}
              >
                {UI.MY_CANDIDATES}
              </Link>
            </MenuItem>
          </div>
        ) : null}
        {loggedInUserRole === LOGIN_TYPE.CANDIDATE ? (
          <div>
            <div className="px-3 py-2 w-100 text-primary">
              {getLoginDetailFromSession()?.name}
            </div>

            <hr className="mt-1 mb-1" />
            {isMobileDevice && (
              <div>
                <MenuItem onClick={onSelectNavOption} className={MENU_ITEM}>
                  <Link
                    to={URL.FIND_JOBS}
                    className={classNames(KEBAB_LINK, {
                      [ACTIVE_KEBAB_LINK]: activeUrl === URL.FIND_JOBS,
                    })}
                  >
                    {UI.FIND_JOBS}
                  </Link>
                </MenuItem>
                <hr className="mt-1 mb-1" />
              </div>
            )}

            <MenuItem onClick={onSelectNavOption} className={MENU_ITEM}>
              <Link
                to={URL.CANDIDATE_PROFILE}
                className={classNames(KEBAB_LINK, {
                  [ACTIVE_KEBAB_LINK]: activeUrl === URL.CANDIDATE_PROFILE,
                })}
              >
                {UI.PROFILE}
              </Link>
            </MenuItem>
            <MenuItem onClick={onSelectNavOption} className={MENU_ITEM}>
              <Link
                to={URL.MY_JOBS}
                className={classNames(KEBAB_LINK, {
                  [ACTIVE_KEBAB_LINK]: activeUrl === URL.MY_JOBS,
                })}
              >
                {UI.MY_JOBS}
              </Link>
            </MenuItem>
            <MenuItem onClick={onSelectNavOption} className={MENU_ITEM}>
              <Link
                to={URL.My_Profile_Activity}
                className={classNames(KEBAB_LINK, {
                  [ACTIVE_KEBAB_LINK]: activeUrl === URL.My_Profile_Activity,
                })}
              >
                {UI.MY_PROFILE_ACTIVITY}
              </Link>
            </MenuItem>
            <MenuItem onClick={onSelectNavOption} className={MENU_ITEM}>
              <Link
                to={URL.ASSESSMENT}
                className={classNames(KEBAB_LINK, {
                  [ACTIVE_KEBAB_LINK]: activeUrl === URL.ASSESSMENT,
                })}
              >
                {UI.ASSESSMENT}
              </Link>
            </MenuItem>
          </div>
        ) : null}
        {loggedInUserRole === LOGIN_TYPE.EMPLOYER ||
        loggedInUserRole === LOGIN_TYPE.CANDIDATE ? (
          <div>
            <MenuItem onClick={onSelectNavOption} className={MENU_ITEM}>
              <Link
                to={URL.UPDATE_PASSWORD}
                className={classNames(KEBAB_LINK, {
                  [ACTIVE_KEBAB_LINK]: activeUrl === URL.UPDATE_PASSWORD,
                })}
              >
                {UI.CHANGE_PASSWORD}
              </Link>
            </MenuItem>
            <hr className="mt-1 mb-1" />
            <MenuItem onClick={handleLogout} className={MENU_ITEM}>
              <div className="px-3 py-1 w-100 color-F25C05">Logout</div>
            </MenuItem>
          </div>
        ) : (
          <div>
            {isMobileDevice && (
              <Box>
                <MenuItem onClick={onSelectNavOption} className={MENU_ITEM}>
                  <Link
                    to={URL.FIND_JOBS}
                    className={classNames(KEBAB_LINK, {
                      [ACTIVE_KEBAB_LINK]: activeUrl === URL.FIND_JOBS,
                    })}
                  >
                    {UI.FIND_JOBS}
                  </Link>
                </MenuItem>
                <MenuItem onClick={onSelectNavOption} className={MENU_ITEM}>
                  <Link
                    to={URL.FIND_CANDIDATES}
                    className={classNames(KEBAB_LINK, {
                      [ACTIVE_KEBAB_LINK]: activeUrl === URL.FIND_CANDIDATES,
                    })}
                  >
                    {UI.FIND_TALENT}
                  </Link>
                </MenuItem>
                <hr className="mt-1 mb-1" />
              </Box>
            )}
            <MenuItem onClick={onSelectNavOption} className={MENU_ITEM}>
              <Link
                to={URL.LOGIN}
                className={classNames(KEBAB_LINK, {
                  [ACTIVE_KEBAB_LINK]: activeUrl === URL.LOGIN,
                })}
              >
                {UI.LOGIN}
              </Link>
            </MenuItem>
            <MenuItem onClick={onSelectNavOption} className={MENU_ITEM}>
              <Link
                to={URL.REGISTER}
                className={classNames(KEBAB_LINK, {
                  [ACTIVE_KEBAB_LINK]: activeUrl === URL.REGISTER,
                })}
              >
                {UI.REGISTER}
              </Link>
            </MenuItem>
          </div>
        )}
      </Menu>
    ),
    [open, isMobileDevice, activeUrl, loggedInUserRole]
  );

  const renderMobileView = useMemo(
    () => (
      <>
        <div className="d-flex justify-content-end align-items-center">
          <IconButton onClick={handleOpenActionMenu}>
            <div className={`${styles.groupedRoutes} px-2`}>
              <MenuRoundedIcon fontSize="large" />
            </div>
          </IconButton>
          {renderMenu}
        </div>
        <Link
          to={currentHomeUrl}
          className={classNames(`${styles.logo} color-1D8FF2`, {
            'me-4': !loggedInUserRole,
          })}
        >
          {UI.MY_COMPANY_NAME}
        </Link>
        <div>
          {loggedInUserRole && <AvailablePoints points={availablePoint} />}
        </div>
      </>
    ),
    [loggedInUserRole, availablePoint, renderMenu]
  );

  const renderWebView = useMemo(
    () => (
      <>
        <Link
          to={currentHomeUrl}
          className={`${styles.logo} color-1D8FF2 col-2`}
        >
          {UI.MY_COMPANY_NAME}
        </Link>
        <div className="my-3 d-flex py-1 justify-content-center col-4 me-5">
          {loggedInUserRole ? (
            loggedInUserRole === LOGIN_TYPE.EMPLOYER ? (
              <div>
                <Link
                  to={URL.FIND_CANDIDATES}
                  className={` color-1F2830 ${styles.navLink} ${
                    activeUrl === URL.FIND_CANDIDATES
                      ? `subtitle-1-bold `
                      : 'subtitle-1'
                  }`}
                >
                  {UI.FIND_TALENT}
                </Link>
                {activeUrl === URL.FIND_CANDIDATES ? (
                  <div className={`background-1D8FF2 ${styles.active}`} />
                ) : (
                  ''
                )}
              </div>
            ) : (
              <div>
                <Link
                  to={URL.FIND_JOBS}
                  className={`color-1F2830 ${styles.navLink} ${
                    activeUrl === URL.FIND_JOBS
                      ? `subtitle-1-bold ${styles.active}`
                      : 'subtitle-1'
                  }`}
                >
                  {UI.FIND_JOBS}
                </Link>
                {activeUrl === URL.FIND_JOBS ? (
                  <div className={`background-1D8FF2 ${styles.active}`} />
                ) : (
                  ''
                )}
              </div>
            )
          ) : (
            <>
              <div className="me-3">
                <Link
                  to={URL.FIND_JOBS}
                  className={`color-1F2830 ${styles.navLink}  ${
                    activeUrl === URL.FIND_JOBS
                      ? `subtitle-1-bold`
                      : 'subtitle-1'
                  }`}
                >
                  {UI.FIND_JOBS}
                </Link>
                {activeUrl === URL.FIND_JOBS ? (
                  <div className={`background-1D8FF2 ${styles.active}`} />
                ) : (
                  ''
                )}
              </div>
              <div className="ms-3">
                <Link
                  to={URL.FIND_CANDIDATES}
                  className={`color-1F2830 ${styles.navLink} ${
                    activeUrl === URL.FIND_CANDIDATES
                      ? `subtitle-1-bold ${styles.active}`
                      : 'subtitle-1'
                  }`}
                >
                  {UI.FIND_TALENT}
                </Link>
                {activeUrl === URL.FIND_CANDIDATES ? (
                  <div className={`background-1D8FF2 ${styles.active}`} />
                ) : (
                  ''
                )}
              </div>
            </>
          )}
        </div>

        <div className="d-flex justify-content-end align-items-center">
          {loggedInUserRole && (
            <div className="me-3">
              <AvailablePoints points={availablePoint} />
            </div>
          )}
          <IconButton onClick={handleOpenActionMenu}>
            <div className={`background-1D8FF2 ${styles.groupedRoutes} px-2`}>
              <img src={otherRoutes} alt={UI.ALT_OTHER_PAGES} />
            </div>
          </IconButton>
          {renderMenu}
        </div>
      </>
    ),
    [loggedInUserRole, availablePoint, currentHomeUrl, renderMenu]
  );

  return (
    <nav className={`${styles.header} background-ffffff mb-2`}>
      <div className="container d-flex align-items-center justify-content-between">
        {isMobileDevice ? renderMobileView : renderWebView}
      </div>
    </nav>
  );
}
NavbarComponent.propTypes = {
  setLoggedInUserRole: PropTypes.func,
  loggedInUserRole: PropTypes.number,
  availablePoint: PropTypes.object,
};

NavbarComponent.defaultProps = {
  setLoggedInUserRole: noop,
  loggedInUserRole: undefined,
  availablePoint: EMPTY_OBJECT,
};
export default NavbarComponent;
