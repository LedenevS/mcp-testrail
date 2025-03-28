import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { setupMocks, createTestClient } from './testHelper';

describe('Suites API', () => {
  let mockAxiosInstance: ReturnType<typeof setupMocks>;
  let client: ReturnType<typeof createTestClient>;
  
  beforeEach(() => {
    vi.clearAllMocks();
    mockAxiosInstance = setupMocks();
    client = createTestClient();
  });
  
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('retrieves a specific suite', async () => {
    // Mock response
    const mockSuite = {
      id: 1,
      name: 'Test Suite 1',
      description: 'Description for test suite 1',
      project_id: 1,
      url: 'http://example.com/suite/1'
    };
    mockAxiosInstance.get.mockResolvedValue({ data: mockSuite });
    
    // Test method
    const result = await client.getSuite(1);
    
    // Verify axios get was called correctly
    expect(mockAxiosInstance.get).toHaveBeenCalledWith('/api/v2/get_suite/1');
    
    // Verify result
    expect(result).toEqual(mockSuite);
  });
  
  it('handles errors when retrieving a specific suite', async () => {
    // Mock error response (404 - suite not found)
    const mockError = {
      response: {
        status: 404,
        data: { error: 'Suite not found' }
      }
    };
    mockAxiosInstance.get.mockRejectedValue(mockError);
    
    // Test error handling
    await expect(client.getSuite(999)).rejects.toThrow();
    
    // Verify axios get was called correctly
    expect(mockAxiosInstance.get).toHaveBeenCalledWith('/api/v2/get_suite/999');
  });
  
  it('retrieves all suites for a project', async () => {
    // Mock response
    const mockSuites = [
      { id: 1, name: 'Test Suite 1', description: 'Description for test suite 1', project_id: 1, url: 'http://example.com/suite/1' },
      { id: 2, name: 'Test Suite 2', description: 'Description for test suite 2', project_id: 1, url: 'http://example.com/suite/2' }
    ];
    mockAxiosInstance.get.mockResolvedValue({ data: mockSuites });
    
    // Test method
    const result = await client.getSuites(1);
    
    // Verify axios get was called correctly - メソッドは単にパスだけを受け取り、paramsを受け取らない
    expect(mockAxiosInstance.get).toHaveBeenCalledWith('/api/v2/get_suites/1');
    
    // Verify result
    expect(result).toEqual(mockSuites);
  });
  
  it('creates a new suite', async () => {
    // Mock response
    const mockSuite = {
      id: 3,
      name: 'New Test Suite',
      description: 'Description for new test suite',
      project_id: 1,
      url: 'http://example.com/suite/3'
    };
    mockAxiosInstance.post.mockResolvedValue({ data: mockSuite });
    
    // Test data
    const suiteData = {
      name: 'New Test Suite',
      description: 'Description for new test suite'
    };
    
    // Test method
    const result = await client.addSuite(1, suiteData);
    
    // Verify axios post was called correctly
    expect(mockAxiosInstance.post).toHaveBeenCalledWith('/api/v2/add_suite/1', suiteData);
    
    // Verify result
    expect(result).toEqual(mockSuite);
  });
  
  it('updates an existing suite', async () => {
    // Mock response
    const mockSuite = {
      id: 1,
      name: 'Updated Test Suite',
      description: 'Updated description',
      project_id: 1,
      url: 'http://example.com/suite/1'
    };
    mockAxiosInstance.post.mockResolvedValue({ data: mockSuite });
    
    // Test data
    const suiteData = {
      name: 'Updated Test Suite',
      description: 'Updated description'
    };
    
    // Test method
    const result = await client.updateSuite(1, suiteData);
    
    // Verify axios post was called correctly
    expect(mockAxiosInstance.post).toHaveBeenCalledWith('/api/v2/update_suite/1', suiteData);
    
    // Verify result
    expect(result).toEqual(mockSuite);
  });
  
  it('deletes a suite', async () => {
    // Mock successful deletion (no response data)
    mockAxiosInstance.post.mockResolvedValue({ data: {} });
    
    // Test method
    await client.deleteSuite(1);
    
    // Verify axios post was called correctly
    expect(mockAxiosInstance.post).toHaveBeenCalledWith('/api/v2/delete_suite/1', {});
  });
}); 