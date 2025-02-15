# cPanel Installation Guide

## Table of Contents
1. [System Requirements](#system-requirements)
2. [Pre-Installation Steps](#pre-installation-steps)
3. [Installation Process](#installation-process)
4. [Post-Installation Configuration](#post-installation-configuration)
5. [Security Recommendations](#security-recommendations)
6. [Troubleshooting](#troubleshooting)

## System Requirements

### Minimum Hardware Requirements
- CPU: 1.1 GHz processor (2 GHz or higher recommended)
- RAM: 1 GB minimum (2 GB or higher recommended)
- Storage: 20 GB minimum (100 GB recommended)
- Network Interface Card: 100 Mbps

### Software Requirements
- Operating System: CentOS 7.x or later (recommended), RHEL 7.x or later
- Perl 5.10 or later
- Clean installation of supported OS (no other control panels installed)
- Valid hostname that resolves to main IP address
- Valid fully qualified domain name (FQDN)

## Pre-Installation Steps

1. **Update System Packages**
   ```bash
   yum update -y
   ```

2. **Disable SELinux**
   ```bash
   sed -i 's/SELINUX=enforcing/SELINUX=disabled/g' /etc/selinux/config
   setenforce 0
   ```

3. **Configure Hostname**
   ```bash
   hostnamectl set-hostname server.yourdomain.com
   ```

4. **Verify System Time**
   ```bash
   timedatectl set-timezone UTC
   ```

## Installation Process

1. **Download cPanel Installation Script**
   ```bash
   cd /home
   curl -o latest -L https://securedownloads.cpanel.net/latest
   ```

2. **Set Execute Permissions**
   ```bash
   chmod +x latest
   ```

3. **Run Installation Script**
   ```bash
   sh latest
   ```
   Note: The installation process typically takes 1-2 hours depending on your server specifications.

4. **Access WHM (Web Host Manager)**
   - Open browser and navigate to: https://your-server-ip:2087
   - Log in with root credentials

## Post-Installation Configuration

1. **Complete Initial Setup Wizard**
   - Set up nameservers
   - Configure basic server settings
   - Set up DNS settings

2. **Configure Basic WHM Settings**
   - Set up backup configuration
   - Configure Apache settings
   - Set up PHP versions
   - Configure mail server settings

3. **Set Up SSL Certificates**
   ```bash
   /scripts/install_lets_encrypt_autossl_provider
   ```

## Security Recommendations

1. **Update Password Requirements**
   - Navigate to WHM > Security Center > Password Strength Configuration
   - Set strong password requirements

2. **Configure Firewall**
   - Enable CSF (ConfigServer Security & Firewall)
   - Configure basic firewall rules

3. **Enable Two-Factor Authentication**
   - Navigate to WHM > Security Center > Two-Factor Authentication
   - Set up 2FA for WHM access

4. **Regular Security Updates**
   ```bash
   /scripts/upcp --cron
   ```

## Troubleshooting

### Common Issues and Solutions

1. **Installation Fails**
   - Check system requirements
   - Verify network connectivity
   - Review installation logs at `/var/log/cpanel-install.log`

2. **WHM Access Issues**
   - Verify port 2087 is open
   - Check SSL certificate configuration
   - Confirm firewall settings

3. **License Verification Failed**
   - Verify IP address matches license
   - Check network connectivity to licensing servers
   - Contact cPanel support

### Important Files and Directories

- Configuration Files: `/usr/local/cpanel/conf/`
- Log Files: `/usr/local/cpanel/logs/`
- Installation Directory: `/usr/local/cpanel`

### Support Resources

- Official Documentation: https://docs.cpanel.net/
- cPanel Forums: https://forums.cpanel.net/
- Support Ticket System: https://tickets.cpanel.net/

## License Management

1. **License Verification**
   - Purchase a valid cPanel license
   - Register IP address with cPanel
   - Verify license activation

2. **License Management**
   - Monitor license expiration
   - Set up automatic renewal
   - Keep billing information updated

## Additional Notes

1. **Email Configuration**
   - Set up mail server (Exim)
   - Configure spam filters
   - Set up email authentication (SPF, DKIM)
   - Configure webmail services

2. **Backup Configuration**
   - Set up automated backups
   - Configure backup retention policy
   - Test backup restoration

2. **Performance Optimization**
   - Configure Apache settings
   - Optimize MySQL/MariaDB
   - Set up caching

3. **Monitoring Setup**
   - Configure server monitoring
   - Set up email notifications
   - Enable resource usage alerts

4. **Regular Maintenance Tasks**
   - Update system packages
   - Monitor disk usage
   - Review security logs
   - Check for failed services

## Version Control

1. **cPanel Version Management**
   - Check current version: `/usr/local/cpanel/cpanel -V`
   - Set up automatic updates
   - Review changelog before updates
   - Test updates in staging environment

2. **Update Policies**
   - Configure update preferences in WHM
   - Schedule updates during off-peak hours
   - Maintain update documentation
   - Set up update notifications

Remember to regularly check for cPanel updates and security patches to maintain a secure and efficient hosting environment. Always test major updates in a staging environment before applying them to production servers.

## FTP Configuration and Deployment

1. **FTP Server Setup**
   - Navigate to WHM > Service Configuration > FTP Server Selection
   - Choose and configure FTP server (Pure-FTPd recommended)
   - Set up FTP ports (default: 21)
   - Configure passive FTP range

2. **Creating FTP Accounts**
   ```bash
   # Through WHM Interface:
   1. Log into WHM
   2. Navigate to Account Functions > Create a New Account
   3. Fill in account details
   4. Set up FTP username and password

   # Through cPanel Interface:
   1. Log into cPanel
   2. Navigate to Files > FTP Accounts
   3. Click "Create FTP Account"
   4. Set directory permissions
   ```

3. **FTP Security Settings**
   - Enable SSL/TLS encryption
   - Configure firewall for FTP ports
   - Set up IP restrictions
   - Enable FTP logging
   ```bash
   # Configure SSL for FTP
   /scripts/setupftpssl
   ```

4. **Deployment Process**
   - **Using File Manager:**
     1. Log into cPanel
     2. Navigate to Files > File Manager
     3. Upload files to public_html
     4. Set proper permissions (typically 644 for files, 755 for directories)

   - **Using FTP Client:**
     1. Connect using FTP client (FileZilla, Cyberduck, etc.)
        ```
        Host: yourdomain.com
        Username: your_ftp_username
        Password: your_ftp_password
        Port: 21 (or custom port)
        ```
     2. Navigate to public_html
     3. Upload website files
     4. Verify file permissions

5. **Publishing Website**
   - Point domain to public_html directory
   - Configure DNS settings in WHM
   - Set up SSL certificate (refer to SSL Certificates section)
   - Verify domain propagation

6. **Post-Deployment Checks**
   - Verify file permissions
   - Test website functionality
   - Check error logs
   - Monitor resource usage
   ```bash
   # Check Apache error logs
   tail -f /usr/local/apache/logs/error_log
   ```

## Publishing to GitHub

1. **Initialize Git Repository**
   ```bash
   git init
   ```

2. **Add and Commit Files**
   ```bash
   git add cpanel-installation-guide.md
   git commit -m "Add cPanel installation and deployment guide"
   ```

3. **Create GitHub Repository**
   - Go to github.com
   - Click "New repository"
   - Name it "cpanel-guide" (or your preferred name)
   - Keep it public for others to benefit
   - Don't initialize with README (we already have our guide)

4. **Link and Push to GitHub**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/cpanel-guide.git
   git branch -M main
   git push -u origin main
   ```

5. **Verify Publication**
   - Visit your GitHub repository URL
   - Ensure the documentation is properly formatted
   - Check if all sections are visible

## Quick Reference Commands

```bash
# Check cPanel version
/usr/local/cpanel/cpanel -V

# Force system updates
/usr/local/cpanel/scripts/upcp --force

# Check service status
/usr/local/cpanel/scripts/restartsrv_* --check

# Rebuild Apache configuration
/scripts/rebuildhttpdconf

# Update IP addresses
/scripts/updateipaddress

# Check current resource usage
/scripts/systemstats

# Verify DNS configuration
/scripts/dnscheckall
```
