import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, Activity, Users, Clock, X, Download } from 'lucide-react';
import { analytics } from '../utils/analytics';

interface PerformanceMonitorProps {
  isVisible: boolean;
  onClose: () => void;
}

export const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({ isVisible, onClose }) => {
  const [summary, setSummary] = useState(analytics.getPerformanceSummary());
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setSummary(analytics.getPerformanceSummary());
      setLastUpdate(Date.now());
    }, 2000);

    return () => clearInterval(interval);
  }, [isVisible]);

  const exportData = () => {
    const data = analytics.exportData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `performance-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getMetricColor = (metricName: string, value: number) => {
    const thresholds = {
      'LCP': { good: 2500, poor: 4000 },
      'FID': { good: 100, poor: 300 },
      'CLS': { good: 0.1, poor: 0.25 },
      'TTFB': { good: 800, poor: 1800 },
      'DOM_LOAD': { good: 1500, poor: 3000 },
      'WINDOW_LOAD': { good: 3000, poor: 5000 }
    };

    const threshold = thresholds[metricName as keyof typeof thresholds];
    if (!threshold) return 'text-blue-400';

    if (value <= threshold.good) return 'text-green-400';
    if (value <= threshold.poor) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          className="fixed right-4 top-4 z-50 w-80 bg-black/90 backdrop-blur-md border border-gray-700 rounded-lg p-4 text-white max-h-[80vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-400" />
              <h3 className="text-lg font-semibold">Performance Monitor</h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={exportData}
                className="p-1 hover:bg-gray-700 rounded transition-colors"
                title="Export Data"
              >
                <Download className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-700 rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {/* Summary Stats */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gray-800/50 rounded p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-4 h-4 text-blue-400" />
                  <span className="text-xs text-gray-400">Interactions</span>
                </div>
                <div className="text-lg font-bold text-blue-400">
                  {summary.totalInteractions}
                </div>
              </div>
              
              <div className="bg-gray-800/50 rounded p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-green-400" />
                  <span className="text-xs text-gray-400">Metrics</span>
                </div>
                <div className="text-lg font-bold text-green-400">
                  {Object.keys(summary.performanceMetrics).length}
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            {Object.keys(summary.performanceMetrics).length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Core Web Vitals & Performance
                </h4>
                <div className="space-y-2">
                  {Object.entries(summary.performanceMetrics).map(([name, data]) => (
                    <div key={name} className="bg-gray-800/30 rounded p-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-gray-300">{name}</span>
                        <span className={`text-xs font-bold ${getMetricColor(name, data.latest)}`}>
                          {data.latest.toFixed(1)}
                          {name === 'CLS' ? '' : 'ms'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Avg: {data.avg.toFixed(1)}{name === 'CLS' ? '' : 'ms'}</span>
                        <span>Count: {data.count}</span>
                      </div>
                      
                      {/* Visual indicator bar */}
                      <div className="mt-1 h-1 bg-gray-700 rounded overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-300 ${
                            getMetricColor(name, data.latest).includes('green') ? 'bg-green-400' :
                            getMetricColor(name, data.latest).includes('yellow') ? 'bg-yellow-400' :
                            getMetricColor(name, data.latest).includes('red') ? 'bg-red-400' : 'bg-blue-400'
                          }`}
                          style={{ width: `${Math.min(100, (data.latest / 5000) * 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Interactions */}
            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-2">Recent Interactions</h4>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {analytics.getInteractions().slice(-5).reverse().map((interaction, index) => (
                  <div key={index} className="text-xs bg-gray-800/30 rounded p-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">{interaction.type}</span>
                      <span className="text-gray-500">
                        {new Date(interaction.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="text-gray-400 truncate">{interaction.element}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-xs text-gray-500 text-center">
              Last updated: {new Date(lastUpdate).toLocaleTimeString()}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PerformanceMonitor;
