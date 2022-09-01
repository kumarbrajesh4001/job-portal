import {
  getFlow,
  getOrder,
  getMid,
  getTokenType,
  getWebsiteName,
} from '../../formatter/paymentBootstrap';
import { STYLE } from './payment.constants';
import { EMPTY_OBJECT, EMPTY_ARRAY } from '../../constants';

const makePayment = (
  paymentData,
  amount,
  handleMerchant,
  handleTransactionStatus
) => {
  const config = {
    root: '',
    style: STYLE,
    data: {
      orderId: paymentData.orderid,
      token: paymentData.token,
      tokenType: getTokenType(),
      amount,
    },
    payMode: {
      labels: EMPTY_OBJECT,
      filter: {
        exclude: EMPTY_ARRAY,
      },
      order: getOrder(),
    },
    website: getWebsiteName(),
    flow: getFlow(),
    merchant: {
      mid: getMid(),
      redirect: false,
    },
    handler: {
      transactionStatus: handleTransactionStatus,
      notifyMerchant: handleMerchant,
    },
  };

  if (window.Paytm && window.Paytm.CheckoutJS) {
    return window.Paytm.CheckoutJS.init(config);
  }
  return Promise.reject();
};

export default makePayment;
