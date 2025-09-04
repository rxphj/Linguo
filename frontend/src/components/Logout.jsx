
export default function Logout({ stompClient, onLogout }) {

  const handleLogout = () => {
    if (stompClient) {
      stompClient.deactivate();
    }

    if(onLogout){
      onLogout();
    }
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
}


