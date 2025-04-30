import { CheerioCrawler, Dataset } from "crawlee";
import { CittyBuilder } from "./command/builder";
import { CommandContext } from "citty";

type SampleCrawlerArgs = {
  url: {
    description: string;
    required: boolean;
  };
};

const crawlRunner: (
  context: CommandContext<SampleCrawlerArgs>
) => Promise<void> = async ({ args }) => {
  console.log(`Starting Crawl of ${args.url}`);

  const crawler = new CheerioCrawler({
    async requestHandler({ request, $, enqueueLinks, log }) {
      const title = $("title").text();

      await Dataset.pushData({ title, url: request.loadedUrl });
      await enqueueLinks();
    },
  });

  if (typeof args.url === "string") {
    await crawler.run([args.url]);
  }

  if (Array.isArray(args.url)) {
    await crawler.run(args.url);
  }
};

export const sampleCrawler = new CittyBuilder<SampleCrawlerArgs>()
  .withMeta({
    name: "simple-crawler",
    version: "1.0.0",
    description: "Simple Web Crawler",
  })
  .withArgs({
    url: {
      description: "The URL to crawl",
      required: true,
    },
  })
  .withRunner(crawlRunner)
  .getCitty();
