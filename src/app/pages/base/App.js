import React, { useEffect, useState } from 'react';
import { EMPTY_ARRAY } from '../../constants';
import { getRequest } from '../../services';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/styles.css';
import RoutesComponent from './Routes';
import Footer from '../../components/footer';
import STORAGE_KEY from '../../constants/storageKey';
import Loader from '../../components/loader';
import CookiesPolicy from '../../components/cookiesPolicy';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const [showFooter, setShowFooter] = useState(true);

  const getBootstrapData = () => {
    getRequest('/common/bootstrap')
      .then((res) => {
        sessionStorage.setItem(STORAGE_KEY.BOOTSTRAP, JSON.stringify(res));
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getBootstrapData();
  }, EMPTY_ARRAY);

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <RoutesComponent setShowFooter={setShowFooter} />
      {showFooter && <Footer />}

      <CookiesPolicy />
    </>
  );
}

export default App;
