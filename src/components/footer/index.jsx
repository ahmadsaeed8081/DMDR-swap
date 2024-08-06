import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button";
import {
  FaFacebook,
  FaInstagram,
  FaTelegram,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="  tw-bg-black">
      <div className="container">
        <footer className=" tw-py-12">
          <div className="row g-4 ">
            <div className="col-md-3">
              <div className="  ">
                <div>
                  <img
                    src={require("../../assets/images/logo.png")}
                    className=""
                  />
                </div>
                <div className=" tw-pt-5">
                  <span className=" tw-text-white">
                    contact@diamondreserve.xyz
                  </span>

                  <div className=" tw-flex tw-items-center">
                    <div>
                      <img
                        src={require("../../assets/images/Bank-card-logo.png")}
                        alt=""
                      />
                    </div>
                    <div>
                      <img
                        src={require("../../assets/images/Apple-Pay.png")}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-2">
              <div>
                <h4 className=" tw-text-white tw-font-Sora   tw-text-2xl">FEATURES</h4>
                <ul className=" tw-leading-8 tw-pt-3 tw-p-0">
                <li>
            <Link
              to={"https://diamondreserve.xyz/"} 
              
              className="tw-text-white"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
                 to={"https://diamondreserve.xyz/#token-details"} 
            
              className="tw-text-white"
            >
              Token Details
            </Link>
          </li>
          {/* <li>
            <Link
                 to={"#"} 
              
              className="tw-text-white"
            >
              Details
            </Link>
          </li> */}
          <li>
            <Link
               to={"https://diamondreserve.xyz/#roadmap"} 
              
              className="tw-text-white"
            >
              Roadmap
            </Link>
          </li>
          <li>
            <Link
                  to={"https://diamondreserve.xyz/dmdr-mega-rewards/"} 
              
              className="tw-text-white "
            >
              Mega Rewards
            </Link>
          </li>
          <li>
            <Link
                to={"https://diamondreserve.xyz/redeem/"} 
              
              className="tw-text-white"
            >
              Redeem
            </Link>
          </li>
          <li>
            <Link
                  to={"https://diamondreserve.xyz/#faq"} 
              
              className="tw-text-white"
            >
              FAQ
            </Link>
          </li>
          <li>
            <Link
                  to={"https://diamondreserve.xyz/blogs"} 
              
              className="tw-text-white"
            >
              News
            </Link>
          </li>

                </ul>
              </div>
            </div>
            <div className="col-md-3">
              <div>
                <h4 className=" tw-text-white tw-font-Sora   tw-text-2xl">LEGAL INFO</h4>
                <ul className=" tw-leading-8 tw-pt-3 tw-p-0">
                  <li>
                    <Link to={"https://diamondreserve.xyz/privacy-policy/"}  className=" tw-text-white">
                      Privacy & Policy
                    </Link>
                  </li>
                  <li>
                    <Link to={"https://diamondreserve.xyz/terms-and-conditions/"}  className=" tw-text-white">
                      Terms&Conditions
                    </Link>
                  </li>
                  <li>
                    <Link to={"https://diamondreserve.xyz/whitepaper/"}  className=" tw-text-white">
                      Whitepaper
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-3">
              <div>
                <h4 className=" tw-text-white tw-font-Sora   tw-text-2xl">SIGN UP FOR UPDATES</h4>

                <div className=" tw-mt-2">
                  <input
                    placeholder="Email"
                    className=" tw-bg-transparent border tw-outline-none tw-text-white tw-rounded-md tw-w-full tw-p-3"
                  />
                </div>
                <Button
                  label={"Send"}
                  className={" tw-w-full tw-rounded-full tw-py-3.5 tw-mt-5"}
                />

                <ul className=" p-0 tw-flex tw-gap-2 tw-mt-7">
                  <li>
                    <Link to={"https://t.me/+0xydlKYkiBM5NWU0"} target="_blank" >
                      <div className=" tw-bg-[#414c54] tw-flex tw-items-center tw-justify-center tw-rounded-full tw-w-12 tw-h-12">
                        <FaTelegram color="white" />
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to={"https://www.youtube.com/channel/UCoUcaMOH47Ooq7pK5dTb9rg"} target="_blank" >
                      <div className=" tw-bg-[#414c54] tw-flex tw-items-center tw-justify-center tw-rounded-full tw-w-12 tw-h-12">
                        <FaYoutube color="white" />
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to={"https://twitter.com/dmdrtoken"} target="_blank" >
                      <div className=" tw-bg-[#414c54] tw-flex tw-items-center tw-justify-center tw-rounded-full tw-w-12 tw-h-12">
                        <FaTwitter color="white" />
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to={"https://www.instagram.com/dmdrtoken/"} target="_blank" >
                      <div className=" tw-bg-[#414c54] tw-flex tw-items-center tw-justify-center tw-rounded-full tw-w-12 tw-h-12">
                        <FaInstagram color="white" />
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to={"https://www.facebook.com/profile.php?id=61556289759305"} target="_blank" >
                      <div className=" tw-bg-[#414c54] tw-flex tw-items-center tw-justify-center tw-rounded-full tw-w-12 tw-h-12">
                        <FaFacebook color="white" />
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link to={"https://www.tiktok.com/@diamond.reserve"} target="_blank" >
                      <div className=" tw-bg-[#414c54] tw-flex tw-items-center tw-justify-center tw-rounded-full tw-w-12 tw-h-12">
                        <FaTiktok color="white" />
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>

        <footer className=" tw-py-4">
          <p className=" m-0 tw-text-white">
            Copyright © 2024 Diamond Reserve | All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
