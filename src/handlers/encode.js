const Encode = (request) => {
    // Decode text like "Hello%20world" into "Hello world"
    let input = decodeURIComponent(request.params.text)

    // Construct a buffer from our input
    let buffer = Buffer.from(input, "utf8")

    // Serialise the buffer into a base64 string
    let base64 = buffer.toString("base64")

    const body = `<p>Base64 encoding: <code>${base64}</code></p>`
    const headers = { "Content-Type": "text/html" }
    // Return the HTML with the string to the client
    return new Response(body, { headers, status: 200 })
}

export default Encode;