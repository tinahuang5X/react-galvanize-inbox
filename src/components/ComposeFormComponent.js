import React from 'react';
//import './index.css';

export default function ComposeFormComponent() {
  return (
    <form className="form-horizontal well">
      <div className="form-group">
        <div className="col-sm-8 col-sm-offset-2">
          <h4>Compose Message</h4>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="subject" className="col-sm-2 control-label">
          Subject
        </label>
        <div className="col-sm-8">
          <input
            className="form-control"
            id="subject"
            placeholder="Enter a subject"
            name="subject"
            type="text"
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="body" className="col-sm-2 control-label">
          Body
        </label>
        <div className="col-sm-8">
          <textarea
            name="body"
            id="body"
            className="form-control"
            defaultValue={''}
          />
        </div>
      </div>
      <div className="form-group">
        <div className="col-sm-8 col-sm-offset-2">
          <input
            defaultValue="Send"
            className="btn btn-primary"
            type="submit"
          />
        </div>
      </div>
    </form>
  );
}
