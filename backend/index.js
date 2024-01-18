const express = require('express')
const { Pool } = require('pg')
const app = express()

const BACKEND_PORT = process.env.BACKEND_PORT
const DB_PORT = process.env.DB_PORT
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
const DB_HOST = process.env.DB_HOST
const DB_NAME = process.env.DB_NAME
const DB_TYPE = process.env.DB_TYPE

const pool = new Pool({
	connectionString: `${DB_TYPE}://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
})

app.get('/data', function (req, res) {
	pool.query('SELECT movie, hero from movie_hero', [], (err, result) => {
		if (err) {
			return res.status(405).jsonp({
				error: err,
			})
		}

		return res.status(200).jsonp({
			data: result.rows,
		})
	})
})

app.listen(BACKEND_PORT, () => console.log(`Backend rest api listening on port ${BACKEND_PORT}!`))
