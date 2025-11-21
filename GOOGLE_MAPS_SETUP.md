# Google Maps API Setup Guide

This guide will help you set up Google Maps API for the E-Attendance application.

## Step 1: Get a Google Maps API Key

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - **Maps JavaScript API**
   - **Places API** (optional, for place search)
4. Go to "Credentials" → "Create Credentials" → "API Key"
5. Copy your API key

## Step 2: Configure the API Key

### Option 1: Environment Variable (Recommended)

Create a `.env` file in the root of your project:

```env
VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with your actual Google Maps API key.

### Option 2: Direct Configuration

Edit `src/config/googleMaps.js` and replace `'YOUR_API_KEY'` with your actual API key:

```javascript
export const GOOGLE_MAPS_API_KEY = 'your_api_key_here';
```

## Step 3: Restrict Your API Key (Important for Security)

1. In Google Cloud Console, go to "Credentials"
2. Click on your API key
3. Under "API restrictions", select "Restrict key"
4. Choose only these APIs:
   - Maps JavaScript API
   - Places API (if used)
5. Under "Application restrictions", set HTTP referrers:
   - Add `http://localhost:*` for development
   - Add your production domain for production

## Step 4: Test the Integration

1. Start your development server: `npm run dev`
2. Navigate to the Admin Geofencing page
3. The map should load showing Tai Solarin University of Education campus
4. You should see geofence circles and markers on the map

## Troubleshooting

### Map not loading
- Check browser console for errors
- Verify your API key is correct
- Ensure Maps JavaScript API is enabled
- Check API key restrictions aren't blocking your domain

### "Failed to load Google Maps" error
- Verify the API key is set correctly
- Check that the Maps JavaScript API is enabled in Google Cloud Console
- Ensure your API key has the correct permissions

## Features

- **Real-time Google Maps**: Satellite view of TASUED campus
- **Geofence Visualization**: Circles showing geofence boundaries
- **Interactive Markers**: Click markers to see hall details
- **Click to Set Location**: Click on map to set hall/geofence coordinates
- **Full CRUD Operations**: Create, edit, delete geofences and lecture halls

## Coordinates

The default center is set to Tai Solarin University of Education:
- Latitude: 6.5184
- Longitude: 3.3792
- Zoom Level: 17

You can adjust these in `src/config/googleMaps.js` if needed.

