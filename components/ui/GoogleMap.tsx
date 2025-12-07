'use client';

import React from 'react';
import { MapPin } from 'lucide-react';
import { landingPageContent } from '@/lib/constants';

interface GoogleMapProps {
  className?: string;
}

/**
 * Google Maps component displaying office location
 * Uses Google Maps embed iframe for simple, reliable map display
 */
export function GoogleMap({ className = '' }: GoogleMapProps) {
  const address = landingPageContent.contactDetails?.address.fullAddress || '7155 120 Street, Delta, BC V4E 2B1';
  const encodedAddress = encodeURIComponent(address);
  
  // Generate Google Maps embed URL
  const mapEmbedUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_API_KEY || ''}&q=${encodedAddress}`;
  
  // Fallback Google Maps search URL
  const mapSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  
  // If API key is available, use embed. Otherwise, show fallback with link
  if (apiKey) {
    return (
      <div className={`w-full rounded-lg overflow-hidden ${className}`}>
        <iframe
          src={mapEmbedUrl}
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full"
          title={`${address} - Office Location`}
        />
      </div>
    );
  }

  // Fallback when API key is not available
  return (
    <div className={`w-full h-[400px] bg-gray-100 rounded-lg overflow-hidden relative ${className}`}>
      <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
        <div className="text-center p-4 max-w-md">
          <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
          <p className="text-gray-700 mb-2 font-semibold">{address}</p>
          <p className="text-sm text-gray-500 mb-4">
            {landingPageContent.serviceAreas?.description || 'Serving families across British Columbia'}
          </p>
          <a
            href={mapSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Open in Google Maps
          </a>
          <p className="text-xs text-gray-400 mt-4">
            Google Maps API key not configured
          </p>
        </div>
      </div>
    </div>
  );
}
