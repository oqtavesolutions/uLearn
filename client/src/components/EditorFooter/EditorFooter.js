import { AppBar, Button, Toolbar } from "@material-ui/core";
import React from "react";
import "./EditorFooter.scss";

function EditorFooter({ message }) {
  return (
    <AppBar color='inherit' position='fixed' className='editor-footer'>
      <Toolbar className='editor-footer__container'>
        <Button
          variant='outlined'
          className='editor-footer__cancel'
          href='/my-courses'>
          Cancel
        </Button>
        <div className='editor-footer__grow'>
          {message ? message : "Update course"}
        </div>
        <Button
          type='submit'
          variant='contained'
          disableElevation
          className='editor-footer__save'>
          Save
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default EditorFooter;
