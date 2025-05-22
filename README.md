# TestRail MCP Integration

This project provides a [Model Context Protocol (MCP)](https://github.com/anthropics/anthropic-cookbook/tree/main/model-context-protocol) integration for TestRail, allowing AI assistants to interact with TestRail's API.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Configure your TestRail credentials in `.env`:
   ```
   TESTRAIL_URL=https://your-instance.testrail.com/index.php?
   TESTRAIL_USERNAME=your-username
   TESTRAIL_API_KEY=your-api-key
   ```

   > ⚠️ **Important**: The URL format is critical. Make sure it's exactly:
   > `https://your-instance.testrail.com/index.php?`

3. Build the project:
   ```
   npm run build
   ```

4. Start the debug server:
   ```
   npm run debug
   ```

5. Access the MCP Inspector:
   ```
   http://localhost:6274?proxyPort=6277
   ```

## Troubleshooting

If you encounter issues with the TestRail API connection:

1. Verify direct API connection with a simple test script:
   ```javascript
   // save as test-connection.js
   const axios = require('axios');
   require('dotenv').config();
   
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

2. Common issues:
   - **URL format**: Ensure your TestRail URL ends with `index.php?`
   - **API key**: Make sure you're using an API key, not a password
   - **Port conflicts**: If ports 6274 or 6277 are already in use, kill processes:
     ```
     pkill -f "node scripts/debug.js"
     ```

## API Integration Details

The TestRail MCP integration connects to the TestRail API with the following considerations:

1. **URL Handling**: Uses the exact URL from environment variables without modification
2. **Request Format**: Properly formats API requests to TestRail
3. **Error Handling**: Enhanced error logging for easier troubleshooting
4. **Environment Configuration**: Clear examples of required environment variables

See the `CONTRIBUTION.md` file for more details on implementation and debugging.

## Available Tools

The integration provides the following TestRail API capabilities:

- Projects: List, view, create, update
- Test Suites: List, view, create, update
- Test Cases: List, view, create, update, delete
- Test Runs: Create, update, get results
- Sections: Manage test case organization
- Milestones: Track project progress

## License

This project is licensed under the MIT License - see the LICENSE file for details.

