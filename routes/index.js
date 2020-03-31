'use strict';
var express = require('express');
var rest = require('../utils/GetJSON')

var router = express.Router();

// https://next.json-generator.com/api/json/get/EkzBIUWNL
const data_options = {
    host: 'next.json-generator.com',
    port: 443,
    path: '/api/json/get/EkzBIUWNL',
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};

/* GET return the entire list of fake products */
router.get('/GetMany', function (req, res) {
    var price_low_to_high = req.query.price_low_to_high;
    var price_high_to_low = req.query.price_high_to_low;
    var price_min = req.query.price_min;
    var price_max = req.query.price_max;
    if (price_min == null) {
        price_min = 0;
    }
    else {
        price_min = parseFloat(price_min);
    }
    if (price_max == null) {
        price_max = Infinity;
    }
    else {
        price_max = parseFloat(price_max);
    }
    var search_query = req.query.search_query;

    var filters = { search_query: req.query.search_query, price_low_to_high: price_low_to_high, price_high_to_low: price_high_to_low, price_min: price_min, price_max: price_max };

    rest.getJSON(data_options, (statusCode, result) => {

        // Price Filter and Search Query
        for (var i = 0; i < result.length; i++) {
            var child = result[i];

            if (parseFloat(child.price) < price_min || parseFloat(child.price) > price_max) { // Price
                result.splice(i, 1);
                i--;
            }
            else if (search_query != null && !child.about.toLowerCase().includes(search_query.toLowerCase()) && !child.name.toLowerCase().includes(search_query.toLowerCase())) { // Search
                result.splice(i, 1);
                i--;
            }
        }


        //Price Sort
        if (price_low_to_high) {
            result.sort(function (a, b) {
                return parseFloat(a.price) - parseFloat(b.price);
            });
        }
        else if (price_high_to_low) {
            result.sort(function (a, b) {
                return parseFloat(b.price) - parseFloat(a.price);
            });
        }

        res.render('product', { title: 'Product', products: result, filters: filters });
    });
});

/* GET accept an ID, and return just that 1 product */
router.get('/GetSingle', function (req, res) {
    var id = req.query.id;
    if (id) {
        rest.getJSON(data_options, (statusCode, result) => {
            var product = result.find(x => x._id === id)
            var tags = product.tags.join(', ');
            res.render('product-detail', { title: 'Product', product: product, tags: tags });
        });
    }
    else {
        res.render('error', {
            title: 'ERROR',
            message: 'Must supply product id.',
            error: 'No Product ID Given'
        });
    }
});

module.exports = router;
