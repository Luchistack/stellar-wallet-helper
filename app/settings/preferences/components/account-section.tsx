'use client';

import React, { useState, useEffect } from 'react';
import { safeStorage } from '@/utils/safeStorage';

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

const STORAGE_KEY = 'stellopay.cookie.preferences';

export function AccountSection() {
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const saved = safeStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setPreferences({
          essential: true,
          analytics: Boolean(parsed.analytics),
          marketing: Boolean(parsed.marketing),
        });
      } catch {
        // Fallback on parse error
      }
    }
  }, []);

  const handleToggle = (key: 'analytics' | 'marketing') => {
    const updated = {
      ...preferences,
      [key]: !preferences[key],
    };
    setPreferences(updated);
    safeStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return (
    <section aria-labelledby="cookie-preferences-heading" className="space-y-6">
      <div>
        <h2 id="cookie-preferences-heading" className="text-lg font-medium text-foreground">
          Cookie Preferences
        </h2>
        <p className="text-sm text-muted-foreground">
          Manage your granular consent settings for cookies and tracking technologies.
        </p>
      </div>
      <div className="space-y-4 rounded-lg border border-border p-4 bg-card">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-foreground" htmlFor="essential-cookies">
              Essential Cookies
            </label>
            <p className="text-xs text-muted-foreground">
              Required for basic site functionality, security, and network routing. Cannot be disabled.
            </p>
          </div>
          <input
            id="essential-cookies"
            type="checkbox"
            checked={true}
            disabled
            aria-label="Essential Cookies (Required)"
            className="h-4 w-4 rounded border-border text-primary focus:ring-primary disabled:opacity-50"
          />
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            <label className="text-sm font-medium text-foreground" htmlFor="analytics-cookies">
              Analytics Cookies
            </label>
            <p className="text-xs text-muted-foreground">
              Help us understand how visitors interact with our platform to improve user experience.
            </p>
          </div>
          <input
            id="analytics-cookies"
            type="checkbox"
            checked={preferences.analytics}
            onChange={() => handleToggle('analytics')}
            aria-label="Analytics Cookies"
            className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
          />
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            <label className="text-sm font-medium text-foreground" htmlFor="marketing-cookies">
              Marketing Cookies
            </label>
            <p className="text-xs text-muted-foreground">
              Used to deliver relevant advertisements and track campaign performance.
            </p>
          </div>
          <input
            id="marketing-cookies"
            type="checkbox"
            checked={preferences.marketing}
            onChange={() => handleToggle('marketing')}
            aria-label="Marketing Cookies"
            className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
          />
        </div>
      </div>
    </section>
  );
}
