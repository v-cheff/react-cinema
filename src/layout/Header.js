import './Header.css';

function Header() {
  return(
    <div className="header">
      <div className="wrap-header">
        <div className="logo">Video</div>
        <div className="right">
          <div className="tel">+7 909 555-22-33</div>
          <div className="email">
            video@mail.com
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header;