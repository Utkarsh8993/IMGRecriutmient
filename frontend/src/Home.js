import Nav from "./Nav";

import Footer from "./Footer";
import About from "./About";
import Team from "./Team";

const Home = () => {
    return(
        <div className="Home">
            <Nav />
            <About />
            <Team />
            <Footer />
        </div>
    )
}

export default Home