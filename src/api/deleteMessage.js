export default function deleteMessage(messageId) {
  console.log(messageId);
  return fetch(
    `https://api.airtable.com/v0/appi0rdar7mItbQ9X/messages/${messageId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer keyHJ1xR1rls6rSoR'
      }
    }
  )
    .then(response => response.json())
    .then(record => {
      return {
        deleted: true,
        id: record.id
      };
    });
}
