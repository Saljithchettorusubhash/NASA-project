class RateLimiter {
    private tokens: number;
    private maxTokens: number;
    private refillRate: number;
    private lastRefill: number;
  
    constructor(maxTokens: number, refillRate: number) {
      this.tokens = maxTokens;
      this.maxTokens = maxTokens;
      this.refillRate = refillRate; // tokens per second
      this.lastRefill = Date.now();
    }
  
    private refillTokens() {
      const now = Date.now();
      const timeElapsed = (now - this.lastRefill) / 1000; // time elapsed in seconds
      const tokensToAdd = Math.floor(timeElapsed * this.refillRate);
  
      if (tokensToAdd > 0) {
        this.tokens = Math.min(this.maxTokens, this.tokens + tokensToAdd);
        this.lastRefill = now;
      }
    }
  
    public async acquireToken(): Promise<void> {
      this.refillTokens();
  
      while (this.tokens <= 0) {
        await new Promise(resolve => setTimeout(resolve, 100)); // Wait 100ms before checking again
        this.refillTokens();
      }
  
      this.tokens -= 1;
    }
  }
  
  const rateLimiter = new RateLimiter(1, 1); // Reduce the rate to 3 requests per second
  
  export default rateLimiter;
  