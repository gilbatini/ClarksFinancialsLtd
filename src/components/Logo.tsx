import React, { useState } from 'react';

export default function Logo({ className = "", light = false, iconOnly = false }: { className?: string, light?: boolean, iconOnly?: boolean }) {
  const [imageError, setImageError] = useState(false);
  const primaryColor = light ? "white" : "#1B6FC8";
  const secondaryColor = "#2DC84A";
  
  // Using the latest provided Google Drive direct link for the logo (lh3 format is often more reliable)
  const logoUrl = "https://lh3.googleusercontent.com/d/1RyJV-6iFB24EHZaSEyx1BYzfFZTpC25Z";

  return (
    <div className={`flex items-center ${className}`}>
      {!imageError ? (
        <div className="flex items-center overflow-hidden">
          {iconOnly ? (
            <div className="w-10 h-10 overflow-hidden flex items-center justify-center">
              <img 
                src={logoUrl} 
                alt="Clarks Financials Icon" 
                className="h-10 w-auto max-w-none" 
                onError={() => setImageError(true)}
                referrerPolicy="no-referrer"
                style={{ 
                  filter: light ? 'brightness(0) invert(1)' : 'none',
                  objectFit: 'contain'
                }}
              />
            </div>
          ) : (
            <img 
              src={logoUrl} 
              alt="Clarks Financials Logo" 
              className="h-10 w-auto" 
              onError={() => setImageError(true)}
              referrerPolicy="no-referrer"
              style={{ filter: light ? 'brightness(0) invert(1)' : 'none' }}
            />
          )}
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <svg 
            width="40" 
            height="40" 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0"
          >
            <path 
              d="M20 25L50 85L80 25C70 20 30 20 20 25Z" 
              fill={primaryColor} 
            />
            <path 
              d="M15 20C5 35 10 70 20 85" 
              stroke={secondaryColor} 
              strokeWidth="6" 
              strokeLinecap="round" 
            />
            <path 
              d="M85 20C95 35 90 70 80 85" 
              stroke={secondaryColor} 
              strokeWidth="6" 
              strokeLinecap="round" 
            />
          </svg>
          {!iconOnly && (
            <div className={`font-headline font-black uppercase tracking-tighter text-lg md:text-xl leading-none ${light ? 'text-white' : 'text-primary'}`}>
              Clarks Financials
            </div>
          )}
        </div>
      )}
    </div>
  );
}
