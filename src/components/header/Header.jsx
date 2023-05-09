import "./header.css";
import Logo from "../logo/Logo";

const Header = () => {
  return (
    <header className="header">
      <Logo />
      <h1 className="main-title">Email Templater</h1>
    </header>
  );
};

export default Header;
