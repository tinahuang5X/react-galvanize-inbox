import React from 'react';
//import './index.css';

export default function ComposeFormComponent({ onSubmit, onCancel }) {
  function handleCancel(event) {
    event.preventDefault();
    onCancel();
  }

  function handleSubmit(event) {
    event.preventDefault();
    const $form = event.target;
    //console.log($form);

    //console.log('touched SUBMIT button');

    const subject = $form.subject.value.trim();
    const body = $form.body.value.trim();
    //console.log(subject);
    //console.log(body);

    onSubmit(subject, body);
  }

  return (
    <form className="form-horizontal well" onSubmit={handleSubmit}>
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
        <input
          type="reset"
          value="Cancel"
          className="btn btn-default"
          onClick={handleCancel}
        />
      </div>
    </form>
  );
}
