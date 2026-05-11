import React, { useState } from 'react';
import { cn } from '../lib/utils';

export default function Logo({ className = "", light = false, iconOnly = false }: { className?: string, light?: boolean, iconOnly?: boolean }) {
  const [imageError, setImageError] = useState(false);
  const primaryColor = light ? "white" : "#1B6FC8";
  const secondaryColor = "#2DC84A";
  
  // Using the local logo file from the public folder
  const logoUrl = "/logo.png";

  return (
    <div className={cn("flex items-center transition-all", className)}>
      {!imageError ? (
        <img 
          src={logoUrl} 
          alt="Clarks Financials Limited" 
          className={cn(
            "object-contain transition-all h-auto",
            iconOnly ? "h-8 md:h-10" : "h-11 md:h-14 lg:h-16"
          )} 
          onError={() => setImageError(true)}
          referrerPolicy="no-referrer"
          style={{ 
            filter: light ? 'brightness(0) invert(1)' : 'none'
          }}
        />
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
              strokeWidth="10" 
              strokeLinecap="round" 
            />
            <path 
              d="M85 20C95 35 90 70 80 85" 
              stroke={secondaryColor} 
              strokeWidth="10" 
              strokeLinecap="round" 
            />
          </svg>
          {!iconOnly && (
            <div className={`font-headline font-bold uppercase tracking-tight text-lg md:text-xl leading-none ${light ? 'text-white' : 'text-primary'}`}>
              Clarks Financials Limited
            </div>
          )}
        </div>
      )}
    </div>
  );
}
