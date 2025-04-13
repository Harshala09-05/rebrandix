# ReBrandX
<img src="https://i.ibb.co/hx3GZLCm/20250411-1252-Rebrand-X-Logo-Design-simple-compose-01jrhvh5jpe689wqfwjx24c7e0.png" alt="20250411-1252-Rebrand-X-Logo-Design-simple-compose-01jrhvh5jpe689wqfwjx24c7e0" border="0" height="200">

## 📝 Description

ReBrandX is an online multi-role marketplace connecting Manufacturers, Branders, and Wholesalers. The platform enables manufacturers to list products, allows branders to rebrand and resell them, and permits wholesalers to bulk-purchase either branded or unbranded products. A unique bidding system helps maximize product value through competitive branding.


### Screenshots

<div align="center"> 
<img src="https://i.ibb.co/mr8hs8sY/productlist.png" alt="productlist" border="0">
  
  <img src="https://i.ibb.co/8g8cBfYB/productdetail.png" alt="productdetail" border="0">
  
<img src="https://i.ibb.co/2046Dvdt/category.png" alt="category" border="0"> </div> 

 <div align="center"> 
<img src="https://i.ibb.co/d0x7M7rs/meet.png" alt="meet" border="0">

<img src="https://i.ibb.co/LXkD0HLh/meeting.png" alt="meeting" border="0">

<img src="https://i.ibb.co/yBV9RgZz/dashboard1.png" alt="dashboard1" border="0">

<img src="https://i.ibb.co/xtM6NKt6/dashboard2.png" alt="dashboard2" border="0">

<img src="https://i.ibb.co/67Sj0wx5/dashboard3.png" alt="dashboard3" border="0">
<img src="https://i.ibb.co/WjsfY6m/AR.png" alt="AR" border="0">
 </div>

### AR Video Demo
# [arvideo.mp4](<https://media-hosting.imagekit.io/1d0f0ffdbde24b07/arvideo.mp4?Expires=1839139771&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=jnEIp6xqypRM7XFnrNRFE5Ny8fNQg6tikaiZj4~qrwUZybPpHAjM~cKzgNzDkPjeb3IllErNJx12I6kZ9VkWEafGuz-IYyxK50Dt8PVT-gljBaiOQ9RfQp0tlDjMYET8mHNRkX5HRPLaAcaXWHhle90eoMSD5CLMQ3K26kVjI-BVcXEJSOPxDbIVphagXpf8C9w1CDe58~5B3g4Zs4pFdXBgQwbf5QoBws~kDQnEAlyUYZ1w4OuaZ~RtMtH-RuH85ofUtt~apFVt7tGyJai39pYu9qU557vA2OUPastK2noODPfAyTYS5ooloMSUW5Asi73mL8JGiOK6j6jCzEb6cA__>)


## 🚀 Tech Stack

-   Frontend: React (Vite), Tailwind CSS
-   Backend: Python/Django, GraphQL, 
-   Database: Avian Cloud Database (MySQL)
-   AR Technology: Model-viewer (Web-XR)

## 🔧 Installation & Setup

### Prerequisites
-   Node.js 
-   Python 

### Environment Variables

Create the following environment files with these variables:

#### Frontend (.env.local)

```
For Local: 
VITE_GRAPHQL_API=http://127.0.0.1:8000/graphql/
VITE_BACKEND_API=http://127.0.0.1:8000/api

For Deployed: 
VITE_GRAPHQL_API=http://192.168.0.104:8000/graphql/
VITE_BACKEND_API=http://192.168.0.104:8000/api

```

#### Backend (.env)

```
DB_NAME=defaultdb
DB_USER=avnadmin
DB_HOST=mysql-2592be41-pharshala03-9ef1.k.aivencloud.com
DB_PORT=16006
DB_PASSWORD=AVNS_9JJ3QWFMGlvOe0FPWLN

WHEREBY_API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmFwcGVhci5pbiIsImF1ZCI6Imh0dHBzOi8vYXBpLmFwcGVhci5pbi92MSIsImV4cCI6OTAwNzE5OTI1NDc0MDk5MSwiaWF0IjoxNzQ0MTM1MzY2LCJvcmdhbml6YXRpb25JZCI6MzEzODQ1LCJqdGkiOiJmN2ExYWI0OS1mMjVkLTQwNGQtOGNkZC1jNzM4MGViYjQ5YTIifQ.JuRJ-uzJKLfT0ZR4EKXQmdH6pQV7wo67HVqVN77u_Po 

GEMINI_KEY=AIzaSyC2kn3jfJAkaAq1qRz31G8Q6bRr0Qoh1k4

```

### Backend Setup (Python/Django)

```bash
# Clone the repository
git clone https://github.com/Harshala09-05/rebrandix.git
cd /backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser

# Run the server
python manage.py runserver

# For network access (mobile testing)
python manage.py runserver 0.0.0.0:8000

```

### Frontend Setup (React/Vite)

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Run development server
npm run dev

# For network access (mobile testing)
npm run dev -- --host

```

## 🌐 Accessing on Mobile Devices

1.  Find your computer's local IP address (`ipconfig` on Windows, `ifconfig` on Mac/Linux)
2.  Run backend with `python manage.py runserver 0.0.0.0:8000`
3.  Run frontend with `npm run dev -- --host`
4.  On your mobile device, go to:
    -   Frontend: `http://YOUR_IP_ADDRESS:5173`
    -   Backend: `http://YOUR_IP_ADDRESS:8000`

## 📁 Project Structure

```
/
├── backend/                  # Python/Django backend
│   ├── api/                  # API endpoints
│   ├── models/               # Database models
│   └── ...
├── frontend/                 # React/Vite frontend
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── assets/           # Static assets including 3D models
│   │   └── ...
│   └── ...
└── README.md

```



## 🛠️ API Reference

## 📊 GraphQL API Reference

### Mutations


```graphql
# Authentication
tokenAuth(username: String!, password: String!): ObtainJSONWebToken
refreshToken(refreshToken: String): Refresh
verifyToken(token: String): Verify

# User Management
createUser(
  email: String!
  firstName: String
  lastName: String
  password: String!
  role: String
  username: String
): CreateUser

updateUser(
  email: String
  firstName: String
  lastName: String
  password: String
  role: String
): UpdateUser

deleteUser: DeleteUser

# Product Management
createProduct(
  categoryId: Int!
  certificateNumber: Int
  description: String!
  finalVerdict: String
  isoCertificate: Upload
  isoFound: Boolean = false
  issuer: String
  name: String!
  ownerId: ID
  productImage: Upload
  trustScore: Int = 0
): CreateProduct

updateProduct(
  categoryId: Int
  certificateNumber: Int
  description: String
  finalVerdict: String
  id: ID!
  isoCertificate: Upload
  isoFound: Boolean = false
  issuer: String
  name: String
  ownerId: ID
  productImage: Upload
  trustScore: Int = 0
): UpdateProduct

deleteProduct(id: ID!): DeleteProduct

# Category Management
createCategory(
  description: String!
  name: String!
): CreateCategory

updateCategory(
  description: String
  id: ID!
  name: String
): UpdateCategory

deleteCategory(id: ID!): DeleteCategory

# Certificate Verification
verifyCertificate(file: Upload!): CertificateResult

# Q&A
askQuestion(question: String!): AskQuestion

```

### Queries

```graphql
# User Information
me: UserType

# Categories
allCategories: [CategoryType]
categoryById(id: Int!): CategoryType

# Products
allProducts: [ProductType]
productById(id: Int!): ProductType
productByCategory(categoryId: Int!): ProductType

```

## 📊 System Workflow


```mermaid
flowchart TD
    subgraph Users
        M[Manufacturer] 
        B[Brander]
        W[Wholesaler]
    end
    
    subgraph Platform["ReBrandX Platform"]
        subgraph Frontend
            UI[User Interface]
            AR[AR Product Viewer]
            Chat[AI Support Assistant]
        end
        
        subgraph Backend
            API[GraphQL API]
            Auth[Authentication]
            OCR[ISO Certificate OCR]
            Meet[Video Meeting System]
        end
        
        subgraph Database
            Products[(Products)]
            Categories[(Categories)]
            Users[(User Profiles)]
            Bids[(Bids)]
        end
    end
    
    %% User interactions
    M -->|List Products| API
    M -->|Upload Certificates| OCR
    B -->|Rebrand Products| API
    B -->|Place Bids| API
    W -->|Bulk Purchase| API
    
    %% Frontend to Backend
    UI -->|GraphQL Queries| API
    AR -->|Fetch 3D Models| API
    Chat -->|Process Questions| API
    
    %% Backend processes
    API -->|Store/Retrieve| Database
    OCR -->|Verify Certificates| API
    Meet -->|Connect Users| API
    
    %% Authentication flow
    Users -->|Login/Register| Auth
    Auth -->|Validate| API
    
    %% Data relationships
    Products -->|Belong to| Categories
    Products -->|Owned by| Users
    Bids -->|Associated with| Products
```

## 👏 Acknowledgements
### 👥 Team Members & Contributions

**Antima:**

Backend Development, Database Architecture, Version Control Management

**Emmanuel:**

API Development, Integration Testing, Git Workflow Optimization

**Harshala:**

Frontend Design, User Experience, Responsive UI Implementation

**Rohit:**

React Component Development, State Management, Frontend Testing

**Omkar:**

AR/VR Implementation, WebXR Integration, 3D Model Optimization

**Yamini:**

OCR Engine for ISO Certificate Verification, AI-Based Support Assistant Development

