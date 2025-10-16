const { BlobServiceClient } = require('@azure/storage-blob');

class AzureBlobService {
  constructor() {
    // Initialize with connection string from environment variables
    this.connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
    this.containerName = process.env.AZURE_STORAGE_CONTAINER_NAME || 'rxshops-data';
    
    if (!this.connectionString) {
      console.warn('Azure Storage connection string not found. Using local storage fallback.');
      this.useLocalFallback = true;
      return;
    }

    try {
      this.blobServiceClient = BlobServiceClient.fromConnectionString(this.connectionString);
      this.containerClient = this.blobServiceClient.getContainerClient(this.containerName);
      this.useLocalFallback = false;
    } catch (error) {
      console.error('Failed to initialize Azure Blob Storage:', error.message);
      this.useLocalFallback = true;
    }
  }

  async initializeContainer() {
    if (this.useLocalFallback) return;
    
    try {
      await this.containerClient.createIfNotExists({
        access: 'private'
      });
      console.log(`Container "${this.containerName}" is ready.`);
    } catch (error) {
      console.error('Failed to create container:', error.message);
    }
  }

  // Save JSON data to blob storage
  async saveData(fileName, data) {
    if (this.useLocalFallback) {
      return this.saveToLocalFile(fileName, data);
    }

    try {
      const blobName = `${fileName}.json`;
      const blockBlobClient = this.containerClient.getBlockBlobClient(blobName);
      
      const jsonData = JSON.stringify(data, null, 2);
      await blockBlobClient.upload(jsonData, jsonData.length, {
        blobHTTPHeaders: {
          blobContentType: 'application/json'
        },
        metadata: {
          lastModified: new Date().toISOString(),
          dataType: fileName
        }
      });

      console.log(`Data saved to blob: ${blobName}`);
      return true;
    } catch (error) {
      console.error(`Failed to save data to blob ${fileName}:`, error.message);
      return false;
    }
  }

  // Load JSON data from blob storage
  async loadData(fileName, defaultValue = []) {
    if (this.useLocalFallback) {
      return this.loadFromLocalFile(fileName, defaultValue);
    }

    try {
      const blobName = `${fileName}.json`;
      const blockBlobClient = this.containerClient.getBlockBlobClient(blobName);
      
      const exists = await blockBlobClient.exists();
      if (!exists) {
        console.log(`Blob ${blobName} doesn't exist, returning default value.`);
        return defaultValue;
      }

      const downloadResponse = await blockBlobClient.download(0);
      const downloadedContent = await this.streamToString(downloadResponse.readableStreamBody);
      
      return JSON.parse(downloadedContent);
    } catch (error) {
      console.error(`Failed to load data from blob ${fileName}:`, error.message);
      return defaultValue;
    }
  }

  // Upload file (for user avatars, product images, etc.)
  async uploadFile(fileName, fileBuffer, contentType = 'application/octet-stream') {
    if (this.useLocalFallback) {
      console.log('File upload not supported in local fallback mode');
      return null;
    }

    try {
      const blockBlobClient = this.containerClient.getBlockBlobClient(fileName);
      
      await blockBlobClient.uploadData(fileBuffer, {
        blobHTTPHeaders: {
          blobContentType: contentType
        }
      });

      // Return the blob URL
      return blockBlobClient.url;
    } catch (error) {
      console.error(`Failed to upload file ${fileName}:`, error.message);
      return null;
    }
  }

  // Delete blob
  async deleteData(fileName) {
    if (this.useLocalFallback) {
      return this.deleteLocalFile(fileName);
    }

    try {
      const blobName = `${fileName}.json`;
      const blockBlobClient = this.containerClient.getBlockBlobClient(blobName);
      await blockBlobClient.delete();
      return true;
    } catch (error) {
      console.error(`Failed to delete blob ${fileName}:`, error.message);
      return false;
    }
  }

  // Helper method to convert stream to string
  async streamToString(readableStream) {
    return new Promise((resolve, reject) => {
      const chunks = [];
      readableStream.on('data', (data) => {
        chunks.push(data.toString());
      });
      readableStream.on('end', () => {
        resolve(chunks.join(''));
      });
      readableStream.on('error', reject);
    });
  }

  // Local fallback methods for development
  saveToLocalFile(fileName, data) {
    const fs = require('fs');
    const path = require('path');
    
    try {
      const dataDir = path.join(__dirname, '../data');
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      
      const filePath = path.join(dataDir, `${fileName}.json`);
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      console.log(`Data saved locally to: ${filePath}`);
      return true;
    } catch (error) {
      console.error(`Failed to save data locally ${fileName}:`, error.message);
      return false;
    }
  }

  loadFromLocalFile(fileName, defaultValue = []) {
    const fs = require('fs');
    const path = require('path');
    
    try {
      const filePath = path.join(__dirname, '../data', `${fileName}.json`);
      if (!fs.existsSync(filePath)) {
        return defaultValue;
      }
      
      const fileContent = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(fileContent);
    } catch (error) {
      console.error(`Failed to load data locally ${fileName}:`, error.message);
      return defaultValue;
    }
  }

  deleteLocalFile(fileName) {
    const fs = require('fs');
    const path = require('path');
    
    try {
      const filePath = path.join(__dirname, '../data', `${fileName}.json`);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        return true;
      }
      return false;
    } catch (error) {
      console.error(`Failed to delete local file ${fileName}:`, error.message);
      return false;
    }
  }
}

// Create and export singleton instance
const azureBlobService = new AzureBlobService();
module.exports = azureBlobService;