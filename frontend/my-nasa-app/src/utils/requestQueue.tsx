class RequestQueue {
  private queue: (() => Promise<any>)[] = [];
  private maxConcurrentRequests: number;
  private runningRequests: number = 0;

  constructor(maxConcurrentRequests = 5) {
    this.maxConcurrentRequests = maxConcurrentRequests;
  }

  public addRequest(requestFn: () => Promise<any>) {
    this.queue.push(requestFn);
    this.processQueue();
  }

  private processQueue() {
    if (this.runningRequests < this.maxConcurrentRequests && this.queue.length > 0) {
      const nextRequest = this.queue.shift();
      if (nextRequest) {
        this.runningRequests++;
        nextRequest()
          .then(() => {
            this.runningRequests--;
            this.processQueue(); // Process the next request
          })
          .catch(() => {
            this.runningRequests--;
            this.processQueue(); // Even if failed, proceed with the queue
          });
      }
    }
  }
}

const requestQueue = new RequestQueue(2); // Allow a maximum of 2 concurrent requests

export default requestQueue;
