const express = require("express");
const moment = require("moment"); // Make sure to import moment
const Transaction = require("../models/Transactionfix");
const router = express.Router();

router.post('/add-transaction', async function (req, res) {
    try {
        const newtransaction = new Transaction(req.body);
        await newtransaction.save();
        res.send('Transaction Added Successfully');
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post("/get-all-transactions", async (req, res) => {
    const { frequency, selectedRange, userid , type } = req.body;
    try {
        let query = { userid };

        // Handle "custom" range
        if (frequency === 'custom') {
            if (!selectedRange || selectedRange.length !== 2) {
                return res.status(400).send("Invalid date range provided");
            }

            query.date = {
                $gte: new Date(selectedRange[0]),
                $lte: new Date(selectedRange[1]),
            };
        }

        // Handle fixed ranges like "7", "30", "365"
        else if (frequency !== 'all') {
            query.date = {
                $gt: moment().subtract(Number(frequency), 'd').toDate(),
            };
        }

        // Filter by type if not "all"
        if (type !== 'all') {
            query.type = type; // 'income' or 'expense'
        }

        const transactions = await Transaction.find(query);
        res.send(transactions);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
