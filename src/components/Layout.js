import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children, title = 'Rasi Foundation', description = 'Empowering minds! Igniting future! - Career Guidance & Education Consultancy' }) => {
  return (
    <>
      <Head>
        <title>{title} | Rasi Foundation</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="career guidance, education consultancy, MBBS, engineering, MBA, law, Tamil Nadu, Rasipuram" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
