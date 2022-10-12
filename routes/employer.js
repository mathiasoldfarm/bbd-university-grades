module.exports = (app) => {
    app.get('/login', (req, res) => {
        res.send('Login');
    });
}