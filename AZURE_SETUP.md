# Azure Blob Storage Setup for RXshops

This guide explains how to set up Azure Blob Storage for your RXshops e-commerce application to store user data, orders, and other application data.

## Prerequisites

1. **Azure Account**: You need an active Azure subscription
2. **Azure Storage Account**: Create a storage account in your Azure portal

## Step 1: Create Azure Storage Account

1. **Login to Azure Portal**: Go to [portal.azure.com](https://portal.azure.com)
2. **Create Storage Account**:
   - Click "Create a resource" → "Storage" → "Storage account"
   - Choose your subscription and resource group
   - Enter a unique storage account name (e.g., `rxshopsstorage`)
   - Select region (choose same as your app deployment)
   - Performance: Standard
   - Redundancy: LRS (Locally Redundant Storage) for development
   - Click "Review + create" → "Create"

## Step 2: Get Connection String

1. **Navigate to your Storage Account**
2. **Go to Security + networking** → **Access keys**
3. **Copy the Connection String** from key1 or key2
4. It will look like:
   ```
   DefaultEndpointsProtocol=https;AccountName=rxshopsstorage;AccountKey=ABC123...;EndpointSuffix=core.windows.net
   ```

## Step 3: Configure Environment Variables

### For Local Development:
Create a `.env` file in your backend folder:

```env
# Azure Storage Configuration
AZURE_STORAGE_CONNECTION_STRING=DefaultEndpointsProtocol=https;AccountName=rxshopsstorage;AccountKey=your_actual_key_here;EndpointSuffix=core.windows.net
AZURE_STORAGE_CONTAINER_NAME=rxshops-data
```

### For Azure Static Web Apps (Production):
1. **Go to your Static Web App** in Azure Portal
2. **Navigate to Configuration**
3. **Add Application Settings**:
   - Name: `AZURE_STORAGE_CONNECTION_STRING`
   - Value: Your connection string
   - Name: `AZURE_STORAGE_CONTAINER_NAME`
   - Value: `rxshops-data`

## Step 4: Container Structure

The application will automatically create a container called `rxshops-data` with the following blob structure:

```
rxshops-data/
├── users.json          # User accounts data
├── orders.json         # Orders data  
├── products.json       # Products data (if stored in blob)
├── backup-[timestamp]/ # Automated backups
└── uploads/            # User uploaded files (avatars, images, etc.)
```

## Step 5: Data Storage Details

### What gets stored:
- **Users**: User profiles, authentication data, preferences
- **Orders**: Order history, status, payment information
- **Products**: Additional product data (if not using frontend mock data)
- **Files**: User avatars, product images, documents

### Data Format:
- **JSON Files**: Structured data stored as JSON blobs
- **Files**: Binary data (images, documents) stored as individual blobs
- **Backups**: Timestamped snapshots of all data

## Step 6: Local Development Fallback

If Azure Storage is not configured (connection string missing), the application will automatically fall back to local file storage in:

```
backend/data/
├── users.json
├── orders.json
└── products.json
```

This allows development without Azure setup initially.

## Step 7: Security Considerations

1. **Connection String**: Keep your connection string secret
2. **Access Permissions**: The container is set to private access
3. **CORS**: Configure CORS if accessing from frontend directly
4. **Keys**: Rotate access keys periodically

## Step 8: Cost Management

- **Storage**: Very low cost for JSON data (few MB)
- **Transactions**: Minimal cost for read/write operations
- **Bandwidth**: Free egress within same region

## Step 9: Monitoring

You can monitor your storage usage in Azure Portal:
1. Go to your Storage Account
2. Navigate to "Monitoring" → "Metrics"
3. Track blob count, storage used, transactions

## API Endpoints

The following admin endpoints now use Azure Blob Storage:

- `GET /api/v1/admin/stats` - Dashboard statistics
- `GET /api/v1/admin/users` - List all users
- `GET /api/v1/admin/orders` - List all orders
- `PATCH /api/v1/admin/orders/:id/status` - Update order status
- `POST /api/v1/admin/users` - Add new user
- `POST /api/v1/admin/backup` - Create data backup

## Troubleshooting

### Common Issues:

1. **Connection Failed**:
   - Verify connection string is correct
   - Check Azure Storage Account is active
   - Ensure account key hasn't expired

2. **Container Access Denied**:
   - Verify the connection string has proper permissions
   - Check if storage account allows blob access

3. **Local Fallback Mode**:
   - Check console logs for "Using local storage fallback"
   - Verify environment variables are loaded
   - Restart the application after adding env vars

### Logs to Check:
```bash
# Application will log:
- "Container rxshops-data is ready" (success)
- "Using local storage fallback" (no Azure config)
- "Data Manager initialized successfully" (data loaded)
```

## Testing the Setup

1. **Start your backend**: `npm start`
2. **Check logs**: Should see "Container rxshops-data is ready"
3. **Test admin API**: `GET http://localhost:5000/api/v1/admin/users`
4. **Verify in Azure**: Check your storage account for the container and blobs

## Migration from Local to Azure

If you've been using local storage and want to migrate to Azure:

1. **Setup Azure** as described above
2. **Backup local data**:
   ```bash
   cp backend/data/*.json ~/backup/
   ```
3. **Configure Azure** environment variables
4. **Restart application** - it will automatically upload existing data
5. **Verify in Azure Portal** that blobs are created

Your application is now using Azure Blob Storage for persistent data storage! 🚀