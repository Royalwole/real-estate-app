# Real Estate Application Deployment Guide

## Prerequisites
- cPanel access with Node.js support
- MongoDB installed on the server
- Domain name configured in cPanel
- SSL certificate (Let's Encrypt recommended)
- Clerk account with API keys

## Backend Deployment

1. **Create Node.js Application**
   - Log in to cPanel
   - Navigate to "Setup Node.js Application"
   - Create a new application:
     - Node.js version: 16.x or later
     - Application mode: Production
     - Application root: /backend
     - Application URL: api.yourdomain.com
     - Start command: `npm start`

2. **Upload Backend Files**
   - Use File Manager or FTP to upload backend files
   - Navigate to the application root directory
   - Upload all backend files except node_modules
   - Set file permissions:
     ```bash
     find . -type d -exec chmod 755 {} \;
     find . -type f -exec chmod 644 {} \;
     ```

3. **Install Dependencies**
   - Access terminal through cPanel or SSH
   - Navigate to backend directory
   - Run: `npm install --production`

4. **Configure Environment Variables**
   - Create .env file in backend directory based on .env.example
   - Update with production values:
     ```
     PORT=5000
     NODE_ENV=production
     MONGODB_URI=mongodb://username:password@localhost:27017/real-estate
     CLERK_API_KEY=your_clerk_api_key
     ```
   - Set proper file permissions: `chmod 600 .env`

## Frontend Deployment

1. **Build Frontend Application**
   - Update .env.local with production values:
     ```
     NEXT_PUBLIC_API_URL=https://api.yourdomain.com
     NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
     CLERK_SECRET_KEY=your_clerk_secret_key
     ```
   - Run: `npm run build`
   - This creates an optimized production build

2. **Upload Frontend Files**
   - Use File Manager or FTP to upload the built files
   - Upload the contents of the 'out' directory to public_html
   - Set file permissions:
     ```bash
     find . -type d -exec chmod 755 {} \;
     find . -type f -exec chmod 644 {} \;
     ```

3. **Configure Domain**
   - Point domain to public_html directory
   - Enable SSL through Let's Encrypt
   - Configure domain redirects if needed

## Database Setup

1. **Create MongoDB Database**
   - Use cPanel MongoDB Database Wizard
   - Create database and user with strong password
   - Update MONGODB_URI in backend .env file
   - Enable authentication

2. **Configure MongoDB Security**
   ```bash
   # Edit mongod.conf
   security:
     authorization: enabled
   
   # Restart MongoDB
   systemctl restart mongod
   ```

## Clerk Configuration

1. **Update Clerk Settings**
   - Log in to Clerk Dashboard
   - Add your domain to allowed origins
   - Configure OAuth providers if needed
   - Set up email templates for authentication

2. **Configure Webhooks**
   - Create webhook endpoint for user synchronization
   - Add webhook secret to backend .env
   - Test webhook functionality

## Security Setup

1. **SSL Configuration**
   ```nginx
   # Add to nginx configuration
   server {
       listen 443 ssl;
       server_name yourdomain.com;
       
       ssl_certificate /path/to/cert.pem;
       ssl_certificate_key /path/to/key.pem;
       
       # Enable HSTS
       add_header Strict-Transport-Security "max-age=31536000" always;
   }
   ```

2. **API Security**
   - Configure CORS in backend/server.js:
     ```javascript
     app.use(cors({
       origin: 'https://yourdomain.com',
       credentials: true
     }));
     ```
   - Enable rate limiting
   - Use secure headers (helmet)

## Post-Deployment Verification

1. **Backend Checks**
   - Test API endpoints:
     ```bash
     curl https://api.yourdomain.com/api/health
     curl https://api.yourdomain.com/api/listings
     ```
   - Check server logs for errors
   - Verify MongoDB connection
   - Test Clerk authentication

2. **Frontend Checks**
   - Verify property listings display
   - Test search functionality
   - Check user authentication flow
   - Test admin dashboard
   - Verify responsive design

## Monitoring Setup

1. **Error Logging**
   ```javascript
   // Add to backend/server.js
   const winston = require('winston');
   const logger = winston.createLogger({
     level: 'info',
     format: winston.format.json(),
     transports: [
       new winston.transports.File({ filename: 'error.log', level: 'error' }),
       new winston.transports.File({ filename: 'combined.log' })
     ]
   });
   ```

2. **Performance Monitoring**
   - Set up MongoDB monitoring
   - Configure server resource alerts
   - Monitor API response times

## Backup Strategy

1. **Database Backups**
   ```bash
   # Add to crontab
   0 0 * * * mongodump --uri="mongodb://username:password@localhost:27017/real-estate" --out=/backup/$(date +\%Y\%m\%d)
   ```

2. **Application Backups**
   - Regular backups of:
     - Environment files
     - Uploaded images
     - Configuration files
   - Store backups in secure location

## Troubleshooting Guide

1. **Common Issues**
   - Check Node.js application logs: `/home/username/logs/nodejs/error.log`
   - Verify MongoDB connection: `mongo --eval "db.adminCommand('ping')"`
   - Check file permissions
   - Verify environment variables

2. **Performance Issues**
   - Monitor server resources: `top`, `htop`
   - Check MongoDB indexes
   - Verify caching configuration
   - Monitor API response times

## Maintenance Procedures

1. **Regular Updates**
   ```bash
   # Update Node.js packages
   npm audit
   npm update

   # Update system packages
   yum update -y
   ```

2. **SSL Certificate Renewal**
   ```bash
   # Auto-renewal with Let's Encrypt
   certbot renew
   ```

3. **Log Rotation**
   ```bash
   # Configure logrotate
   /etc/logrotate.d/nodejs
   ```

Remember to regularly:
- Monitor system resources
- Review error logs
- Update security patches
- Test backup restoration
- Review and update documentation
