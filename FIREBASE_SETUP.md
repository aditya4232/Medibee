# MediBee Firebase Setup Guide

## Overview
This guide covers the complete setup for MediBee with Firebase integration, local development server, and Firebase hosting.

## Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase CLI tools

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
The app will be available at: `http://localhost:8080/`

## 🔥 Firebase Configuration

### Current Firebase Project Details
- **Project ID**: `medibee-1`
- **Auth Domain**: `medibee-1.firebaseapp.com`
- **Storage Bucket**: `medibee-1.firebasestorage.app`

### Firebase Services Configured
- ✅ **Firestore Database** - For session and user data storage
- ✅ **Firebase Storage** - For file uploads
- ✅ **Firebase Analytics** - For user tracking
- ✅ **Firebase Hosting** - For web deployment

## 📊 Session Data Storage

### What Gets Stored in Firebase
When a user starts a session, the following data is automatically stored in Firestore:

```javascript
{
  sessionId: "session_timestamp_randomId",
  ipAddress: "user's IP",
  location: "user's location",
  deviceInfo: "device type - browser",
  startTime: "ISO timestamp",
  visitedPages: ["array of visited pages"],
  userActivities: [
    {
      timestamp: "ISO timestamp",
      action: "action type",
      page: "current page",
      details: "additional data"
    }
  ],
  userData: {
    medicalRecords: [],
    searchHistory: [],
    userName: "Guest User or provided name",
    preferences: {}
  },
  isActive: true,
  lastActivity: "ISO timestamp"
}
```

### Tracked Activities
- Session start/end
- Page visits
- Medical record additions
- Search queries
- User data updates
- Username changes

## 🛠️ Firebase CLI Setup

### 1. Install Firebase CLI
```bash
npm install -g firebase-tools
```

### 2. Login to Firebase
```bash
firebase login
```

### 3. Initialize Firebase (if needed)
```bash
firebase init
```

## 🌐 Firebase Hosting

### Deploy to Firebase Hosting
```bash
# Build and deploy
npm run firebase:deploy

# Or manually
npm run build
firebase deploy
```

### Local Firebase Hosting Preview
```bash
npm run firebase:serve
```

### Firebase Emulators (for testing)
```bash
npm run firebase:emulators
```

## 🔒 Firestore Security Rules

Current rules allow read/write access until June 29, 2025:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if
          request.time < timestamp.date(2025, 6, 29);
    }
  }
}
```

## 📁 Project Structure

```
medibee/
├── src/
│   ├── lib/
│   │   └── firebase.ts          # Firebase configuration
│   ├── components/
│   │   └── SessionProvider.tsx  # Session management
│   └── ...
├── firebase.json                # Firebase hosting config
├── .firebaserc                  # Firebase project config
├── firestore.rules             # Firestore security rules
├── firestore.indexes.json      # Firestore indexes
└── .env.local                  # Environment variables
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run firebase:deploy` - Build and deploy to Firebase
- `npm run firebase:serve` - Preview Firebase hosting locally
- `npm run firebase:emulators` - Start Firebase emulators

## 🐛 Troubleshooting

### Common Issues

1. **Firebase not connecting**
   - Check if Firebase config is correct in `src/lib/firebase.ts`
   - Ensure Firestore database is created in Firebase Console

2. **Session data not saving**
   - Check browser console for Firebase errors
   - Verify Firestore rules allow write access

3. **Build errors**
   - Run `npm install` to ensure all dependencies are installed
   - Check for TypeScript errors

## 📱 Testing Session Storage

1. Open the app in browser
2. Start a new session (should happen automatically)
3. Navigate between pages
4. Check Firebase Console > Firestore Database > sessions collection
5. Verify session data is being stored and updated

## 🚀 Production Deployment

1. Build the project: `npm run build`
2. Deploy to Firebase: `firebase deploy`
3. Your app will be available at: `https://medibee-1.firebaseapp.com`

## 📞 Support

For issues with Firebase setup or deployment, check:
- Firebase Console: https://console.firebase.google.com/
- Firebase Documentation: https://firebase.google.com/docs
- Project logs in Firebase Console
