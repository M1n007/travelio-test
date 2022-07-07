"use strict";

import express from "express";
import moment from "moment";
import bodyParser from "body-parser";
import logger from "./helpers/logger";
import {
    getBooks,
    arrayChunk,
    getDetailBooks
} from './helpers/helpers';

import { v4 as uuidv4 } from "uuid";

import Db from './helpers/db';

const mongoConnection = new Db();

mongoConnection.init()

const app = express();


require("dotenv").config();

const port = process.env.PORT;

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.set("views", __dirname + "/views");
app.use(bodyParser.urlencoded({ extended: false }));

const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({ extended: true });

app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

/** Index */
app.get("/", async (req, res) => {
    const bookResult = await getBooks(req.query.search);
    
    const newDetailBooks = [];
   
    let chunkResult = []
    if (bookResult.totalItems > 0) {
        for (let index = 0; index < bookResult.items.length; index++) {
            const element = bookResult.items[index];
            // const detailBooks = await getDetailBooks(element.id);
            element.rating = element.volumeInfo.averageRating ? element.volumeInfo.averageRating : 0;
            newDetailBooks.push(element)
        }
        chunkResult = await arrayChunk(newDetailBooks, 4);
    }
    
    res.render("index", {
        dataBook: chunkResult,
        realDataBook: newDetailBooks
    });
});

app.post("/wishlist", async (req, res) => {
    const body = req.body;

    await mongoConnection.setDbName('travelio-test');
    await mongoConnection.setCollectionName('whislist');

    const result = await mongoConnection.updateDocument(body);
    res.send({
        result
    })
});

app.get("/wishlist", async (req, res) => {
    const body = req.query;

    await mongoConnection.setDbName('travelio-test');
    await mongoConnection.setCollectionName('whislist');

    const result = await mongoConnection.findMany({
        visitorId: req.query.visitorId
    });
    res.send({
        result
    })
});




/** About */
app.get("/about", async (_, res) => {
    res.render("about", {});
});



app.listen(port, () => {
    const ctx = "app-listen";
    logger.log(ctx, `travelio-test started, listening at port ${port}`, "initate application");
});