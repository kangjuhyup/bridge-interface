import React from 'react';
import nav_logo from '../images/nav_logo.svg';
import swap from '../images/swap.svg';
import MCW from '../images/MCW.svg';
import UsePAY from '../images/UsePAY.svg';
import unicorn from '../images/unicorn.svg';
import team from '../images/team.svg';
import Whitepaper from '../images/Whitepaper.svg';
import '../App.css';

const Header = () => (
    <nav id="navbar" className="navbar nav-menu">
    <ul>
      <li><a href="https://mycoldwalletnow.wpcomstaging.com/htdocs/wp-content/dfmecoHP/index.html" className="nav-link scrollto active"><img src={nav_logo} alt="" className="nav_logo"/><span>Home</span></a></li>
      <li><a href="#!" className="nav-link scrollto"><img src={swap}alt="" className="nav_swap"/><span>Swap</span></a></li>
      <li><a href="https://mycoldwalletnow.wpcomstaging.com/htdocs/wp-content/dfmecoHP/MCW.html" className="nav-link scrollto"><img src={MCW} alt="" className="nav_MCW"/><span>MCW</span></a></li>
      <li><a href="https://mycoldwalletnow.wpcomstaging.com/htdocs/wp-content/dfmecoHP/USEPAY.html" className="nav-link scrollto"><img src={UsePAY} alt="" className="nav_USEPAY"/><span>UsePAY</span></a></li>
      <li><a href="https://mycoldwalletnow.wpcomstaging.com/htdocs/wp-content/dfmecoHP/Unicorn.html" className="nav-link scrollto"><img src={unicorn} alt="" className="nav_Unicorn"/><span>Unicorn Inv.</span></a></li>
      <li><a href="https://mycoldwalletnow.wpcomstaging.com/htdocs/wp-content/dfmecoHP/team.html" className="nav-link scrollto"><img src={team} alt="" className="nav_team"/><span>Team</span></a></li>
      <li><a href="https://mycoldwalletnow.wpcomstaging.com/htdocs/wp-content/dfmecoHP/WhitePaper.html" className="nav-link scrollto"><img src={Whitepaper} alt="" className="nav_Whitepaper"/><span>White Paper</span></a></li>
    </ul>
  </nav>
)

export default Header;