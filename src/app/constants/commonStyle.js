const COMMON_STYLE = {
  DIALOG_HEADING: {
    position: 'absolute',
    right: 8,
    top: 8,
    color: (theme) => theme.palette.grey[500],
  },
  FOOTER_LINK: {
    color: 'white',
    '&:hover': {
      color: 'lightgray',
    },
  },
  BADGE_ICON: {
    maxWidth: '4rem',
    maxHeight: '4rem',
  },
  BADGE_ICON_FOR_TABLE: {
    maxWidth: '2rem',
    maxHeight: '2rem',
  },
  BADDGE_ICON_I_BTN: {
    width: '1.125rem',
    height: '1.125rem',
  },
  PRIVACY_POLICY_BUTTON: {
    minWidth: '2.75rem',
    color: '#ffffff',
    border: '1px solid white',
  },
  PAYMENT_ICON: {
    width: '3.75rem',
    height: '3.75rem',
  },
};
export default COMMON_STYLE;
