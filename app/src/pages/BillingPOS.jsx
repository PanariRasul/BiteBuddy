// app/src/pages/BillingPOS.jsx
import { useEffect, useState } from "react";
import styled from "styled-components";
import { BASE_URL } from "./CustomerMenu";
import Loader from "../components/Loader";

const BillingPOS = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [filteredData, setFilteredData] = useState(null);
    const [selectedBtn, setSelectedBtn] = useState("all");
    const [cart, setCart] = useState([]);

    // Toggle state to manage expanding/minimizing the Active Cart Drawer
    const [isCartOpen, setIsCartOpen] = useState(false);

    const filterBtns = [
        { name: "All Items", type: "all" },
        { name: "Breakfast", type: "breakfast" },
        { name: "Lunch", type: "lunch" },
        { name: "Dinner", type: "dinner" },
    ];

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(BASE_URL);
                const json = await response.json();
                setData(json);
                setFilteredData(json);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching POS menu:", err);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filterFood = (type) => {
        setSelectedBtn(type);
        if (type === "all") {
            setFilteredData(data);
            return;
        }
        const filtered = data?.filter(
            (food) => typeof food.type === "string" && food.type.toLowerCase() === type.toLowerCase()
        );
        setFilteredData(filtered);
    };

    const addToCart = (item) => {
        setCart((prevCart) => {
            const existingIndex = prevCart.findIndex((cartItem) => cartItem.name === item.name);
            if (existingIndex > -1) {
                const updatedCart = [...prevCart];
                updatedCart[existingIndex].quantity += 1;
                return updatedCart;
            }
            return [...prevCart, { ...item, quantity: 1 }];
        });
    };

    const updateQuantity = (name, amount) => {
        setCart((prevCart) =>
            prevCart
                .map((item) => {
                    if (item.name === name) {
                        return { ...item, quantity: item.quantity + amount };
                    }
                    return item;
                })
                .filter((item) => item.quantity > 0)
        );
    };

    const clearCart = () => setCart([]);

    // Calculations
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const taxRate = 0.05; // 5% CGST/SGST simulation
    const tax = subtotal * taxRate;
    const total = subtotal + tax;
    const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);

    if (loading) return <Loader />;

    return (
        <POSWrapper>
            {/* Main Full-Screen Grid Section */}
            <MenuColumn>
                <POSHeader>
                    <div className="header-left">
                        <h2>POS Order Desk</h2>
                        <p>Select items to register on the billing terminal</p>
                    </div>
                    <HeaderActionsRow>
                        <FilterTabs>
                            {filterBtns.map((btn) => (
                                <FilterBtn
                                    key={btn.type}
                                    active={selectedBtn === btn.type}
                                    onClick={() => filterFood(btn.type)}
                                >
                                    {btn.name}
                                </FilterBtn>
                            ))}
                        </FilterTabs>

                        {/* Floating Action Button to View/Maximize Cart Container */}
                        <ToggleCartTrayBtn onClick={() => setIsCartOpen(true)}>
                            🛒 View Cart ({totalItems}) <span className="running-total">₹{total.toFixed(2)}</span>
                        </ToggleCartTrayBtn>
                    </HeaderActionsRow>
                </POSHeader>

                <ItemsGrid>
                    {filteredData?.map((food) => (
                        <ItemGridCard key={food.name} onClick={() => addToCart(food)}>
                            <div className="img-container">
                                <img src={`${BASE_URL}${food.image}`} alt={food.name} />
                            </div>
                            <div className="info">
                                <h4>{food.name}</h4>
                                <span className="price">₹{food.price.toFixed(2)}</span>
                            </div>
                        </ItemGridCard>
                    ))}
                </ItemsGrid>
            </MenuColumn>

            {/* Slide-out Maximized Overlay Side Sheet Drawer */}
            {isCartOpen && (
                <DrawerOverlay onClick={() => setIsCartOpen(false)}>
                    <DrawerSheet onClick={(e) => e.stopPropagation()}>
                        <DrawerHeader>
                            <div>
                                <h3>Active Cart Ledger</h3>
                                <span className="item-count-sub">{totalItems} food items selected</span>
                            </div>
                            <MinimizeBtn onClick={() => setIsCartOpen(false)} title="Minimize Cart">✕</MinimizeBtn>
                        </DrawerHeader>

                        <CartItemsList>
                            {cart.length === 0 ? (
                                <EmptyCartState>Cart is empty. Select grid menu items to populate details.</EmptyCartState>
                            ) : (
                                cart.map((item) => (
                                    <CartRow key={item.name}>
                                        <div className="item-meta">
                                            <span className="item-title">{item.name}</span>
                                            <span className="item-unit-price">₹{item.price.toFixed(2)}</span>
                                        </div>
                                        <div className="qty-controls">
                                            <button onClick={() => updateQuantity(item.name, -1)}>-</button>
                                            <span className="qty-val">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.name, 1)}>+</button>
                                        </div>
                                        <span className="row-total">₹{(item.price * item.quantity).toFixed(2)}</span>
                                    </CartRow>
                                ))
                            )}
                        </CartItemsList>

                        {cart.length > 0 && (
                            <SummaryMatrix>
                                <div className="matrix-row">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal.toFixed(2)}</span>
                                </div>
                                <div className="matrix-row">
                                    <span>Tax (5%)</span>
                                    <span>₹{tax.toFixed(2)}</span>
                                </div>
                                <hr />
                                <div className="matrix-row total-row">
                                    <span>Total Payable</span>
                                    <span>₹{total.toFixed(2)}</span>
                                </div>

                                <ActionGroup>
                                    <ClearButton disabled={cart.length === 0} onClick={clearCart}>
                                        Clear
                                    </ClearButton>
                                    <CheckoutButton disabled={cart.length === 0} onClick={() => alert("Order processed to printing hub!")}>
                                        Hold & Print Receipt
                                    </CheckoutButton>
                                </ActionGroup>
                            </SummaryMatrix>
                        )}
                    </DrawerSheet>
                </DrawerOverlay>
            )}
        </POSWrapper>
    );
};

export default BillingPOS;

/* Core Style Structuring */
const POSWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f5f5f7;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  box-sizing: border-box;
  overflow: hidden;
`;

const MenuColumn = styled.div`
  padding: 32px;
  overflow-y: auto;
  height: 100vh;
  box-sizing: border-box;
`;

const POSHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
  
  .header-left {
    h2 {
      font-size: 26px;
      font-weight: 700;
      color: #1d1d1f;
      margin: 0 0 4px 0;
    }
    p {
      font-size: 14px;
      color: #86868b;
      margin: 0;
    }
  }
`;

const HeaderActionsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
`;

const FilterTabs = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const FilterBtn = styled.button`
  border: none;
  outline: none;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  background: ${(props) => (props.active ? "#ff4343" : "#ffffff")};
  color: ${(props) => (props.active ? "#ffffff" : "#1d1d1f")};
  border: 1px solid ${(props) => (props.active ? "#ff4343" : "rgba(0,0,0,0.05)")};
  transition: all 0.15s ease;
`;

const ToggleCartTrayBtn = styled.button`
  border: none;
  outline: none;
  background: #1d1d1f;
  color: white;
  padding: 10px 20px;
  font-weight: 700;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  transition: background 0.2s;

  &:hover {
    background: #2d2d30;
  }

  .running-total {
    background: rgba(255,255,255,0.15);
    padding: 2px 8px;
    border-radius: 6px;
    font-size: 12px;
  }
`;

const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 20px;
`;

const ItemGridCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 14px;
  border: 1px solid rgba(0, 0, 0, 0.04);
  cursor: pointer;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.01);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  box-sizing: border-box;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.06);
  }

  .img-container {
    height: 110px;
    background: #f5f5f7;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .info {
    h4 {
      font-size: 14px;
      font-weight: 600;
      margin: 0 0 4px 0;
      color: #1d1d1f;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .price {
      font-size: 13px;
      font-weight: 700;
      color: #ff4343;
    }
  }
`;

/* Collapsible Drawer Structures */
const DrawerOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(4px);
  z-index: 9999;
  display: flex;
  justify-content: flex-end;
`;

const DrawerSheet = styled.div`
  background: #ffffff;
  width: 100%;
  max-width: 440px;
  height: 100%;
  box-shadow: -10px 0 30px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes slideIn {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }
`;

const DrawerHeader = styled.div`
  padding: 24px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    margin: 0 0 2px 0;
    font-size: 18px;
    font-weight: 700;
    color: #1d1d1f;
  }
  .item-count-sub {
    font-size: 12px;
    color: #86868b;
  }
`;

const MinimizeBtn = styled.button`
  border: none;
  background: #f5f5f7;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1d1d1f;
  font-weight: bold;
`;

const CartItemsList = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 24px;
`;

const EmptyCartState = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #86868b;
  text-align: center;
  padding: 0 24px;
`;

const CartRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);
  gap: 10px;

  .item-meta {
    display: flex;
    flex-direction: column;
    width: 45%;

    .item-title {
      font-size: 14px;
      font-weight: 600;
      color: #1d1d1f;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .item-unit-price {
      font-size: 11px;
      color: #86868b;
    }
  }

  .qty-controls {
    display: flex;
    align-items: center;
    background: #f5f5f7;
    border-radius: 6px;
    padding: 2px;
    flex-shrink: 0;

    button {
      border: none;
      background: none;
      width: 24px;
      height: 24px;
      font-weight: bold;
      cursor: pointer;
    }

    .qty-val {
      font-size: 13px;
      font-weight: 600;
      width: 24px;
      text-align: center;
    }
  }

  .row-total {
    font-size: 14px;
    font-weight: 600;
    color: #1d1d1f;
    width: 75px;
    text-align: right;
    flex-shrink: 0;
  }
`;

const SummaryMatrix = styled.div`
  background: #f5f5f7;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  padding: 24px;
  padding-bottom: 74px; /* Essential clearance safety layout spacing for Dev HUD */

  .matrix-row {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: #86868b;
    margin-bottom: 8px;
  }

  .total-row {
    font-size: 16px;
    font-weight: 700;
    color: #1d1d1f;
    margin-top: 8px;
    margin-bottom: 0;
  }

  hr {
    border: none;
    border-top: 1px solid rgba(0, 0, 0, 0.06);
    margin: 8px 0;
  }
`;

const ActionGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 16px;
`;

const ClearButton = styled.button`
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: #ffffff;
  padding: 12px 20px;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  flex-shrink: 0;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const CheckoutButton = styled.button`
  flex-grow: 1;
  border: none;
  background: #ff4343;
  color: white;
  padding: 12px;
  font-weight: 700;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;

  &:disabled {
    background: #86868b;
    opacity: 0.4;
    cursor: not-allowed;
  }
`;