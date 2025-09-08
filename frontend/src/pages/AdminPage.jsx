import Header from "../components/Header";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ShowPoints from "../components/ShowPoints";
import Content from "../components/Content";

export default function AdminPage({ user, onLogout }) {
    console.log('AdminPage user:', user); // Debug

    return (
        <div className="layout">
            <Header adminlogo={true} user={user} onLogout={onLogout}/>
            <Navbar bottomContent="Highscore"/>
            <Content />
            <ShowPoints adminAdd={true}/>
            <Footer />
        </div>
    );
}