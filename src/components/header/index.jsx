import React, { useState } from "react";
import { FaCar } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";

import { FaAngleDown } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import Button from "../Button";
import { MdMenu } from "react-icons/md";
import { MdOutlineClose } from "react-icons/md";


import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount, useReadContract, useWriteContract } from "wagmi";

const Header = () => {
  const [open1, setOpen1] = useState(false);
  const [holdersDropdownOpen, setHoldersDropdownOpen] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();
  const isActive = (route) => location.pathname.includes(route);

  const handleNavigate = (path, sectionId) => {
    navigate(path);
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 0);
  };



  const { open, close } = useWeb3Modal()
  const { isConnected,isDisconnected,chain,address } = useAccount()



  const openPdfInNewTab = () => {
    const pdfUrl = require("../../assets/images/EBM Whitepaper.pdf");
    window.open(pdfUrl, "_blank");
  };


  
  return (
    <nav className="tw-px-4 tw-top-0 tw-z-20">
      <div className="tw-flex tw-items-center tw-font-medium  tw-h-36  tw-container tw-mx-auto tw-justify-between">
        <div className=" tw-flex tw-items-center tw-gap-2">
          <img
            src={require("../../assets/images/logo.png")}
            className="tw-object-contain "
            alt="Logo"
          />
      
        </div>
    
        <ul className="lg:tw-flex tw-hidden tw-items-center tw-gap-6 tw-font-[Poppins]">
        <li>
            <Link
              to={"https://diamondreserve.xyz/"} 
              onClick={() => setOpen1(false)}
              className="tw-text-white tw-text-sm tw-font-bold"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
                 to={"https://diamondreserve.xyz/#token-details"} 
            
              className="tw-text-white tw-text-sm   tw-font-bold"
            >
              Token Details
            </Link>
          </li>
          {/* <li>
            <Link
                 to={"#"} 
              onClick={() => setOpen1(false)}
              className="tw-text-white  tw-text-sm  tw-font-bold"
            >
              Details
            </Link>
          </li> */}
          <li>
            <Link
               to={"https://diamondreserve.xyz/#roadmap"} 
              onClick={() => setOpen1(false)}
              className="tw-text-white tw-text-sm   tw-font-bold"
            >
              Roadmap
            </Link>
          </li>
          <li>
            <Link
                  to={"https://diamondreserve.xyz/dmdr-mega-rewards/"} 
              onClick={() => setOpen1(false)}
              className="tw-text-white   tw-text-sm  tw-font-bold"
            >
              Mega Rewards
            </Link>
          </li>
          <li>
            <Link
                to={"https://diamondreserve.xyz/redeem/"} 
              onClick={() => setOpen1(false)}
              className="tw-text-white  tw-text-sm  tw-font-bold"
            >
              Redeem
            </Link>
          </li>
          <li>
            <Link
                  to={"https://diamondreserve.xyz/#faq"} 
              onClick={() => setOpen1(false)}
              className="tw-text-white tw-text-sm   tw-font-bold"
            >
              FAQ
            </Link>
          </li>
          <li>
            <Link
                  to={"https://diamondreserve.xyz/blogs"} 
              onClick={() => setOpen1(false)}
              className="tw-text-white tw-text-sm   tw-font-bold"
            >
              News
            </Link>
          </li>
          <li>
            <Link
                to={"https://diamondreserve.xyz/whitepaper/"} 
              onClick={() => setOpen1(false)}
              className="tw-text-white  tw-text-sm  tw-font-bold"
            >
              Whitepaper
            </Link>
          </li>
          
        </ul>

        <div className="md:tw-block tw-hidden">
         

          <button className=" tw-px-6 tw-text-center tw-rounded-lg tw-py-3 tw-font-poppins   tw-font-bold  tw-flex tw-items-center tw-justify-center tw-gap-1  tw-text-sm tw-bg-[#8DE1E4] tw-text-black"
            onClick={() => open()} 

          >{!isConnected?("Connect Wallet"):(address.slice(0,4)+"...."+address.slice(39,42))}</button>
        </div>

        <div
          className="tw-text-3xl lg:tw-hidden  tw-z-50"
          onClick={() => setOpen1(!open1)}
        >
          {open1 ? <MdOutlineClose color="white" /> : <MdMenu color="white" />}
        </div>

        {/* Mobile nav */}
        <div
          className={`
            lg:tw-hidden    tw-bg-cover  bg-black tw-z-40 tw-fixed tw-w-full tw-top-0 tw-overflow-y-auto tw-bottom-0 tw-leading-10 tw-py-10 
            tw-duration-500 ${open1 ? "tw-left-0" : "tw-left-[-100%]"}
          `}
        >
         
          <div className="tw-pb-5 tw-pt-2 tw-px-8">
          <div className=" tw-flex tw-items-center tw-gap-2">
          <img
            src={require("../../assets/images/logo.png")}
            className="tw-object-contain"
            alt="Logo"
          />
        </div>
          </div>

          <ul className="tw-p-0 tw-relative tw-px-9 tw-pt-3 tw-border-t">
          <li>
            <Link
                 to={"https://diamondreserve.xyz/"} 
              onClick={() => setOpen1(false)}
              className="tw-text-white tw-text-sm tw-font-bold"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
                 to={"https://diamondreserve.xyz/#token-details"} 
           
              className="tw-text-white tw-text-sm   tw-font-bold"
            >
              Token Details

            </Link>
          </li>

          <li>
            <Link
                   to={"https://diamondreserve.xyz/#roadmap"} 
              onClick={() => setOpen1(false)}
              className="tw-text-white tw-text-sm   tw-font-bold"
            >
              Roadmap
            </Link>
          </li>
          <li>
            <Link
                  to={"https://diamondreserve.xyz/dmdr-mega-rewards/"} 
              onClick={() => setOpen1(false)}
              className="tw-text-white   tw-text-sm  tw-font-bold"
            >
              Mega Rewards
            </Link>
          </li>
          <li>
            <Link
                   to={"https://diamondreserve.xyz/redeem/"} 
              onClick={() => setOpen1(false)}
              className="tw-text-white  tw-text-sm  tw-font-bold"
            >
              Redeem
            </Link>
          </li>
          <li>
            <Link
                  to={"https://diamondreserve.xyz/#faq"} 
              onClick={() => setOpen1(false)}
              className="tw-text-white tw-text-sm   tw-font-bold"
            >
              FAQ 
            </Link>
          </li>
          <li>
            <Link
                  to={"https://diamondreserve.xyz/blogs"} 
              onClick={() => setOpen1(false)}
              className="tw-text-white tw-text-sm   tw-font-bold"
            >
              News
            </Link>
          </li>
          <li>
            <Link
                   to={"https://diamondreserve.xyz/whitepaper/"} 
              onClick={() => setOpen1(false)}
              className="tw-text-white  tw-text-sm  tw-font-bold"
            >
              Whitepaper
            </Link>
          </li>
          <li className=" tw-pt-7">
          <button className=" tw-px-6 tw-text-center tw-rounded-lg tw-py-3   tw-font-bold  tw-flex tw-items-center tw-justify-center tw-gap-1  tw-text-sm tw-bg-[#8DE1E4] tw-text-black" 
                      onClick={() => open()} 

          >{!isConnected?("Connect Wallet"):(address.slice(0,4)+"...."+address.slice(39,42))}</button>

          </li>
          </ul>
          
        </div>
      </div>
    </nav>
  );
};

export default Header;
