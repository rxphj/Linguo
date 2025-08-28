import Header from "../components/Header";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ShowPoints from "../components/ShowPoints";
import Content from "../components/Content";


export default function AdminPage() {

    return (
        <div className="layout">
            <Header adminlogo={true}/>
            <Navbar bottomContent="Highscore"/>
            <Content />
            <ShowPoints />
            <Footer />


        </div>
    )

}