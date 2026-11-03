/* Cloudflare Pages alternative; loads if hosted as a Pages project.
 * Current BrickBase site is on Workers static hosting, so the standalone Worker
 * must be attached through deployment settings unless Pages is used.
 */
import {handleRequest} from "../../ai/worker.js";
export function onRequest(context){return handleRequest(context.request,context.env);}
