const returnData = [
    { "POST /api/images": "query=cat" },
    { "GET /api/encode/": "your_text" },
    { "GET /api/github/lastcommit": "repo?any_repo" }
]

const Docs = () => {
    const body = JSON.stringify(returnData)
    const headers = { 'Content-Type': 'application/json' }
    return new Response(body, { headers, status: 200 })
}

export default Docs;