import {RunnableLambda} from "@langchain/core/runnables";
import {webSearch} from "../utils/webSearch";
import {query} from "express";

const setTopResults = 5;

export const webSearchStep = RunnableLambda.from(
    async (ctx : {query :string , mode: 'web'|'direct'}) => {
        const results = await webSearch(ctx.query)

        return {
            ...ctx,
            results
        }
    }
)