import React, { useEffect, useState, useMemo } from 'react';
import Button from '@mui/material/Button';
import UI from '../../constants/ui';
import { EMPTY_ARRAY } from '../../constants';
import STORAGE_KEY from '../../constants/storageKey';
import COMMON_STYLE from '../../constants/commonStyle';
import getFooterFromBootstrapById from '../../formatter/footerBootstrap';

function CookiesPolicy() {
  const [isCookiesPolicyAccepted, setIsCookiesPolicyAccepted] = useState(false);

  useEffect(() => {
    const isCookiesPolicy = JSON.parse(
      localStorage.getItem(STORAGE_KEY.COOKIES_POLICY_BANNER)
    );
    setIsCookiesPolicyAccepted(isCookiesPolicy);
  }, EMPTY_ARRAY);

  const privacyPolicy = useMemo(() => {
    const { privacy } = getFooterFromBootstrapById();
    return privacy;
  }, EMPTY_ARRAY);

  return (
    !isCookiesPolicyAccepted && (
      <div className="z-index-5 h-auto w-100 bottom-0 position-fixed background-041B4E text-center">
        <div className="p-3 subtitle-2 color-ffffff">
          <span>
            {UI.COOKIES_MSG}
            <a
              href={privacyPolicy.url}
              target="_blank"
              rel="noreferrer noopener"
              className="ms-1"
            >
              {UI.COOKIES_POLICY}
            </a>
          </span>

          <Button
            size="small"
            variant="outlined"
            onClick={() => {
              localStorage.setItem(STORAGE_KEY.COOKIES_POLICY_BANNER, true);
              setIsCookiesPolicyAccepted(true);
            }}
            className="ms-4 mt-1 mt-md-0"
            sx={COMMON_STYLE.PRIVACY_POLICY_BUTTON}
          >
            {UI.OK}
          </Button>
        </div>
      </div>
    )
  );
}

export default CookiesPolicy;
