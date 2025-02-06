import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLink } from 'react-icons/fa';
import { IoHome, IoMail, IoPerson, IoBriefcase } from 'react-icons/io5';
import styles from './sidebar.module.css'
import { useWindowSize } from '../../hooks';
import { socialsLinks } from '../../data';
// import logo from '../../assets/VectorNF.svg';
// import 'antd/dist/reset.css';
import { Switch, ConfigProvider  } from 'antd';
import { FireFilled, ThunderboltFilled } from '@ant-design/icons';
import LogoSVG from '../logo/Logo';



interface Props {
  activeSection: 0 | 1 | 2 | 3;
  moveToSection: (section: string) => void;
  toogleTheme: () => void
  themeState: boolean
}

const Nav = ({activeSection, moveToSection, toogleTheme, themeState}: Props) => {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { width } = useWindowSize(); // Используем ширину экрана из хука

  useEffect(() => {
    setIsOpen(false);
  }, [width, activeSection]);

  // Определяем размер иконок в зависимости от ширины экрана
  const iconSize = width > 1050 ? 35 : width > 440 ? 30 : 25;
  const iconSotialSize = width > 1050 ? 25 : 20;
  const linksBlockWidth = width > 1050 ? 250 : width > 550 ? 220 : 180;

  const switchTheme = {
    token: {
      colorPrimary: '#00a553d8', // Основной цвет для включенного состояния
    },
  };


  return (
    
    <nav className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <a href="#" >
          <LogoSVG />
        </a>
      </div>
      <ConfigProvider theme={switchTheme}>
        <div className={styles.switchWrapper}>
          <Switch
            checkedChildren={<FireFilled />}
            unCheckedChildren={<ThunderboltFilled />}
            className={styles.switch}
            style={{ transform: 'initial'}}
            value={themeState}
            onClick={() => toogleTheme()}
          />
        </div>
      </ConfigProvider>
      <div className={styles.menu}>
        <a className={styles.link} href="#" onClick={() => moveToSection('home')}>
          <span className={styles.linkIcon}>
            <IoHome size={iconSize} color={activeSection === 0 ? '#00ff7f' : 'inherit'}/>
          </span>
          <span className={styles.linkText}>
            Home
          </span>
        </a>
        <a className={styles.link} href="#" onClick={() => moveToSection('about')}>
          <span className={styles.linkIcon}>
            <IoPerson size={iconSize} color={activeSection === 1 ? '#00ff7f' : 'inherit'} />
          </span>
          <span className={styles.linkText}>
            About
          </span>
        </a>
        <a className={styles.link} href="#" onClick={() => moveToSection('projects')}>
          <span className={styles.linkIcon}>
            <IoBriefcase size={iconSize} color={activeSection === 2 ? '#00ff7f' : 'inherit'}/>
          </span>
          <span className={styles.linkText}>
            Projects
          </span>
        </a>
        <a className={styles.link} href="#" onClick={() => moveToSection('contact')}>
          <span className={styles.linkIcon}>
            <IoMail size={iconSize} color={activeSection === 3 ? '#00ff7f' : 'inherit'}/>
          </span>
          <span className={styles.linkText}>
            Contact
          </span>
        </a>
      </div>
      <div className={styles.resume}>
        <a
          className={styles.resumeLink}
          href='documents/CV_Nikita_Frolov.pdf'
          download='Frolov Nikita Resume'
        >
          RESUME
        </a>
        <div className={styles.sotialsToolBar}>
          <div className={styles.sotialsBarToogler} onClick={() => setIsOpen(!isOpen)}>
            <FaLink size={iconSotialSize}/>
            Socials
          </div>
          <motion.div
            className={styles.sotials}
            
            animate={{ opacity: isOpen ? 1 : 0.5, width: isOpen ? linksBlockWidth : 10, paddingLeft: isOpen ? 16 : 0, paddingRight: isOpen ? 16 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <AnimatePresence>
              {isOpen && (
                <motion.div
                key="socialLinks"
                className={styles.sotialsWrapper}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3 }}
              >
                  {socialsLinks.map((social) => (
                    <motion.a key={social.id} href={social.link} target="_blank" style={{width: iconSize, height: iconSize}} animate={{ opacity: isOpen ? 1 : 0 }} transition={{ duration: 0.3}}>
                      {social.iconFunc(iconSize)}
                    </motion.a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </nav>

  )
}

export default Nav