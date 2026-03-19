import {RunnableLambda} from "@langchain/core/runnables";
import {webSearch} from "../utils/webSearch";
import {openUrl} from "../utils/openUrl";
import {summarize} from "../utils/summarize";

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

export const openAndSummarizeStep = RunnableLambda.from(
    async(ctx : {query :string , mode: 'web'|'direct', results:any[]}) => {
        if (!Array.isArray(ctx.results) || ctx.results.length === 0){
            return {
                ...ctx,
                pageSummary: [],
                fallback:'no results' as const,
            }
        }

        const getTopResults = ctx.results.slice(0,setTopResults);
        const settledResults = await Promise.allSettled(
            getTopResults.map(
                async(result:any)=>{
                    const opened = await openUrl(result.url)
                    const summarizeContent = await summarize(opened.content)
                    return {
                        openUrl:opened.url,
                        summary:summarizeContent.summary,
                    }
                }
            ),

        )

        const settledResultPageSummarizies = settledResults.filter(
            settledResults => settledResults.status === "fulfilled"
        ).map(s => s.value)

        if (settledResultPageSummarizies.length === 0) {
            const fallBackSummarize = getTopResults.map((results:any)=>({
                url:results.url,
                summary:String(results.snippet || results.title),
            })).filter(((x:any)=>x.summary.length > 0))
            return {
                ...ctx,
                pageSummary:fallBackSummarize,
                fallback:"no results"as const
            }
        }

        return {
            ...ctx,
            pageSummary:settledResultPageSummarizies,
        }
    }
)