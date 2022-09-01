export const loadScript = (src, position, id) => {
  if (!position) {
    return;
  }

  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('id', id);
  script.src = src;
  position.appendChild(script);
};
export const addScript = (loaded, scriptSrc, docId) => {
  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector(`#${docId}`)) {
      loadScript(scriptSrc, document.querySelector('head'), docId);
    }
  }
};
