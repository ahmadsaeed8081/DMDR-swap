//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;


interface Token 
    {
        function transfer(address to, uint tokens) external returns (bool success);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool) ;
        function balanceOf(address account) external view returns (uint256);
        function allowance(address owner, address spender) external view returns (uint256);
    }

contract DMDR_Swap 
    {

        struct order_data{
            
            address userAddress;
            uint order_no;
            address in_TokenAddress;

            uint in_Amount;
            uint out_Amount;

            uint orderPlacingTime;
            uint decision;
            uint index_no;
            uint fee;

        }
        
        struct Data{

            bool investBefore;
            uint totalDirects;
            uint Ref_earning;
            uint[] orders_array;

        }

        mapping(address=>Data) public user;
        mapping(uint=>order_data) orders;

        uint[] public pending_orders_arr;

        uint public  dmdr_price_in_usdt;
        uint public ref_percentage;
        uint public Minimum_withdraw_limit;
        uint public total_orders;

        bool public initalized = false;


        address public owner;
        address public dmdr_address;
        address public usdt_address;
        uint public fee;
        
        uint Total_usdt_to_dmdr;
        uint Total_dmdr_to_usdt;

        uint public  baseVal_usdt_to_dmdr;
        uint public baseVal_dmdr_to_usdt;

        uint[] public success_orders_arr;
        uint public dmdr_sell_price;


    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner is allowed to perform this action");
        _;
    }      

        constructor() 
        {
            require(owner == address(0), "Already initalized");
            require(!initalized, "Already initalized");
            owner = msg.sender;
            dmdr_address=0xE8aff75862Ac5408a467533631dDdb38A5521C78;
            usdt_address=0x341343568948459e5b7017eDDb05110cfA3EF699;
            dmdr_price_in_usdt = 770 ether;   
            dmdr_sell_price=670 ether;
            ref_percentage= 1 ether;
            Minimum_withdraw_limit = 100 ether;
            fee=0.05 ether;
            baseVal_usdt_to_dmdr=1000 ether;
            baseVal_dmdr_to_usdt=100 ether;
            initalized = true;

        }
        

        function check_recieving_Amount( address add,uint amount) internal view returns(uint)
        {
            if(add==usdt_address)
            {
               return  (amount *1 ether)/ dmdr_price_in_usdt ;
            }
            else
            {
                return  (amount * dmdr_sell_price)/1 ether;
            }

         }
        


        function dmdr_to_usdt( uint amount, address _ref) external 
        {
            require(Token(dmdr_address).allowance(msg.sender,address(this))>=(amount/10**9),"allowance issue");
            uint fee_temp = (amount * fee) / 100 ether;
            orders[total_orders].order_no = total_orders;
            orders[total_orders].fee = fee_temp;

            orders[total_orders].in_Amount=amount-fee_temp;
            orders[total_orders].userAddress=msg.sender;

            orders[total_orders].out_Amount = check_recieving_Amount(dmdr_address,amount-fee_temp);
            orders[total_orders].in_TokenAddress = dmdr_address;

            orders[total_orders].orderPlacingTime = block.timestamp;
            pending_orders_arr.push(total_orders);
            user[msg.sender].orders_array.push(total_orders);

            total_orders++;
            Total_dmdr_to_usdt+=amount;
 

            if(_ref!=address(0) || _ref!=msg.sender)
            {
                
                user[_ref].Ref_earning+= (amount * ref_percentage) / 100 ether;
                user[_ref].totalDirects++;

            }
                
            Token(dmdr_address).transferFrom(msg.sender,address(this),(amount/10**9));

        }


        function usdt_to_dmdr(uint amount,address _ref) external 
        {
            require(Token(usdt_address).allowance(msg.sender,address(this))>=(amount/10**12),"allowance issue");
            
            uint fee_temp = (amount * fee) / 100 ether;

            orders[total_orders].order_no=total_orders;
            orders[total_orders].fee = fee_temp;

            orders[total_orders].in_Amount = amount-fee_temp;
            orders[total_orders].userAddress = msg.sender;
            uint temp_amount = check_recieving_Amount(usdt_address,amount-fee_temp);
            orders[total_orders].out_Amount = temp_amount;
            orders[total_orders].in_TokenAddress = usdt_address;

            orders[total_orders].orderPlacingTime = block.timestamp;
            orders[total_orders].decision = 1;                        
            user[msg.sender].orders_array.push(total_orders);
            Total_usdt_to_dmdr += amount;




            if(_ref!=address(0) || _ref!=msg.sender)
            {
                
                user[_ref].Ref_earning+= (temp_amount * ref_percentage) / 100 ether;
                user[_ref].totalDirects++;

            }

            Token(usdt_address).transferFrom(msg.sender,address(this),(amount/10**12));
            Token(dmdr_address).transfer(msg.sender,(temp_amount/10**9));

            total_orders++;

        }

        function get_userSwaps()  public view returns(order_data[] memory order)
        {
            uint num = user[msg.sender].orders_array.length;

            order =  new order_data[](num) ;

            for(uint i=0;i<num;i++)
            {
                order[i] = orders[user[msg.sender].orders_array[i]];
                order[i].index_no =  get_orderIndexNo(user[msg.sender].orders_array[i]);

            }

        }

        function get_All_PendingSwaps()  public view returns(order_data[] memory order)
        {
            uint num = pending_orders_arr.length;

            order =  new order_data[](num) ;

            for(uint i=0;i<num;i++)
            {
                order[i] = orders[pending_orders_arr[i]];
                order[i].index_no = i;

            }

        }
        
        function get_All_successSwaps()  public view returns(order_data[] memory order)
        {
            uint num = success_orders_arr.length;

            order =  new order_data[](num) ;

            for(uint i=0;i<num;i++)
            {
                order[i] = orders[success_orders_arr[i]];
                // order[i].index_no = i;

            }

        }

        function remove_pendingOrder(uint num) internal {
            require(num < pending_orders_arr.length) ;

            if(pending_orders_arr.length>1)
            {
                pending_orders_arr[num] = pending_orders_arr[pending_orders_arr.length-1];
            }
                  
            pending_orders_arr.pop();
        }

        function respond_to_request(uint num,uint _decision,uint index_no) onlyOwner public  returns(bool)
        {

            require(orders[num].decision==0);
            require(_decision==1 || _decision==2);
            orders[num].decision=_decision;
            index_no = get_orderIndexNo(num);


            if(_decision==1)
            {
                uint amount = orders[num].out_Amount;
                address tokenAddress = orders[num].in_TokenAddress;
                if(tokenAddress==dmdr_address)
                {
                    Token(usdt_address).transfer(orders[num].userAddress,(amount/10**12));

                }
                else if(tokenAddress==usdt_address)
                {
                    Token(dmdr_address).transfer(orders[num].userAddress,(amount/10**9));

                }
                success_orders_arr.push(pending_orders_arr[index_no]);


            }
            else if(_decision==2)
            {
                uint amount = orders[num].in_Amount + orders[num].fee;
                address tokenAddress = orders[num].in_TokenAddress;
                // Token(tokenAddress).transfer(orders[num].userAddress,amount);

                if(tokenAddress==usdt_address)
                {
                    Token(usdt_address).transfer(orders[num].userAddress,(amount/10**12));

                }
                else if(tokenAddress==dmdr_address)
                {
                    Token(dmdr_address).transfer(orders[num].userAddress,(amount/10**9));

                }
            }
            remove_pendingOrder(index_no);
            return true;

        }

        function cancel_order(uint num,uint _decision,uint index_no)  public  returns(bool)
        {

            require(msg.sender==orders[num].userAddress);
            require(orders[num].decision == 0 && orders[num].in_Amount > 0);
            require(_decision == 3);
            orders[num].decision = _decision;
            index_no = get_orderIndexNo(num);

            uint amount = orders[num].in_Amount + orders[num].fee;
            address tokenAddress = orders[num].in_TokenAddress;
            // Token(tokenAddress).transfer(orders[num].userAddress,amount);

            if(tokenAddress==usdt_address)
            {
                Token(usdt_address).transfer(orders[num].userAddress,(amount/10**12));

            }
            else if(tokenAddress==dmdr_address)
            {
                Token(dmdr_address).transfer(orders[num].userAddress,(amount/10**9));

            }

            
            remove_pendingOrder(index_no);
            return true;

        }

        function withdraw_refEarning()  public
        {
            require(user[msg.sender].Ref_earning >= Minimum_withdraw_limit);

            Token(dmdr_address).transfer(msg.sender,(user[msg.sender].Ref_earning)/10**9);
            user[msg.sender].Ref_earning = 0;

        }



        //withdraw functions

        function withdrawdmdr(uint _amount) onlyOwner public
        {
            uint bal = Token(dmdr_address).balanceOf(address(this));
            require(bal>=_amount,"you dont have funds");

            Token(dmdr_address).transfer(owner,_amount); 
        }
        function withdrawUsdt(uint _amount) onlyOwner  public
        {
            uint bal = Token(usdt_address).balanceOf(address(this));
            require(bal>=_amount,"you dont have funds");

            Token(usdt_address).transfer(owner,_amount); 
        }
               
        function get_usdt_to_dmdr() public view returns(uint)
        {
            return baseVal_usdt_to_dmdr + Total_usdt_to_dmdr;
        } 
        
        function get_dmdr_to_usdt()  public view returns(uint)
        {
            return baseVal_dmdr_to_usdt + Total_dmdr_to_usdt;
        } 
        
        function get_orderData(uint i)  public view returns(order_data memory)
        {
            return orders[i];
        } 

        function get_orderIndexNo(uint _orderNo)  public view returns(uint index )
        {

            
            for(uint i=0 ; i<pending_orders_arr.length ; i++)
            {
                if(pending_orders_arr[i] == _orderNo)
                {
                    index=i;
                    i=pending_orders_arr.length;
                }
            }
            return index;
        } 

        // update functions


        function Add_pendingOrder(uint orderNo) onlyOwner  public
        {
            pending_orders_arr.push(orderNo);
        }


        function get_AllpendingOrder()  public view returns(uint[100] memory arr)
        {
            uint count=0;
            bool avail=false;
            for(uint i=0;i<total_orders;i++)
            {

                if(orders[i].decision == 0 )
                {
            
                    for(uint j=0 ; j<pending_orders_arr.length ; j++)
                    {
                        if(pending_orders_arr[j] == i)
                        {
                            avail=true;
                            j = pending_orders_arr.length;
                        }
                    }  
                    if(avail==false)   
                    {
                        arr[count]=i;
                        count++;
                    }
                    avail=false;


 
                }

            }
        }

        function transferOwnership(address _owner) onlyOwner  public
        {
            owner = payable(_owner);
        }
        
        function update_dmdr_Price(uint val) onlyOwner public
        {
            dmdr_price_in_usdt = val;
        }
        
        function update_dmdrSell_Price(uint val) onlyOwner public
        {
            dmdr_sell_price = val;
        }

        function update_ref_percentage(uint val) onlyOwner  public
        {
            ref_percentage = val;
        }
            
        function update_Minimum_withdraw_limit(uint val) onlyOwner public
        {
            Minimum_withdraw_limit = val;
        }     

        function update_fee(uint val) onlyOwner public
        {
            fee = val;
        } 
        
        function update_baseVal_usdt_to_dmdr(uint val) onlyOwner public
        {
            baseVal_usdt_to_dmdr = val;
        } 
        
        function update_update_baseVal_dmdr_to_usdt(uint val) onlyOwner public
        {
            baseVal_dmdr_to_usdt = val;
        } 

    } 
