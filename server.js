const http = require('http')
const fs = require('fs').promises
const path = require('path')
const httpStatus = require('http-status-codes')
const sendError = require('./errors.js')
const { sha256 } = require('js-sha256')

async function customReadFile(file_path, res) {
    console.log(`\n---- response file location: ${file_path}`);
    try {
        const data = await fs.readFile(file_path);
        res.write(data);
        res.end();
    } catch (e) {
        console.error(e);
        sendError(res);
    }
}

server = http.createServer(async (request, response) => {
	let url = request.url
	let method = request.method

	console.log(`\n---- request url: ${url}`)

	if(url === "/") {
		response.writeHead(httpStatus.StatusCodes.OK, {
			"Content-Type": "text/html"
		})
		await customReadFile(path.join(__dirname, 'views', 'index.html'), response)

	} else if(url == "/crypt" && method == "POST") {
		// ---------------------------------------------------------
		let chunks = []
		request.on("data", (chunk) => {
			chunks.push(chunk)
		})
		request.on("end", () => {
			// ---------------------------
			const data = Buffer.concat(chunks)
			const querystring = data.toString()
			const parsedData = new URLSearchParams(querystring)
			const dataObj = {}
			// ---------------------------
			for(var pair of parsedData.entries()) {
				dataObj[pair[0]] = pair[1]
			}
			// ---------------------------
			console.log("POST exitoso")
			console.log(dataObj)
			// ---------------------------
			//sha256(request.body)
			response.writeHead(httpStatus.StatusCodes.OK, {
				"Content-Type": "text/plain"
			})
			response.end()
		})
		// ---------------------------------------------------------
	} else if(url.indexOf(".js") !== -1) {
		response.writeHead(httpStatus.StatusCodes.OK, {
			"Content-Type": "text/javascript"
		})
		await customReadFile(path.join(__dirname, url), response)

	} else if(url.indexOf(".css") !== -1) {
		response.writeHead(httpStatus.StatusCodes.OK, {
			"Content-Type": "text/css"
		})
		await customReadFile(path.join(__dirname, url), response)

	} else {
		sendError(response)
	}
})








const port = 4242
server.listen(port)
console.log(`The server is listening on port: ${port}`)




