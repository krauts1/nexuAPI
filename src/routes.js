const express = require('express');
const brands = require('./actions/brands');
const router = express.Router();

router.get('/brands', async (req, res) => {
    try {
        const result = await brands.getAllBrands();
        res.send(result);
    } catch (error) {
        res.send({
            error: "error en el proceso",
            code: 500,
            systemEror: error,
        });
    }
});
router.get('/brands/:id/models', async (req, res) => {
    const brandId = req.params.id;
    try {
        const result = await brands.getAllByBrand(brandId);
        res.send(result);
    } catch (error) {
        res.send({
            error: "error en el proceso",
            code: 500,
            systemEror: error,
        });
    }
});
router.post('/brands', async(req, res) => {
    try {
        const { name } = req.body;
        const result = await brands.createBrand(name);
        res.send(result);
    } catch (error) {
        res.send({
            error: "error en el proceso",
            code: 500,
            systemError: error,
        });
    }
});
router.post('/brands/:id/models', async (req, res) => {
    try {
        const idBrand = req.params.id;
        const data = req.body;
        const result = await brands.createModel({...data, idBrand});
        res.send(result);
    } catch (error) {
        res.send({
            error: "error en el proceso",
            code: 500,
            systemError: error,
        });
    }
});
router.put('/models/:id', async(req, res) => {
    try {
        const modelID = req.params.id;
        const data = req.body;
        const result = await brands.updateModel(data, modelID);
        res.send(result);
    } catch (error) {
        res.send({
            error: "error en el proceso",
            code: 500,
            systemError: error,
        });
    }
});
router.get('/models', async (req, res) => {
    try {
        const { greater, lower } = req.query;
        const result = await brands.getModels(greater, lower);
        res.send(result);
    } catch (error) {
        res.send({
            error: "error en el proceso",
            code: 500,
            systemError: error,
        });
    }
});

module.exports = router;
