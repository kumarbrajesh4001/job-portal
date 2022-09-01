export const portalScrollTop = (top) => {
  window.scrollTo({
    behavior: 'smooth',
    top,
  });
};

export const portalScrollTo = (ref) => {
  portalScrollTop(ref.current.offsetTop);
};
