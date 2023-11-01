console.log("Javascript funcionando")

const cp = document.getElementById("cp")
//const msg = document.getElementById("msg")

cp.addEventListener("submit", async (e) => {
	e.preventDefault()

	let data = ""
	data = e.target.msg.value

	const fOp = {
		method: 'POST',
		headers: {"Content-Type": "text/plain"},
		body: data
	}

	try {
		const r = await fetch("/crypt", fOp)
		const js = response.json()
		console.log(js)
	} catch(e) {
		console.log("error on fetch")
		console.log(e)
	}
})





