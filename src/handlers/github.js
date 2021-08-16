const corsHeaders = {
    'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type,Accept',
    'Access-Control-Allow-Methods': 'GET,OPTIONS',
    'Access-Control-Allow-Origin': '*',
}

async function gatherResponse(response) {
    const { headers } = response
    const contentType = headers.get("content-type") || ""
    if (contentType.includes("application/json")) {
        const data = await response.json()
        return data.commit.sha
    }
    else if (contentType.includes("application/text")) {
        return response.text()
    }
    else if (contentType.includes("text/html")) {
        return response.text()
    }
    else {
        return response.text()
    }
}

const notFoundonGithub = () => {
    return new Response(JSON.stringify("Not Found on Github request."), {
        headers: {
            'Content-Type': 'text/plain',
            ...corsHeaders
        }, status: 404
    })
}

const badRequest = () => {
    const response = {
        "message": "bad request",
        "params": "github/lastcommit",
        "query": "?repo=some_repo"
    }
    return new Response(JSON.stringify(response), {
        headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
        }, status: 400
    })
}

export const GetLastCommit = async (request) => {
    const user = request.query.user ? request.query.user : "minlaxz"
    const branch = request.query.branch ? request.query.branch : "main"
    const repo = request.query.repo ? request.query.repo : null
    if (request.method === "GET") {
        if (request.params.action === "lastcommit" && JSON.stringify(request.query) !== '{}' && repo) {
            const response = await fetch(`https://api.github.com/repos/${user}/${repo}/branches/${branch}`, {
                headers: { "User-Agent": "HTTPie/1.0.3" }, /* curl/7.68.0 */
            })
            if (response.status === 200) {
                const results = await gatherResponse(response)
                const returnData = {
                    ghUser: user,
                    ghBranch: branch,
                    ghRepo: repo,
                    sha: results
                }
                return new Response(JSON.stringify(returnData), {
                    headers: {
                        "Content-Type": "application/json",
                        ...corsHeaders
                    }, status: 200
                })
            } else {
                return notFoundonGithub()
            }
        }

        return badRequest()
    }
}