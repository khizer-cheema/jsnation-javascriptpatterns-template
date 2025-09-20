/**
 * on method takes two arguments: event:"event name",listener: a callback function to run when the event happens.
 * it returns an object: {"news published":[listener1,listener2...]
 * emit method also takes two arguments: event name,data: the information you want to send to subscriber.
 * events[event] is an array of callback functions(subscribers)
 * @returns
 */

function createEventEmitter() {
  const events = {};

  return {
    on: (event, listener) => {
      if (!events[event]) events[event] = [];
      events[event].push(listener);
    },
    emit: (event, data) => {
      if (events[event]) {
        events[event].forEach((listener) => listener(data));
      }
    },
  };
}

// Create Publisher
function createNewsPublisher() {
  const emitter = createEventEmitter();

  return {
    publishNews: (news) => {
      console.log("Publishing news:", news);
      emitter.emit("news published", news);
    },
    onNews: (listener) => {
      emitter.on("news published", listener);
    },
  };
}

// Usage
const newsPublisher = createNewsPublisher();

newsPublisher.onNews((news) => {
  console.log("Subscriber1 received news:", news);
});

newsPublisher.onNews((news) => {
  console.log("Subscriber2 received news:", news);
});

newsPublisher.publishNews("NEW SCIENCE DISCOVERY");
