# GGB Broadband Services - Cable Network Management System

A modern, feature-complete web application for managing cable network customers, payments, packages, and operations with a beautiful glassmorphic UI.

![GGB Broadband Services](logo.jpg)

## 🚀 Features

### Core Functionality
- **Customer Management**: Add, edit, search, and manage customer records
- **Payment Processing**: Track payments, balances, and payment history with audit logs
- **Package Management**: Create and manage cable TV packages (Admin)
- **LCO Management**: Manage Local Cable Operators (Admin)  
- **User Management**: Control user access and permissions (Admin)
- **Bulk Import**: Excel/CSV customer import functionality (Admin)
- **Audit Logs**: Complete payment modification tracking
- **Reports**: Daily, monthly, and analytics reports with export options
- **Role-Based Access**: Different views for admin vs normal users

### Modern UI Features
- **Glassmorphic Design**: Beautiful frosted glass cards with backdrop blur
- **GGB Branding**: Company logo integrated throughout the application
- **Dark/Light Mode**: Toggle between themes with localStorage persistence
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Smooth Animations**: Elegant transitions and hover effects
- **Toast Notifications**: Real-time feedback for all user actions
- **Modern Typography**: Inter font with proper hierarchy
- **Loading States**: Professional loading screens and skeletons

## 🔐 Login Credentials

### Admin Access (Full System Access)

Username: admin
Password: admin123

**Permissions**: Full system access, manage all features

### User Access (Limited LCO Access)

Username: user1
Password: pass1

**Permissions**: LCO001, LCO002 access only

Username: user2
Password: pass2

**Permissions**: LCO003 access only

## 📁 Project Structure

ggb-cable-system/
├── app/ # Web application files
│ ├── index.html # Main application HTML
│ ├── style.css # Modern glassmorphic styling
│ ├── app.js # Complete application logic
│ └── logo.jpg # GGB company logo
├── docker-compose.yml # Container orchestration
├── Dockerfile.app # Web app container configuration
├── nginx.conf # Web server configuration
├── init.sql # Database initialization script
├── backup/ # Database backup scripts
│ ├── backup.sh # Automated backup script
│ └── restore.sh # Database restore script
├── .env.example # Environment variables template
├── .env # Environment variables (create from .env.example)
├── .gitignore # Git ignore rules
└── README.md # This documentation file


## 🐳 Docker Deployment (Recommended)

### Prerequisites
- Docker and Docker Compose installed
- Ports 80 and 5432 available on your system
- 4GB+ available RAM for optimal performance

### Quick Start

Clone or download the project

git clone <your-repository-url>
cd ggb-cable-system

Create environment file
cp .env.example .env

Edit .env file with your preferred settings
nano .env

Start all services
docker-compose up -d

Check service status
docker-compose ps

View application logs
docker-compose logs -f webapp

View database logs
docker-compose logs -f database


### Access the Application
- **Web Application**: http://localhost
- **Database**: localhost:5432 (internal use)
- **Health Check**: http://localhost/health

### Stop Services
Stop all services
docker-compose down

Stop and remove volumes (⚠️ This will delete all data)
docker-compose down -v


## 💻 Manual Deployment (Development)

If you prefer to run without Docker for development:

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Python 3.x or Node.js (for local server)
- Text editor or IDE

### Steps

Navigate to app directory
cd app/

Option 1: Python server
python3 -m http.server 8000

Option 2: Node.js server
npx serve .

Option 3: PHP server
php -S localhost:8000

Access at: http://localhost:8000


## 🔧 Configuration

### Environment Variables (.env)

Database Configuration
DB_NAME=ggb_cable_network
DB_USER=ggb_admin
DB_PASSWORD=SecurePassword123!

Application Configuration
APP_ENV=production
APP_DEBUG=false
APP_NAME=GGB Broadband Services

Backup Configuration
BACKUP_RETENTION_DAYS=30
BACKUP_INTERVAL=3600

Security Settings
SESSION_TIMEOUT=3600
MAX_LOGIN_ATTEMPTS=5


### Database Setup
The application uses PostgreSQL for data persistence:
- **Automatic Schema**: Database tables created on first startup
- **Sample Data**: Demo users, packages, and LCOs included
- **Backup System**: Automated hourly backups with 30-day retention
- **Migration Ready**: Easy to extend with new features

### Web Server Configuration
- **Nginx**: High-performance web server with optimized caching
- **Gzip Compression**: Enabled for faster page loads
- **Security Headers**: XSS protection, CSRF prevention
- **SSL Ready**: Easy HTTPS configuration for production

## 🎨 UI Themes and Customization

### Theme System
- **Dark Mode**: Default professional dark theme
- **Light Mode**: Clean light theme for bright environments
- **Theme Persistence**: User preference saved in localStorage
- **System Theme**: Automatically detects system preference

### Customization Options
/* Customize brand colors in style.css /
:root {
--primary-color: #667eea; / Change primary brand color /
--secondary-color: #764ba2; / Change secondary brand color /
--accent-color: #f093fb; / Change accent color */
}


### Logo Integration
- Replace `app/logo.jpg` with your company logo
- Recommended size: 200x200 pixels minimum
- Supported formats: JPG, PNG, SVG
- Automatic scaling for different screen sizes

## 👥 User Roles and Permissions

### Administrator Role
**Full System Access:**
- ✅ Customer Management (All LCOs)
- ✅ Payment Processing (All customers)
- ✅ Package Management (Create, Edit, Delete)
- ✅ LCO Management (Create, Edit, Delete)
- ✅ User Management (Create, Edit, Delete users)
- ✅ Bulk Customer Import (Excel/CSV)
- ✅ System Reports (All data)
- ✅ Audit Logs (Complete system activity)

### Normal User Role
**LCO-Specific Access:**
- ✅ Customer Management (Assigned LCOs only)
- ✅ Payment Processing (Assigned customers only)
- ❌ Package Management (View only)
- ❌ LCO Management (No access)
- ❌ User Management (No access)
- ❌ Bulk Import (No access)
- ✅ Reports (LCO-specific data only)
- ✅ Audit Logs (Own actions only)

## 📊 Reports and Analytics

### Available Reports
1. **Daily Payment Summary**
   - Payment collections by date
   - Payment method breakdown
   - Outstanding balances

2. **Monthly Revenue Report**
   - Revenue trends over time
   - Package-wise revenue analysis
   - LCO performance metrics

3. **Customer Analytics**
   - Customer growth statistics
   - Package popularity analysis
   - Geographic distribution

4. **Package Performance**
   - Most popular packages
   - Revenue by package type
   - Subscription trends

### Export Options
- **PDF Export**: Professional formatted reports
- **Excel Export**: Detailed data analysis
- **CSV Export**: Raw data for external processing
- **Print Friendly**: Optimized for physical printing

## 🔒 Security Features

### Authentication & Authorization
- **Secure Login**: Username/password authentication
- **Session Management**: Automatic timeout and secure sessions
- **Role-Based Access**: Granular permission system
- **Audit Logging**: Complete user activity tracking

### Data Protection
- **Input Validation**: All forms validated client and server-side
- **SQL Injection Prevention**: Parameterized queries
- **XSS Protection**: Content Security Policy headers
- **CSRF Prevention**: Token-based request validation

### Infrastructure Security
- **Container Isolation**: Docker containerization
- **Network Segmentation**: Internal container networking
- **Regular Backups**: Automated data protection
- **Health Monitoring**: Application and database health checks

## 🔄 Backup and Recovery

### Automated Backup System

Manual backup
docker exec ggb_backup /backup/backup.sh

List available backups
docker exec ggb_backup ls -la /backup/

Restore from backup
docker exec -it ggb_backup /backup/restore.sh <backup_filename>


### Backup Features
- **Automated Schedule**: Hourly backups by default
- **Retention Policy**: Configurable retention period
- **Compression**: Gzip compressed backups
- **Integrity Checks**: Automatic backup verification
- **Easy Recovery**: One-command restore process

## 🚀 Production Deployment

### Production Checklist
- [ ] Change default passwords in `.env`
- [ ] Configure SSL/TLS certificates
- [ ] Set up domain name and DNS
- [ ] Configure firewall rules
- [ ] Enable automated backups
- [ ] Set up monitoring and alerts
- [ ] Update email configuration
- [ ] Test disaster recovery procedures

### Performance Optimization

Optimize Docker images
docker-compose build --no-cache

Monitor resource usage
docker stats

Scale services if needed
docker-compose up -d --scale webapp=3


### SSL/HTTPS Setup
1. Obtain SSL certificates (Let's Encrypt recommended)
2. Update `nginx.conf` with SSL configuration
3. Redirect HTTP to HTTPS
4. Test SSL configuration

## 📱 Mobile Support

### Responsive Design
- **Breakpoints**: Optimized for all screen sizes
- **Touch Friendly**: Appropriate button and input sizes
- **Fast Loading**: Optimized assets and caching
- **Offline Ready**: Service worker for offline functionality

### Mobile Features
- **Touch Gestures**: Swipe navigation support
- **Mobile Menu**: Collapsible sidebar navigation
- **Optimized Forms**: Mobile keyboard optimization
- **Progressive Enhancement**: Works on all devices

## 🛠️ Development

### Setup Development Environment

Clone repository
git clone <repository-url>
cd ggb-cable-system

Install development dependencies
npm install # If using Node.js tools

Start development server
cd app/
python3 -m http.server 8000


### Code Structure
- **HTML**: Semantic, accessible markup
- **CSS**: Modern CSS with custom properties
- **JavaScript**: Vanilla JS with modular architecture
- **Assets**: Optimized images and fonts

### Adding New Features
1. Update HTML structure in `index.html`
2. Add styles in `style.css`
3. Implement functionality in `app.js`
4. Test across different browsers
5. Update documentation

## 📞 Support and Maintenance

### Troubleshooting

Check container status
docker-compose ps

View application logs
docker-compose logs webapp

Check database connectivity
docker exec ggb_database psql -U ggb_admin -d ggb_cable_network -c "SELECT version();"

Restart services
docker-compose restart

Full system reset (⚠️ Data loss)
docker-compose down -v
docker-compose up -d


### Common Issues
1. **Port Already in Use**: Change ports in `docker-compose.yml`
2. **Database Connection**: Check database logs and credentials
3. **Permission Denied**: Ensure proper file permissions
4. **Out of Disk Space**: Clean up old Docker images and backups

### Maintenance Tasks
- **Weekly**: Review system logs and performance
- **Monthly**: Update Docker images and security patches
- **Quarterly**: Full backup testing and disaster recovery drill
- **Annually**: Security audit and penetration testing

## 🔗 API Documentation

### Future API Endpoints (Ready for Backend Integration)
GET /api/customers # Get customers list
POST /api/customers # Create new customer
PUT /api/customers/:id # Update customer
DELETE /api/customers/:id # Delete customer

GET /api/payments # Get payments list
POST /api/payments # Create new payment
PUT /api/payments/:id # Update payment

GET /api/packages # Get packages list
POST /api/packages # Create new package
PUT /api/packages/:id # Update package
DELETE /api/packages/:id # Delete package

GET /api/reports/:type # Generate report
POST /api/import/customers # Bulk import customers


## 📄 License

Proprietary software for GGB Broadband Services.
All rights reserved.

## 📝 Changelog

### Version 2.0.0 (Current)
- ✅ Complete UI redesign with glassmorphic theme
- ✅ GGB logo integration throughout application
- ✅ Dark/light mode toggle with persistence
- ✅ Role-based access control implementation
- ✅ Package and LCO management features
- ✅ Modern responsive design
- ✅ Docker containerization
- ✅ Automated backup system

### Version 1.0.0
- ✅ Basic customer and payment management
- ✅ User authentication system
- ✅ Simple reporting features

---

## 📧 Contact

For technical support, feature requests, or deployment assistance:

**GGB Broadband Services - Development Team**
- Email: tech@ggbbroadband.com
- Phone: +91-XXXX-XXXXX
- Support Hours: 9 AM - 6 PM IST (Monday - Saturday)

---

*Built with ❤️ for GGB Broadband Services*

