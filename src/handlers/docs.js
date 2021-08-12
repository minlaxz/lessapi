const returnData = [
    { "POST /api/images": "query=cat" },
    { "GET /api/encode/": "your_text_to_encode" },
]

const Docs = () => {
    const body = JSON.stringify(returnData)
    const headers = { 'Content-Type': 'application/json' }
    return new Response(body, { headers, status: 200 })
}

export default Docs;