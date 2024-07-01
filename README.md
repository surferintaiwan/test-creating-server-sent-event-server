# Intro of SSE
If you want to sent data from sever to client, you don't need to use websocket, you can use Server-Sent Events (SSE) instead. It's a simple and easy way to sent data from server to client.

# How to use
1. run this server
```
npm run dev
```

2. Use Postman to send a POST request to `http://localhost:3000/stream`
(if you modify the example code to GET, you can use browser to send request)

3. What if you want to call this API on your another node.js server?

You can use fetch getReader() to read the response stream.

```
  const response =  await fetch('http://localhost:3000/stream/', { method: 'POST', body: JSON.stringify({ 'message': 'hihi' }) });
  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');

  let gogogo = true;
  while (gogogo) {
    const { done, value } = await reader.read();
    if (done) break;
    console.log('value', decoder.decode(value));
  }
```