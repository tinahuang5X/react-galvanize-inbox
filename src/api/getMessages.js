export default function getMessages() {
  return fetch('https://api.airtable.com/v0/appi0rdar7mItbQ9X/messages', {
    headers: { Authorization: 'Bearer keyHJ1xR1rls6rSoR' }
  })
    .then(response => response.json())
    .then(data =>
      data.records.map(record => ({
        id: record.id,
        body: record.fields.body,
        subject: record.fields.subject,
        read: record.fields.read,
        starred: record.fields.starred,
        labels: record.fields.labels ? record.fields.labels.split(',') : []
      }))
    );
  // .then(messages => {
  //   console.log(messages);
  // });
}
