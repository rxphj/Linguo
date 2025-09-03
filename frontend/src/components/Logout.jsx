
export default function Logout({ stompClient }) {

  const handleLogout = () => {
    if (stompClient) {
      stompClient.disconnect();
    }
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
}


