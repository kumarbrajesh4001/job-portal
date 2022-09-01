import React, { useEffect, useState, useRef } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import cx from 'classnames';
import { EMPTY_OBJECT } from '../../constants';

function RichTextEditor(props) {
  const { onChange, value, toolbarOptions } = props;
  const valueInitialized = useRef(true);
  let defaultValueProps;
  const initialFieldValue = value;
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  if (initialFieldValue) {
    defaultValueProps = initialFieldValue;
  } else {
    defaultValueProps = '';
  }
  const blocksFromHtml = htmlToDraft(defaultValueProps);
  const contentState = ContentState.createFromBlockArray(
    blocksFromHtml.contentBlocks
  );
  const editorStateValue = EditorState.createWithContent(contentState);

  useEffect(() => {
    if (valueInitialized.current && defaultValueProps !== '') {
      setEditorState(editorStateValue);
      valueInitialized.current = false;
    }
  }, [defaultValueProps]);

  const onEditorStateChange = (valueonEditorChange) => {
    setEditorState(valueonEditorChange);
    let textEditorValue = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    ).trim();
    textEditorValue = textEditorValue !== '<p></p>' ? textEditorValue : '';
    return onChange(textEditorValue);
  };

  return (
    <Editor
      value={editorState}
      editorState={editorState}
      wrapperClassName={cx('wrapper-class')}
      toolbarClassName={cx('___editor__toolbar')}
      editorClassName={cx(
        '___editor__content',
        'border px-2 rounded',
        'textEditorHeight'
      )}
      onEditorStateChange={onEditorStateChange}
      toolbar={toolbarOptions}
    />
  );
}

RichTextEditor.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  toolbarOptions: PropTypes.object,
};

RichTextEditor.defaultProps = {
  onChange: noop,
  value: undefined,
  toolbarOptions: EMPTY_OBJECT,
};
export default RichTextEditor;
