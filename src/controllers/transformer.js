const db = require('../db')

exports.create = async (req, res) => {
    const { name, allegiance, alt_mode } = req.body
    const response = await db.query(
        'INSERT INTO Transformers(name, allegiance, alt_mode) VALUES ($1, $2, $3) RETURNING *',
        [name, allegiance, alt_mode]
    )

    res.status(201).json(response.rows[0])
}