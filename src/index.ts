import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
    CallToolRequestSchema,
    ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { ApifyClient } from "apify-client";
import * as dotenv from "dotenv";
import { z } from "zod";

// Redirect console.log to console.error to prevent stray output from breaking the MCP protocol
console.log = console.error;

dotenv.config({ quiet: true });

const APIFY_API_TOKEN = process.env.APIFY_API_TOKEN;

if (!APIFY_API_TOKEN) {
    throw new Error("APIFY_API_TOKEN not found. Please set APIFY_API_TOKEN in your environment.");
}

const apifyClient = new ApifyClient({
    token: APIFY_API_TOKEN,
});

const server = new Server(
    {
        name: "Reddit MCP",
        version: "1.0.0",
    },
    {
        capabilities: {
            tools: {},
        },
    }
);

/**
 * Tool Definitions
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: "reddit_fast_search",
                description: "Quickly search for Reddit posts, comments, or users. Best for general information gathering.",
                inputSchema: {
                    type: "object",
                    properties: {
                        query: { type: "string", description: "The search keyword." },
                        subreddits: { type: "array", items: { type: "string" }, description: "Limit search to specific subreddits (e.g., [\"marketing\", \"SaaS\"])." },
                        limit: { type: "number", default: 10, description: "Max number of results." },
                        sort: { type: "string", enum: ["relevance", "hot", "top", "new"], description: "Sort order." },
                    },
                    required: ["query"],
                },
            },
            {
                name: "reddit_lead_monitor",
                description: "Find high-intent leads or brand mentions while filtering out noise. Use this when the user wants to find 'buyers' or specific discussions.",
                inputSchema: {
                    type: "object",
                    properties: {
                        keywords: { type: "array", items: { type: "string" }, description: "Main search terms." },
                        negative_keywords: { type: "array", items: { type: "string" }, description: "Words to exclude (e.g., \"crypto\", \"hiring\")." },
                        target_subreddits: { type: "array", items: { type: "string" }, description: "Limit search to specific subreddits." },
                        hours_back: { type: "number", default: 24, description: "How far back to search in hours." },
                    },
                    required: ["keywords"],
                },
            },
        ],
    };
});

/**
 * Tool Execution
 */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    try {
        if (name === "reddit_fast_search") {
            const { query, subreddits, limit = 25, sort = "new" } = args as any;

            // Build search queries. If subreddits are provided, use Reddit's search syntax
            const searchQueries = subreddits && subreddits.length > 0
                ? subreddits.map((s: string) => `${query} subreddit:${s}`)
                : [query];

            const input = {
                searches: searchQueries,
                maxItems: limit,
                sort: sort,
                searchPosts: true,
                searchComments: false,
                searchCommunities: false,
                searchUsers: false,
                skipCommunity: true,
            };

            const run = await apifyClient.actor("practicaltools/apify-reddit-api").call(input);
            const { items } = await apifyClient.dataset(run.defaultDatasetId).listItems();

            const formattedResults = items.map((item: any) => ({
                title: item.title,
                text: item.text?.substring(0, 500) + (item.text?.length > 500 ? "..." : ""),
                url: item.url,
                author: item.author,
                subreddit: item.subreddit,
                upvotes: item.upvotes,
                createdAt: item.createdAt,
            }));

            return {
                content: [{ type: "text", text: JSON.stringify(formattedResults, null, 2) }],
            };
        }

        if (name === "reddit_lead_monitor") {
            const { keywords, negative_keywords, target_subreddits, hours_back = 24 } = args as any;

            // Map keywords and subreddits to the actor's expected object format
            const searches = keywords.flatMap((k: string) => {
                if (target_subreddits && target_subreddits.length > 0) {
                    return target_subreddits.map((s: string) => ({ keyword: k, subreddit: s }));
                }
                return [{ keyword: k }];
            });

            const input = {
                searches: searches,
                negative_keywords: negative_keywords,
                hours_back: hours_back,
                searchPosts: true,
                searchComments: true,
                maxItems: 50,
            };

            const run = await apifyClient.actor("practicaltools/reddit-keyword-monitor").call(input);
            const { items } = await apifyClient.dataset(run.defaultDatasetId).listItems();

            const formattedResults = items.map((item: any) => ({
                title: item.title,
                text: item.text?.substring(0, 500) + (item.text?.length > 500 ? "..." : ""),
                url: item.url,
                author: item.author,
                subreddit: item.subreddit,
                matchedKeywords: item.matchedKeywords,
                type: item.dataType, // post or comment
            }));

            return {
                content: [{ type: "text", text: JSON.stringify(formattedResults, null, 2) }],
            };
        }

        throw new Error(`Tool not found: ${name}`);
    } catch (error: any) {
        return {
            content: [{ type: "text", text: `Error: ${error.message}` }],
            isError: true,
        };
    }
});

/**
 * Server Startup
 */
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Reddit MCP server running on stdio");
}

main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
