import Header from "../components/Header";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Content from "../components/Content";
import ShowPoints from "../components/ShowPoints";


export default function GamePage() {

    return (
        <div className="layout">
            <Header adminlogo={false}/>
            <Navbar bottomContent="Highscore"/>
            <Content />
            <ShowPoints />
            <Footer />


        </div>
    )

}