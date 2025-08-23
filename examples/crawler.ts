import type { ArgsDef, CommandContext, CommandMeta } from "../src/main";
import { CittyBuilder, runMain } from "../src/main";
import { CheerioCrawler, Dataset } from "crawlee";

const meta: CommandMeta = {
  name: "examples/crawler",
  version: "1.0.0",
  description: "Simple Web Crawler",
};

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

const runner: (
  context: CommandContext<CrawlerArgs>
) => any | Promise<any> = async ({ args }) => {
  const cheerio = new CheerioCrawler({
    async requestHandler({ request, $, enqueueLinks, log }) {
      const title = $("title").text();

      await Dataset.pushData({ title, url: request.loadedUrl });
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
  .withMeta(meta)
  .withArgs(args)
  .withRunner(runner)
  .getCitty();

runMain(executeCrawl);
