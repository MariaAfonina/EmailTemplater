import Logo from "../Logo/Logo";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <Logo />
      <h1 className="main-title">Email Templater</h1>
    </header>
  );
};

export default Header;
