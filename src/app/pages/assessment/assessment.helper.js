import jsBeautify from 'js-beautify';

const codeFormatter = (quesString) => {
  const isCodeExist = quesString?.includes('<code>');

  if (isCodeExist) {
    const startIndex = quesString.indexOf('<code>');
    const lastIndex = quesString.lastIndexOf('</code>');
    const startString = quesString.substring(0, startIndex);
    const formattedString = quesString.substring(startIndex + 6, lastIndex);
    const lastString = quesString.substring(lastIndex + 7);
    const codeBeautify = jsBeautify(formattedString);
    return { startString, formattedString: codeBeautify, lastString };
  }
  return { startString: quesString };
};
export default codeFormatter;
