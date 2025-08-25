import type { ArgsDef, CittyContextCallback } from "../src/main";
import { CittyBuilder, runMain } from "../src/main";
import { CheerioCrawler } from "crawlee";

interface CrawlerArgs extends ArgsDef {
  url: {
    description: string;
    required: boolean;
  };
}

const args: CrawlerArgs = {
  url: {
    description: "The URL(s) to crawl",
    required: true,
  },
};

const crawler: CittyContextCallback<CrawlerArgs> = async ({ args }) => {
  const cheerio = new CheerioCrawler({
    async requestHandler({ request, $, enqueueLinks, log }) {
      const title = $("title").text();

      console.log({ title, url: request.loadedUrl });
      await enqueueLinks();
    },
  });

  if (typeof args.url === "string") {
    await cheerio.run([args.url]);
  }

  if (Array.isArray(args.url)) {
    await cheerio.run(args.url);
  }
};

export const executeCrawl = new CittyBuilder<CrawlerArgs>()
  .withMeta({
    name: "examples/crawler",
    version: "1.0.0",
    description: "Simple Web Crawler",
  })
  .withArgs(args)
  .withRunner(crawler)
  .getCitty();

runMain(executeCrawl);
