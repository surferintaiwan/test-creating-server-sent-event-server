// create server sent events server
const express = require('express');
const app = express();
const port = 3000;

// parsed body
app.use(express.json());

app.post("/stream", (req, res) => {
    console.log('request received body: ', req.body)
    res.writeHead(200, {
        Connection: "keep-alive",
        "Cache-Control": "no-cache",
        "Content-Type": "text/event-stream",
    });

    let count = 0;
    const interval = setInterval(() => {
        res.write(`data: ${count}\n\n`);
        count++;
        if (count >= 10) {
            res.end();
            clearInterval(interval);
        }
    }, 200);

    while (count === 10) {
        res.end();
    }

    res.on("close", () => {
        console.log("Connection closed");
        clearInterval(interval);
        res.end();
    });
});

const listener = app.listen(process.env.PORT || port, () =>
    console.log(`Your app is listening on port ${listener.address().port}`),
);