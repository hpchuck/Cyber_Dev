/**
 * Analytics and Performance Monitoring Utilities
 * Tracks user interactions, page performance, and component rendering metrics
 */

interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
  url: string;
}

interface UserInteraction {
  type: string;
  element: string;
  timestamp: number;
  url: string;
}

class Analytics {
  private static instance: Analytics;
  private metrics: PerformanceMetric[] = [];
  private interactions: UserInteraction[] = [];
  private isEnabled: boolean = true;

  private constructor() {
    this.setupPerformanceObserver();
    this.setupInteractionTracking();
  }

  public static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics();
    }
    return Analytics.instance;
  }

  private setupPerformanceObserver() {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

    try {
      // Track Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const lcpEntry = entry as any; // LCP entry type
          this.recordMetric('LCP', entry.startTime, lcpEntry.url || window.location.href);
        }
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // Track First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const fidEntry = entry as any; // FID entry type
          this.recordMetric('FID', fidEntry.processingStart - entry.startTime, fidEntry.url || window.location.href);
        }
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Track Cumulative Layout Shift (CLS)
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0;
        for (const entry of list.getEntries()) {
          const clsEntry = entry as any; // CLS entry type
          if (!clsEntry.hadRecentInput) {
            clsValue += clsEntry.value;
          }
        }
        if (clsValue > 0) {
          this.recordMetric('CLS', clsValue, window.location.href);
        }
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });

      // Track Navigation Timing
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          if (perfData) {
            this.recordMetric('DOM_LOAD', perfData.domContentLoadedEventEnd - perfData.fetchStart, window.location.href);
            this.recordMetric('WINDOW_LOAD', perfData.loadEventEnd - perfData.fetchStart, window.location.href);
            this.recordMetric('TTFB', perfData.responseStart - perfData.requestStart, window.location.href);
          }
        }, 0);
      });
    } catch (error) {
      console.warn('Performance monitoring setup failed:', error);
    }
  }

  private setupInteractionTracking() {
    if (typeof window === 'undefined') return;

    // Track button clicks
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.closest('button')) {
        const button = target.tagName === 'BUTTON' ? target : target.closest('button');
        this.recordInteraction('button_click', button?.textContent?.trim() || 'unknown', window.location.href);
      }
    });

    // Track section visibility (scroll tracking)
    if ('IntersectionObserver' in window) {
      const sections = ['home', 'projects', 'skills', 'experience', 'testimonials', 'pricing', 'contact'];
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            this.recordInteraction('section_view', entry.target.id || 'unknown', window.location.href);
          }
        });
      }, { threshold: 0.5 });

      sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) observer.observe(element);
      });
    }

    // Track form submissions
    document.addEventListener('submit', (event) => {
      const form = event.target as HTMLFormElement;
      const formName = form.getAttribute('name') || form.id || 'unknown_form';
      this.recordInteraction('form_submit', formName, window.location.href);
    });
  }

  private recordMetric(name: string, value: number, url: string) {
    if (!this.isEnabled) return;

    const metric: PerformanceMetric = {
      name,
      value,
      timestamp: Date.now(),
      url
    };

    this.metrics.push(metric);
    
    // Keep only last 100 metrics to prevent memory leaks
    if (this.metrics.length > 100) {
      this.metrics = this.metrics.slice(-100);
    }

    // Log important metrics to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`📊 Performance Metric: ${name} = ${value.toFixed(2)}ms`);
    }
  }

  private recordInteraction(type: string, element: string, url: string) {
    if (!this.isEnabled) return;

    const interaction: UserInteraction = {
      type,
      element,
      timestamp: Date.now(),
      url
    };

    this.interactions.push(interaction);

    // Keep only last 200 interactions
    if (this.interactions.length > 200) {
      this.interactions = this.interactions.slice(-200);
    }

    // Log interactions in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`🖱️ User Interaction: ${type} on ${element}`);
    }
  }

  public getMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }

  public getInteractions(): UserInteraction[] {
    return [...this.interactions];
  }

  public getPerformanceSummary() {
    const summary = {
      totalInteractions: this.interactions.length,
      performanceMetrics: {} as Record<string, { avg: number; count: number; latest: number }>
    };

    // Calculate performance metric averages
    this.metrics.forEach(metric => {
      if (!summary.performanceMetrics[metric.name]) {
        summary.performanceMetrics[metric.name] = { avg: 0, count: 0, latest: 0 };
      }
      
      const existing = summary.performanceMetrics[metric.name];
      existing.count += 1;
      existing.avg = (existing.avg * (existing.count - 1) + metric.value) / existing.count;
      existing.latest = metric.value;
    });

    return summary;
  }

  public exportData() {
    return {
      metrics: this.metrics,
      interactions: this.interactions,
      summary: this.getPerformanceSummary(),
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };
  }

  public enable() {
    this.isEnabled = true;
  }

  public disable() {
    this.isEnabled = false;
  }

  public clearData() {
    this.metrics = [];
    this.interactions = [];
  }
}

// Export singleton instance
export const analytics = Analytics.getInstance();

// Export utility functions
export const trackCustomEvent = (name: string, data?: any) => {
  (analytics as any).recordInteraction('custom_event', `${name}: ${JSON.stringify(data)}`, window.location.href);
};

export const trackPageLoad = () => {
  (analytics as any).recordInteraction('page_load', window.location.pathname, window.location.href);
};

export const trackComponentRender = (componentName: string, renderTime: number) => {
  (analytics as any).recordMetric(`${componentName}_render`, renderTime, window.location.href);
};

// React Hook for performance tracking
export const usePerformanceTracking = (componentName: string) => {
  const startTime = performance.now();
  
  return {
    finish: () => {
      const endTime = performance.now();
      trackComponentRender(componentName, endTime - startTime);
    }
  };
};
