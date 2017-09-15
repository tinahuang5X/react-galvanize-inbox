export default function updateMessage(messageId, change) {
  console.log(messageId, change);
  return fetch(
    `https://api.airtable.com/v0/appi0rdar7mItbQ9X/messages/${messageId}`,
    {
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer keyHJ1xR1rls6rSoR',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ fields: change })
    }
  )
    .then(response => response.json())
    .then(record => {
      console.log(record);
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
