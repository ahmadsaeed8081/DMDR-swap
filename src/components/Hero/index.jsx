import React, { useState, useEffect } from "react";
import Header from "../header";
import Button from "../Button";
import { LiaAngleDownSolid } from "react-icons/lia";
import Decimal from "decimal.js";
import { useLocation } from 'react-router-dom';
import moment from "moment";

import Web3 from "web3";
import {
  CopyToClipboard,
  PartnerIcon,
  CycleIcon,
} from "react-copy-to-clipboard";
import {
  cont_address,
  usdt_Address,
  dmdr_address,
  token_abi,
  cont_abi,
} from "../../configs/Contracts";
import { useNetwork, useSwitchChain } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";

import { useAccount, useDisconnect } from "wagmi";

import {
  useSimulateContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { mainnet, polygon } from "wagmi/chains";
import { writeContractMutationOptions } from "wagmi/query";
import { IoCopy } from "react-icons/io5";

const Hero = (props) => {
  const chainId =
    process.env.REACT_APP_ENV == "production" ? mainnet.id : polygon.id;

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isDropdownOpen1, setDropdownOpen1] = useState(false);


  const currencies = [
    { text: "USDT", imgSrc: require("../../assets/images/USDT.png") },
    { text: "DMDR", imgSrc: require("../../assets/images/dmand.png") },
  ];





  const { address, isConnecting, isDisconnected,isConnected } = useAccount();
  const { open, close } = useWeb3Modal();

  const { switchChainAsync } = useSwitchChain();
  const { chainId: currentChainId } = useAccount();
  const {
    status,
    writeContractAsync,
    writeContract,
    data: hash,
    ...states
  } = useWriteContract();

  const [count, set_count] = useState(0);

  const [payAmount, set_payAmount] = useState(0);
  const [receiveAmount, set_receiveAmount] = useState(0);

  const [activePayCurrency, setActivePayCurrency] = useState(currencies[0]);
  const [activeReceiveCurrency, setActiveReceiveCurrency] = useState(
    currencies[1]
  );


  const [withdrawAmount, set_withdrawAmount] = useState(0);
  const [ref_add, set_ref] = useState("0x0000000000000000000000000000000000000000");

  const [referralEarning, set_referralEarning] = useState(0);
  const [totalOrders, set_totalOrders] = useState(0);
  const [Directs, set_Directs] = useState(0);

  const [usdt_balance, set_usdt_balance] = useState(0);
  const [dmdr_balance, set_dmdr_balance] = useState(0);

  const [Minimum_withdraw, set_Minimum_withdraw] = useState(0);
  const [Du_price_in_usdt, set_Du_price_in_usdt] = useState(0);
  const [DuSell_price_in_usdt, set_DuSell_price_in_usdt] = useState(0);

  const [usdt_to_du_val, set_usdt_to_du] = useState(0);
  const [du_to_usdt_val, set_du_to_usdt] = useState(0);

  const [orderHistory, set_orderHistory] = useState([]);
  const [owner, set_owner] = useState(0);
  const [USDTAllowance, set_USDTAllowance] = useState(0);

  const [fee, set_fee] = useState(0);
  const [swap_fee, set_swap_fee] = useState(0);

  const [Expected_tokens, set_Expected_tokens] = useState(0);
 
  const [loader, setLoader] = useState(false);


  const [choosed_order, set_choosed_order] = useState(0);
  const [decision, set_decision] = useState(0);
  const [index_no, set_index_no] = useState(-1);

  const [col_on, set_col_on] = useState(0);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const temp_address = params.get("ref");

  useEffect(() => {
    if(isConnected)
    {
      get_Data();

    }
    if(temp_address!=null)
    {
      set_ref(temp_address)

    }
  },[address]);


  const count1 = (time) => {
    const now = new Date(time*1000);
  
    const t=moment(now).format('D MMM YYYY');
    return t;
    
  };


  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const toggleDropdown1 = () => {
    setDropdownOpen1(!isDropdownOpen1);
  };
  const handleCurrencyChange = (currency) => {
    setActivePayCurrency(currency);
    if(currency.text=="USDT")
    {
      setActiveReceiveCurrency(currencies[1]);

    }
    else{
      setActiveReceiveCurrency(currencies[0]);

    }

    setDropdownOpen(false);
  };
  const handleCurrencyChange1 = (currency) => {
    setActiveReceiveCurrency(currency);
    if(currency.text=="USDT")
    {
      setActivePayCurrency(currencies[1]);

    }
    else{
      setActivePayCurrency(currencies[0]);

    }
    setDropdownOpen1(false);
  };






  async function get_Data(){
    // setLoader(true)
    const web3= new Web3(new Web3.providers.HttpProvider("https://polygon-bor-rpc.publicnode.com	"));
    // setLoader(true)

              
   const balance =await  web3.eth.getBalance(address)
    const contract=new web3.eth.Contract(cont_abi,cont_address);
    const usdt_contract=new web3.eth.Contract(token_abi,usdt_Address);
    const Dmdr_contract=new web3.eth.Contract(token_abi,dmdr_address);



    let usdt_Balance = await usdt_contract.methods.balanceOf(address).call();    
    let usdt_allowance = await usdt_contract.methods.allowance(cont_address,address).call();    

    let Du_Balance = await Dmdr_contract.methods.balanceOf(address).call();  
    
    let Minimum_withdraw_limit = await contract.methods.Minimum_withdraw_limit().call();  

    let Du_price_in_usdt = await contract.methods.dmdr_price_in_usdt().call();
    let DuSelll_price_in_usdt = await contract.methods.dmdr_sell_price().call();

    let usdt_to_du = await contract.methods.get_usdt_to_dmdr().call();  
    let du_to_usdt = await contract.methods.get_dmdr_to_usdt().call();  

    
    let owner = await contract.methods.owner().call();  
    let swap_fee = await contract.methods.fee().call();  

    let user = await contract.methods.user(address).call();  

    let orderHistory = await contract.methods.get_userSwaps().call({from : address});  
    console.log(orderHistory);
    set_USDTAllowance(usdt_allowance)

    set_DuSell_price_in_usdt(DuSelll_price_in_usdt)
    set_usdt_to_du(usdt_to_du)
    set_du_to_usdt(du_to_usdt)
    set_swap_fee(Convert_To_eth(swap_fee))
    set_referralEarning(user[2])
    set_Directs(user[1])
    set_usdt_balance(usdt_Balance)
    set_dmdr_balance(Du_Balance)
    set_Minimum_withdraw(Minimum_withdraw_limit)
    set_Du_price_in_usdt(Du_price_in_usdt)
    set_orderHistory(orderHistory)
    set_owner(owner)
    // alert("jbkj")
    // setLoader(false)

  }



  function Convert_To_Wei(val) {
    const web3 = new Web3(
      new Web3.providers.HttpProvider("https://ethereum-rpc.publicnode.com	")
    );

    val = web3.utils.toWei(val.toString(), "ether");
    return val;
  }

  function Convert_To_eth(val) {
    const web3 = new Web3(
      new Web3.providers.HttpProvider("https://ethereum-rpc.publicnode.com	")
    );

    val = web3.utils.fromWei(val.toString(), "ether");
    return val;
  }

  useEffect(() => {}, [props.perTokenInEth]);

  
  function onSend_expected_reciving(value) 
  {
    if(value==0 )
    {
      set_receiveAmount(0);
      set_fee(0)

      set_Expected_tokens(0)

      return
    }

    if((activeReceiveCurrency.text == "USDT" && activePayCurrency.text =="DMDR")  )
    {

      let price = Number(DuSell_price_in_usdt)/10**18
     let dec_price= new Decimal(price);
     value=new Decimal(value)
      let temp=dec_price.times(value);
      set_receiveAmount(Number(temp).toFixed(2));

     let dec_temp= new Decimal(Number(temp))
     let dec_fees=new Decimal(Number(swap_fee))
     let fees=dec_temp.times(dec_fees)
      const result = fees.div(100);
      set_fee(Number(result).toFixed(2))
      set_Expected_tokens((Number(temp)  - (Number(result.toDecimalPlaces(2)))).toFixed(2))

    }
    else if(activeReceiveCurrency.text == "DMDR" ||activePayCurrency.text == "USDT")
    {

      // let temp=(value/((Number(Du_price_in_usdt))/10**18));

      let price = Number(Du_price_in_usdt)/10**18
      let dec_price= new Decimal(price);
      value=new Decimal(value)
       let temp=value.div(dec_price);

      set_receiveAmount(Number(temp).toFixed(2));

      let dec_temp= new Decimal(Number(temp))
      let dec_fees=new Decimal(Number(swap_fee))
      let fees=dec_temp.times(dec_fees)
       const result = fees.div(100);
       set_fee(Number(result).toFixed(2))

       set_Expected_tokens((Number(temp)  - (Number(result.toDecimalPlaces(2)))).toFixed(2))

    }
    
  }
  
  
  function onRecieve_expected_reciving(value) 
  {
    if(value==0 )
    {
      set_receiveAmount(0);
      set_fee(0)

      set_Expected_tokens(0)

      return
    }
    if((activeReceiveCurrency.text == "USDT" && activePayCurrency.text =="DMDR")  )
    {
      let price = Number(DuSell_price_in_usdt)/10**18
      let dec_price= new Decimal(price);
      value=new Decimal(value)
       let temp=value.div(dec_price);

      set_payAmount(Number(temp).toFixed(2));

      let dec_temp= new Decimal(Number(temp))
      let dec_fees=new Decimal(Number(swap_fee))
      let fees=dec_temp.times(dec_fees)
       const result = fees.div(100);
       set_fee(Number(result).toFixed(2))

       set_Expected_tokens((Number(temp)  - (Number(result.toDecimalPlaces(2)))).toFixed(2))
    
    }
    else if(activeReceiveCurrency.text == "DMDR" ||activePayCurrency.text == "USDT")
    {
      let price = Number(Du_price_in_usdt)/10**18
      let dec_price= new Decimal(price);
      value=new Decimal(value)
       let temp=dec_price.times(value);
       set_payAmount(Number(temp).toFixed(2));
 
      let dec_temp= new Decimal(Number(temp))
      let dec_fees=new Decimal(Number(swap_fee))
      let fees=dec_temp.times(dec_fees)
       const result = fees.div(100);
       set_fee(Number(result).toFixed(2))
       set_Expected_tokens((Number(temp)  - (Number(result.toDecimalPlaces(2)))).toFixed(2))
    }
  }

  async function swap1() {
    try {


      const tx = await writeContractAsync({
        abi: cont_abi,
        address: cont_address,
        functionName: activePayCurrency.text=="USDT" ? "usdt_to_dmdr": "dmdr_to_usdt" ,
        args: [

           payAmount ?Convert_To_Wei(Number(payAmount))  : 0 ,ref_add 
        ]
      });
      set_count(1);
    } catch (err) {
      console.error(err);
    }
  }

  async function usdt_approval() {
    try {
      const tx = await writeContractAsync({
        abi: token_abi,
        address: usdt_Address,
        args: [cont_address, payAmount ? Number(payAmount) * 10 ** 6 : 0],
        functionName: "approve",
      });

    } catch (err) {
      console.error(err);
    }
  }

  async function DMDR_approval() {
    try {
      const tx = await writeContractAsync({
        abi: token_abi,
        address: dmdr_address,
        args: [cont_address, payAmount ? Number(payAmount) * 10 ** 9 : 0],
        functionName: "approve",
      });

    } catch (err) {
      console.error(err);
    }
  }

  async function usdt_approval_zero() {
    try {
      const tx = await writeContractAsync({
        abi: token_abi,
        address: usdt_Address,
        args: [cont_address, "0"],
        functionName: "approve",
      });
    } catch (err) {
      console.error(err);
    }
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  useEffect(() => {
    if (isConfirmed) {
      // alert(count)
      if (count == 0) {
        // set_count(1)
        swap1();
      }
      if (count == 1) {
        get_Data();
        set_count(0);
      }
    }
  }, [isConfirmed]);

  async function swap() {
    if (isDisconnected) {
      alert("Kindly connect your wallet");
      return;
    }
    if (payAmount == "" || payAmount == "0") {
      alert("Kidly write the amount");
      return;
    }
    if(activePayCurrency.text==activeReceiveCurrency.text)
    {
      alert("wrong pair");
      return;
    }

    if(activePayCurrency.text =="DMDR")
    {
      if(Number(dmdr_balance)< Number(payAmount)*10**9)
      {
        alert("You don't have enough du");
        return;
      }

      if (chainId != currentChainId)
      {
        await switchChainAsync({ chainId });
        await DMDR_approval?.();

      } 
      else 
      {
        await DMDR_approval?.();
      }


    }
    else if(activePayCurrency.text =="USDT")
    {
      console.log("object usdt");
      if(Number(usdt_balance)< Number(payAmount)*10**6)
      {
        alert("You don't have enough USDT");
        return;
      }

      if (chainId != currentChainId) 
      {
        await switchChainAsync({ chainId });

        if (Number(USDTAllowance) >= Number(payAmount) * 10 ** 6) 
        {
          await swap1?.();
        } 
        else if ( Number(USDTAllowance) > 0 && Number(USDTAllowance) < Number(payAmount) * 10 ** 6) 
        {
          await usdt_approval_zero?.();
          await usdt_approval?.();
        } 
        else if ( Number(USDTAllowance) == 0 && Number(USDTAllowance) < Number(payAmount) * 10 ** 6)
        {
          await usdt_approval?.();
        }

      } 
      else 
      {
        if (Number(props.USDTAllowance) >= Number(payAmount) * 10 ** 6) {
          await swap1?.();
        } 
        else if ( Number(USDTAllowance) > 0 && Number(props.USDTAllowance) < Number(payAmount) * 10 ** 6 ) 
        {
          await usdt_approval_zero?.();
          await usdt_approval?.();
        } 
        else if (Number(USDTAllowance) == 0 && Number(USDTAllowance) < Number(payAmount) * 10 ** 6 ) 
        {
          await usdt_approval?.();
        }
      }
    } 

  }


  async function action(_orderNo,_decision,_index)
  {
    if (chainId != currentChainId) 
    {
      await switchChainAsync({ chainId });
      action(_orderNo,_decision,_index)
    }
    else
    {
      try {

        const tx = await writeContractAsync({
          abi: cont_abi,
          address: cont_address,
          functionName: 'cancel_order',
          args: [ _orderNo,_decision,_index]
        });
  
      } 
      catch (err) {
        console.error(err);
      }
    }
    

 }


 async function withdraw(value) 
  {
    if(isDisconnected)
    {
      alert("Kindly connect your wallet");
      return;
    }
    if(Number(referralEarning)/10**18 < Number(Minimum_withdraw)/10**18)
    {
      alert("You can't withdraw less than "+Number(Minimum_withdraw)/10**18 +" Du");
      return;
    }

    if (chainId != currentChainId) 
    {
      await switchChainAsync({ chainId });

    }

    try {

      const tx = await writeContractAsync({
        abi: cont_abi,
        address: cont_address,
        functionName: 'withdraw_refEarning',
      });

    } 
    catch (err) {
      console.error(err);
    }


    

  }


  return (
    <div className="tw-bg-Hero tw-w-full tw-bg-black tw-object-cover tw-object-center">
      <Header />
      <div className="tw-flex tw-justify-center tw-items-center">
        <div className=" tw-container  tw-px-4">
          <div className="row ">
            <div className="col-md-12  tw-pt-11 tw-pb-20 tw-mx-auto">
              <div className="tw-w-full  tw-mb-12 tw-text-center">
                <h1 className="tw-text-white tw-text-[40px] tw-font-Sora tw-uppercase tw-font-bold ">
                  {/* Diamond Reserve{" "} */}
                  {/* <span className="tw-text-[#8DE1E4]">Token</span> */}
                </h1>
                <p className="tw-text-white tw-font-Sora">

                </p>
              </div>
              <div className=" row   g-4 ">
                <div className=" col-md-6">
                 <div className=" row">
                  <div className=" col-md-10 tw-mx-auto">
                  <div className="tw-bg-gradient-to-b tw-from-[#23282a] tw-to-black tw-border-[15px]  tw-w-full tw-border-[#55585b] from-[#5a5c5f] to-black tw-bg-no-repeat tw-rounded-3xl tw-bg-HeroForm tw-bg-cover py-5 px-4 tw-bg-center">

                    <div className=" tw-flex tw-flex-col tw-gap-2 tw-justify-end tw-items-end">
                      <span className="  tw-text-white tw-font-medium tw-font-poppins tw-text-sm">
                        Buying 1 DMDR = {Du_price_in_usdt ? Number(Du_price_in_usdt)/10**18:0} USDT
                      </span>
                      <span className="  tw-text-white tw-font-medium tw-font-poppins tw-text-sm">
                        Selling 1 DMDR = {DuSell_price_in_usdt ? Number(DuSell_price_in_usdt)/10**18:0}  USDT
                      </span>
                    </div>
                    <div className="tw-flex tw-flex-col tw-gap-5">
                      <div className=" tw-relative">
                        <label className="tw-text-white tw-pb-3">YOU PAY</label>
                        <div className="tw-p-2.5 tw-rounded-xl tw-border tw-border-[#8DE1E4] tw-flex">
                          <input
                            className="tw-bg-transparent tw-text-2xl tw-font-poppins tw-text-white tw-outline-none tw-w-full"
                            type="Number"
                            //  disabled={props.perTokenInEth > 0 ? false : true}
                            min={0}
                            value={payAmount}
                            onChange={(e) => {
                              set_payAmount(e.target.value);
                              onSend_expected_reciving(e.target.value);
                            }}
                          />
                          <button
                            onClick={toggleDropdown}
                            className=" tw-py-2 tw-items-center tw-flex tw-gap-2 tw-px-6 tw-rounded-lg tw-text-white tw-border tw-border-[#8DE1E4]"
                          >
                            {activePayCurrency.text}
                            <div>
                              <img
                                src={activePayCurrency.imgSrc}
                                className=" tw-w-16"
                                alt={activePayCurrency.text}
                              />
                            </div>
                            <LiaAngleDownSolid size={25} color="#8DE1E4" />
                          </button>
                        </div>
                        {isDropdownOpen && (
                          <div className="tw-bg-[#23282a] tw-rounded-lg  tw-w-44 tw-mt-2 tw-absolute tw-right-0 tw-z-10">
                            {currencies.map((currency) => (
                              <div
                                key={currency.text}
                                onClick={() => handleCurrencyChange(currency)}
                                className="tw-px-4 tw-py-2 tw-flex tw-justify-between tw-items-center tw-gap-2 tw-cursor-pointer hover:tw-bg-[#8DE1E4] hover:tw-text-black"
                              >
                                <img
                                  src={currency.imgSrc}
                                  alt={currency.text}
                                  className="tw-w-10 tw-h-10"
                                />
                                <span className=" tw-text-white">
                                  {currency.text}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className=" tw-relative" >
                        <label className="tw-text-white tw-pb-3">
                          YOU RECEIVE
                        </label>
                        <div className="tw-p-2.5 tw-rounded-xl tw-border tw-border-[#8DE1E4] tw-flex">
                          <input
                            className="tw-bg-transparent tw-text-2xl tw-font-poppins tw-text-white tw-outline-none tw-w-full"
                            type="number"
                            value={receiveAmount}
                            min={0}
                            onChange={(e) => {
                              set_receiveAmount(e.target.value);
                              onRecieve_expected_reciving(e.target.value);
                            }}
                          />
                          <button
                            onClick={toggleDropdown1}
                            className=" tw-py-2 tw-items-center tw-flex tw-gap-2 tw-px-6 tw-rounded-lg tw-text-white tw-border tw-border-[#8DE1E4]"
                          >
                            {activeReceiveCurrency.text}
                            <div>
                              <img
                                src={activeReceiveCurrency.imgSrc}
                                className=" tw-w-16"
                                alt={activeReceiveCurrency.text}
                              />
                            </div>
                            <LiaAngleDownSolid size={25} color="#8DE1E4" />
                          </button>
                        </div>
                        {isDropdownOpen1 && (
                          <div className="tw-bg-[#23282a] tw-rounded-lg  tw-w-44 tw-mt-2 tw-absolute tw-right-0 tw-z-10">
                            {currencies.map((currency) => (
                              <div
                                key={currency.text}
                                onClick={() => handleCurrencyChange1(currency)}
                                className="tw-px-4 tw-py-2 tw-flex tw-justify-between tw-items-center tw-gap-2 tw-cursor-pointer hover:tw-bg-[#8DE1E4] hover:tw-text-black"
                              >
                                <img
                                  src={currency.imgSrc}
                                  alt={currency.text}
                                  className="tw-w-10 tw-h-10"
                                />
                                <span className=" tw-text-white">
                                  {currency.text}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className=" tw-flex tw-w-full tw-flex-col">
                        <div className=" tw-flex tw-justify-between">
                          <p className="  tw-text-white tw-font-medium tw-font-poppins">
                            Fee ( 0.15% )
                          </p>
                          <p className=" tw-text-white tw-font-poppins">
                            {fee} {activeReceiveCurrency.text}
                          </p>
                        </div>
                        <div className=" tw-flex tw-justify-between">
                          <span className="  tw-text-white tw-font-medium tw-font-poppins">
                            Expected Amount
                          </span>
                          <p className=" tw-text-white tw-font-poppins">
                          {Expected_tokens} {activeReceiveCurrency.text}
                          </p>
                        </div>
                      </div>
                      <div className="tw-mt-3">
                        <button
                          className={
                            "tw-w-full tw-bg-[#8DE1E4] tw-p-3 tw-font-bold tw-rounded-md"
                          }
                          onClick={swap}
                        >
                          {" "}
                          {isConfirming ? "confirming" : "buy"}
                        </button>
                      </div>
                    </div>
                  </div>
                  </div>
                 </div>
                </div>
                <div className=" col-md-6">
                  <div className=" row g-4">
                    <div className=" col-md-6">
                      <div className="  tw-rounded-tr-3xl tw-border tw-p-6 tw-border-[#8DE1E4]">
                        <h5 className=" tw-text-white">Total Directs</h5>
                        <p className=" tw-font-semibold   tw-pt-2 tw-text-xl tw-font-poppins tw-text-white">
                        {Number(Directs)}
                        </p>
                      </div>
                    </div>
                    <div className=" col-md-6">
                      <div className="  tw-rounded-tr-3xl tw-border tw-p-6 tw-border-[#8DE1E4]">
                        <h5 className=" tw-text-white">Total Earning</h5>
                        <div className=" tw-flex tw-justify-between tw-items-center tw-pt-2">
                          <p className=" tw-font-semibold  tw-text-xl tw-font-poppins tw-text-white">
                          {Number(referralEarning)/10**18} DMDR
                          </p>
                          <button className=" tw-bg-[#8DE1E4] tw-rounded-xl tw-px-4 tw-py-2 tw-font-medium" onClick={withdraw} >
                            Withdraw
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className=" col-md-6">
                      <div className="  tw-rounded-tr-3xl tw-border tw-p-6 tw-border-[#8DE1E4]">
                        <h5 className=" tw-text-white">USDT Balance</h5>
                        <div className=" tw-flex tw-justify-between tw-items-center tw-pt-2">
                          <p className=" tw-font-semibold  tw-text-xl tw-font-poppins tw-text-white">
                          {usdt_balance?(Number(usdt_balance)/10**6).toFixed(2):0}

                          </p>
                        </div>
                      </div>
                    </div>
                    <div className=" col-md-6">
                      <div className="  tw-rounded-tr-3xl tw-border tw-p-6 tw-border-[#8DE1E4]">
                        <h5 className=" tw-text-white">DMDR Balance</h5>
                        <div className=" tw-flex tw-justify-between tw-items-center tw-pt-2">
                          <p className=" tw-font-semibold  tw-text-xl tw-font-poppins tw-text-white">
                            {dmdr_balance?(Number(dmdr_balance)/10**9).toFixed(2):0}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className=" col-md-12">
                      <div className="  tw-rounded-tr-3xl tw-border tw-p-6 tw-border-[#8DE1E4]">
                        <span className=" tw-text-white  tw-flex tw-gap-2 tw-items-center">
                          My Link 

                          {/* <CopyToClipboard text={`${window.location.host}/?ref=${address? address:""}`} > */}
                            <IoCopy size={20} />{" "}
                        {/* </CopyToClipboard> */}
                        </span>
                        <div className=" tw-flex tw-justify-between tw-items-center tw-pt-2">
                          <p className=" tw-font-semibold  tw-text-xl tw-font-poppins tw-text-[#8DE1E4]">
                            {window.location.host}/?ref= {address?address.slice(0,4)+"..."+  address.slice(39,42):"kindly connect"} 
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className='tw-w-full tw-text-center'>
              <p className='tw-text-white tw-font-Sora'>
                Add DMDR Token to your Wallet
              </p>
               <h1 className='tw-text-white tw-text-[20px] tw-font-Sora tw-uppercase tw-font-bold'>
              0xC427f19DeA9e7C967fb3c49bFb4f3D8A8CDcd2Ea 
              </h1> 
              <p className='tw-text-white tw-font-Sora'>
              0xC427f19DeA9e7C967fb3c49bFb4f3D8A8CDcd2Ea
              </p>
            </div> */}

              <div className=" tw-mt-12">
                <section className="tw-mb-20 tw-mt-7 tw-text-gray-800">
                  <div className="tw-block tw-rounded-lg tw-mt-5 tw-shadow-lg">
                    <div className="tw-flex tw-flex-col">
                      <div className="tw-overflow-x-auto sm:tw--mx-6 lg:tw--mx-8">
                        <div className="tw-inline-block  tw-min-w-full sm:tw-px-6 lg:tw-px-8">
                          <div className="tw-overflow-hidden  tw-h-screen tw-overflow-y-scroll ">
                            <table className="tw-min-w-full  tw-mb-0">
                              <thead className="tw-bg-[#8DE1E4]">
                                <tr className="tw-rounded-lg tw-whitespace-nowrap">
                                  <th className="tw-font-poppins tw-text-lg tw-text-black tw-font-bold tw-px-6 tw-py-4">
                                    Sr.No
                                  </th>
                                  <th className="tw-font-poppins tw-text-lg tw-text-black tw-font-bold tw-px-6 tw-py-4">
                                    Order No
                                  </th>
                                  <th className="tw-font-poppins tw-text-lg tw-text-black tw-font-bold tw-px-6 tw-py-4">
                                    IN
                                  </th>
                                  <th className="tw-font-poppins tw-text-lg tw-text-black tw-font-bold tw-px-6 tw-py-4">
                                    OUT
                                  </th>
                                  <th className="tw-font-poppins tw-text-lg tw-text-black tw-font-bold tw-px-6 tw-py-4">
                                    Time
                                  </th>
                                  <th className=" tw-font-poppins tw-text-lg tw-text-black tw-font-bold tw-px-6 tw-py-4">
                                    Status
                                  </th>
                                  <th className=" tw-font-poppins tw-text-lg tw-text-black tw-font-bold tw-px-6 tw-py-4">
                                    
                                  </th>
                                </tr>
                              </thead>

                              <tbody className="  tw-w-full">
                                {orderHistory.map((item, index) => (
                                  <tr
                                    key={index}
                                    className="tw-bg-black tw-border-t tw-rounded-md"
                                  >
                                    <th className="tw-text-lg tw-font-normal tw-px-6 tw-py-4 tw-whitespace-nowrap">
                                      <p className="tw-mb-0.5 tw-font-poppins tw-font-medium tw-text-white">
                                        {index + 1}
                                      </p>
                                    </th>
                                    <td className="tw-text-lg tw-font-normal tw-text-center tw-px-6 tw-py-4 tw-whitespace-nowrap">
                                      <p className="tw-mb-0.5 tw-font-poppins tw-font-medium tw-text-white">
                                      0xdmdr{Number(item[1])}
                                      </p>
                                    </td>
                                    <td className="tw-text-lg tw-font-normal tw-text-center tw-px-6 tw-py-4 tw-whitespace-nowrap">
                                      <p className="tw-mb-0.5 tw-font-poppins tw-font-medium tw-text-white">
                                      {(Number(item[3])/10**18).toFixed(2)} {Number(item[2])==dmdr_address ? ("DMDR"):("USDT") }
                                      </p>
                                    </td>
                                    <td className="tw-text-lg tw-font-normal tw-text-center tw-px-6 tw-py-4 tw-whitespace-nowrap">
                                      <p className="tw-mb-0.5 tw-font-poppins tw-font-medium tw-text-white">
                                      {(Number(item[4])/10**18).toFixed(2)}  {Number(item[2])!=dmdr_address ? ("DMDR"):("USDT") }
                                      </p>
                                    </td>
                                    <td className="tw-text-lg tw-font-normal tw-text-center tw-px-6 tw-py-4 tw-whitespace-nowrap">
                                      <p className="tw-mb-0.5 tw-font-poppins tw-font-medium tw-text-white">
                                      {count1(Number(item[5]))}
                                      </p>
                                    </td>
                                    <td className="tw-text-lg tw-font-normal tw-px-6 tw-py-4 tw-whitespace-nowrap">
                                      <div className="tw-flex tw-text-white tw-justify-center tw-gap-2">
                                      {Number(item[6])==0 ? ("pending"):(Number(item[6])==1 ? ("Approved"):(Number(item[6])==2 ? ("Decline"):(Number(item[6])==3 ? ("Cancelled"):(null)))) }
                                      </div>
                                    </td>
  
                                  {Number(item[6])==0 ?(

                                    <td className="tw-text-lg tw-font-normal tw-px-6 tw-py-4 tw-whitespace-nowrap">
                                      <div className="tw-flex tw-text-white tw-justify-center tw-gap-2">
                                      <button className="button btn" style={{ background:"red" ,borderRadius:"12 px" }} onClick={()=>action(item[1],3,item[7])}> Cancel</button>
                                      </div>
                                    </td>
                                  ):(

                                    <div className="tw-flex tw-text-white tw-justify-center tw-gap-2">
                                    </div>


                                    )}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              <div
                className="tw-w-full tw-text-center"
                style={{ marginTop: "20px" }}
              >
                <p className="tw-text-white tw-font-Sora">
                  Add DMDR Token to your Wallet
                </p>
                <h1 className="tw-text-white tw-text-[13px] tw-font-Sora tw-uppercase tw-font-bold">
                  0xC427f19DeA9e7C967fb3c49bFb4f3D8A8CDcd2Ea
                </h1>
                <p className="tw-text-white tw-font-Sora">Token Address</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
