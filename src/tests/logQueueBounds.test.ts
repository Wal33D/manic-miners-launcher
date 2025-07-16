import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import { Logger } from '../utils/logger';

// Create a test logger instance to avoid affecting the global logger
class TestLogger extends Logger {
  constructor() {
    super();
  }

  // Expose protected methods for testing
  public testLog(level: any, category: string, message: string, data?: unknown, error?: Error) {
    // Access private method through casting
    (this as any).log(level, category, message, data, error);
  }

  public getLogQueue() {
    return (this as any).logQueue;
  }

  public getDroppedLogCount() {
    return (this as any).droppedLogCount;
  }

  // Override for testing to allow smaller queue sizes
  public setMaxQueueSizeForTesting(size: number) {
    (this as any).maxQueueSize = size;
  }
}

describe('Log Queue Bounds Checking', () => {
  let testLogger: TestLogger;

  beforeEach(() => {
    testLogger = new TestLogger();
  });

  it('should maintain queue size within bounds', () => {
    // Set a small queue size for testing
    testLogger.setMaxQueueSizeForTesting(5);

    // Add more logs than the queue size
    for (let i = 0; i < 10; i++) {
      testLogger.testLog(1, 'TEST', `Log message ${i}`);
    }

    const stats = testLogger.getQueueStats();
    expect(stats.currentQueueSize).to.be.at.most(5);
    expect(stats.droppedLogCount).to.equal(5);
  });

  it('should track dropped log count correctly', () => {
    testLogger.setMaxQueueSizeForTesting(3);

    // Add 7 logs (should drop 4)
    for (let i = 0; i < 7; i++) {
      testLogger.testLog(1, 'TEST', `Log message ${i}`);
    }

    const stats = testLogger.getQueueStats();
    expect(stats.droppedLogCount).to.equal(4);
    expect(stats.currentQueueSize).to.equal(3);
  });

  it('should reset dropped count when logs are cleared', async () => {
    testLogger.setMaxQueueSizeForTesting(2);

    // Add logs to trigger drops
    for (let i = 0; i < 5; i++) {
      testLogger.testLog(1, 'TEST', `Log message ${i}`);
    }

    expect(testLogger.getQueueStats().droppedLogCount).to.equal(3);

    // Clear logs
    await testLogger.clearLogs();

    expect(testLogger.getQueueStats().droppedLogCount).to.equal(0);
    expect(testLogger.getQueueStats().currentQueueSize).to.equal(0);
  });

  it('should enforce minimum queue size', () => {
    expect(() => testLogger.setMaxQueueSize(50)).to.throw('Maximum queue size must be at least 100');
  });

  it('should return correct queue statistics', () => {
    testLogger.setMaxQueueSize(100);

    // Add some logs
    for (let i = 0; i < 10; i++) {
      testLogger.testLog(1, 'TEST', `Log message ${i}`);
    }

    const stats = testLogger.getQueueStats();
    expect(stats.currentQueueSize).to.equal(10);
    expect(stats.maxQueueSize).to.equal(100);
    expect(stats.droppedLogCount).to.equal(0);
    expect(stats.isWriting).to.be.a('boolean');
  });
});
