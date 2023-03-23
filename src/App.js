import './App.css';




async function createJWT() {
  if (!window.arConnect || !window.arConnect.isArConnectInstalled) {
    // AR Connect is not installed
    console.log('AR Connect is not installed');
    return;
  }

  try {
    // Get the selected address from AR Connect
    const selectedAddress = await window.arConnect.getSelectedAddress();

    console.log('Selected address:', selectedAddress);
  } catch (error) {
    console.error('Error getting selected address:', error);
  }
}




function App() {
  const handleClick = () => {
    createJWT();
  };

  return (
    <div className="App">
      <button onClick={handleClick}>Create JWT</button>
    </div>
  );
}

export default App;
