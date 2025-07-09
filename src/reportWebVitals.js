// Simple replacement for web-vitals to avoid dependency issues
const reportWebVitals = (onPerfEntry) => {
  // Optional: You can add simple performance logging here
  // For now, we'll just ignore it to avoid the missing dependency error
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    // Simple performance measurement without web-vitals dependency
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0];
      if (navigation) {
        onPerfEntry({
          name: 'page-load',
          value: navigation.loadEventEnd - navigation.loadEventStart
        });
      }
    }
  }
};

export default reportWebVitals;