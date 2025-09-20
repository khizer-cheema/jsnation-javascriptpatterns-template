const EventEmitter = require("events");

class NewsPublisher extends EventEmitter {
  publishNews(news) {
    console.log("Publishing news", news);
    this.emit("news published", news);
  }
}

const newsPublisher = new NewsPublisher();
newsPublisher.on("news published", (news) => {
  console.log("Subscriber1 received news:", news);
});
newsPublisher.on("news published", (news) => {
  console.log("Subscriber2 received news:", news);
});
newsPublisher.publishNews("NEW SCIENCE DISCOVERY");
