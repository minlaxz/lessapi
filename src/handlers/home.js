const welcomeMessage = `
<html>
    <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>minlaxz backend</title>
    </head>
    <body>
    <div style="height:100vh; display:flex; flex-direction:column; justify-content:center; align-items:center;">
        <h3>Hello, World!</h3>
        <code>from minlaxz backend 👻</code>
        <p>go to /api</p>
    </div>
    </body>
</html>`

const Home = () => {
    const headers = { 'Content-Type': 'text/html' }
    return new Response(welcomeMessage, { headers, status: 200 })
}

export default Home;