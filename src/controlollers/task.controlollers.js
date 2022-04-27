const pool = require('../db')

const getAllTasks = async (req, res, next) => {
    try {

        const allTasks = await pool.query('SELECT * FROM task')
        res.json(allTasks.rows)
    } catch (error) {
        next(error)
    }
};

const getTasks = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM task WHERE id = $1', [id])

        if (result.rows.length === 0) return res.status(404).json({
            message: 'Tarea no encontrado'
        });

        res.json(result.rows[0]);
    } catch (error) {
        next(error)
    }
};

const createTasks = async (req, res, next) => {
    const { tittle, description } = req.body

    try {
        const result = await pool.query('INSERT INTO task (title, description) VALUES ($1, $2) RETURNING *', [
            tittle,
            description,
        ]);

        res.json(result.rows[0])
    } catch (error) {

        next(error)
    }
};

const deleteTasks = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM task WHERE id = $1', [id]);
        if (result.rowCount === 0) return res.status(404).json({
            message: 'Tarea no encontrada'
        });
    } catch (error) {
        next(error)
    }

    return res.sendStatus(204);
};

const updateTasks = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const result = await pool.query('UPDATE task SET title = $1, description = $2 WHERE id = $3 RETURNING *',
            [title, description, id]);

        if (result.rows.length === 0) return res.status(404).json({
            message: "Tarea no encontrada"
        });

        return res.json(result.rows[0])
    } catch (error) {
        next(error)
    }
};

module.exports = {
    getAllTasks,
    getTasks,
    createTasks,
    deleteTasks,
    updateTasks
}