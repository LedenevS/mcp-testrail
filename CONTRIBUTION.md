# TestRail MCP Integration - Contribution Guide

## Prerequisites

To contribute to this TestRail MCP integration, ensure you have:

1. Node.js installed (v16+)
2. npm or yarn package manager
3. A TestRail instance with API access

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and configure with your TestRail credentials:
   ```
   TESTRAIL_URL=https://your-instance.testrail.com/index.php?
   TESTRAIL_USERNAME=your-username
   TESTRAIL_API_KEY=your-api-key
   ```
   > ⚠️ Note: The URL format is critical - it must end with `index.php?`

## Building and Testing

1. Build the project: `npm run build`
2. Run the debug server: `npm run debug`
3. Test direct API access to verify your configuration:
   ```javascript
   // Direct API test using axios
   const axios = require('axios');
   const url = process.env.TESTRAIL_URL + 'api/v2/get_projects';
   const auth = Buffer.from(`${process.env.TESTRAIL_USERNAME}:${process.env.TESTRAIL_API_KEY}`).toString('base64');
   
   axios.get(url, {
     headers: {
       'Authorization': `Basic ${auth}`,
       'Content-Type': 'application/json'
     }
   })
   .then(response => console.log('Success:', response.data))
   .catch(error => console.error('Error:', error.response?.data || error.message));
   ```

## Implementation Notes

When working with the TestRail API:

1. URL format must be: `https://your-instance.testrail.com/index.php?api/v2/...`
2. Authentication uses Basic auth with username:api_key encoded to Base64
3. No extra slashes should be added between `index.php?` and the API path

## Debugging Tips

If you encounter issues with the API connection:

1. Verify your TestRail URL ends with `index.php?`
2. Check your API key permissions
3. Enable verbose logging by setting `DEBUG=axios` in your environment
4. Test direct API access before using the MCP tools
