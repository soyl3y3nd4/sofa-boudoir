import React, { useEffect, useState, useContext } from 'react';
import Head from 'next/head';

import {
  ScrollToTop,
  Footer,
  SocialMediaButtons,
  ResponsiveMenu,
} from '../components';

import styles from './layouts.module.scss';
import { TopBar } from '../components/topBar/TopBar';
import { UIContext } from '../contexts/UIContext/UIContext';

export const AppLayout = ({ children }) => {
  const { isLightBoxModalOpened } = useContext(UIContext);

  const [navScrolled, setNavScrolled] = useState(false);
  const [goTopScrolled, setGoTopScrolled] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    checkNavScroll();
    checkGoTopScroll();
  };

  const checkNavScroll = () => {
    if (window.scrollY > 200) {
      setNavScrolled(true);
    } else {
      setNavScrolled(false);
    }
  };

  const checkGoTopScroll = () => {
    if (window.scrollY > 800) {
      setGoTopScrolled(true);
    } else {
      setGoTopScrolled(false);
    }
  };

  return (
    <>
      <Head>
        <title>El Sofá Rojo Boudoir</title>
        <meta name="description" content="<El sofá rojo boudoir, fotografía íntima, sensual y romántica>" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      </Head>

      {/* TopBar Menu */}
      <TopBar styles={styles} navScrolled={navScrolled} />

      {/* Responsive Menu */}
      <ResponsiveMenu navScrolled={navScrolled} styles={styles} />

      {/* Sidebar Social Media Icons */}
      <SocialMediaButtons navScrolled={navScrolled} styles={styles} />

      <div className={styles.globalContainer}>
        {/* Contents */}
        <main className={styles.main}>
          {children}
        </main>

        {/* Go Top Button */}
        <ScrollToTop goTopScrolled={goTopScrolled} styles={styles} disabled={isLightBoxModalOpened} />

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};
