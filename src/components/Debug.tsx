
export const Debug = () => {
  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%', 
      background: 'rgba(0,0,0,0.9)',
      color: 'white',
      zIndex: 10000,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Debug Screen</h1>
      <p>If you can see this, the React app is rendering correctly.</p>
      <button 
        style={{ 
          background: '#6366F1', 
          color: 'white', 
          border: 'none', 
          padding: '10px 20px', 
          borderRadius: '5px',
          marginTop: '20px',
          cursor: 'pointer'
        }}
        onClick={() => window.location.reload()}
      >
        Reload Page
      </button>
    </div>
  );
};
