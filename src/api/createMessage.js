export default function createMessage(message) {
  console.log(message);
  return fetch('https://api.airtable.com/v0/appi0rdar7mItbQ9X/messages', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer keyHJ1xR1rls6rSoR',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      fields: {
        subject: message.subject,
        read: message.read,
        starred: message.starred,
        labels: message.labels.join(','),
        body: message.body
      }
    })
  })
    .then(response => response.json())
    .then(record => {
      return {
        id: record.id,
        body: record.fields.body,
        subject: record.fields.subject,
        read: record.fields.read,
        starred: record.fields.starred,
        labels: record.fields.labels ? record.fields.labels.split(',') : []
      };
    });
}
