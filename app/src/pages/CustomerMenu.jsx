// app/src/pages/CustomerMenu.jsx
import { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../Components/Button";
import Loader from "../Components/Loader";

// export const BASE_URL = "http://localhost:9000";
export const BASE_URL = "https://bitebuddy-miqu.onrender.com";

const CustomerMenu = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [filteredData, setFilteredData] = useState(null);
    const [selectedBtn, setSelectedBtn] = useState("all");

    // New Cart Management States
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const filterBtns = [
        { name: "All", type: "all" },
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
                console.error("Error: ", err);
                setError("Unable to fetch menu data!");
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const searchFood = (e) => {
        const searchValue = e.target.value.toLowerCase();
        if (searchValue === "") {
            setFilteredData(data);
            return;
        }
        const filtered = data?.filter((food) =>
            food.name && food.name.toLowerCase().includes(searchValue)
        );
        setFilteredData(filtered);
    };

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

    // Cart Core Methods
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

    const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (loading) return <Loader />;
    if (error) return <ErrorMessage>{error}</ErrorMessage>;

    return (
        <PageWrapper>
            {/* Header Section */}
            <HeaderSection>
                <div className="header-top">
                    <BrandLogo>Bite<span>Buddy</span></BrandLogo>
                    <HeaderActions>
                        <SearchInput
                            type="search"
                            placeholder="Search food items..."
                            onChange={searchFood}
                        />
                        <ViewCartBtn onClick={() => setIsCartOpen(true)}>
                            🛒 View Cart {totalCartItems > 0 && <span className="badge">{totalCartItems}</span>}
                        </ViewCartBtn>
                    </HeaderActions>
                </div>
                <FilterTabs>
                    {filterBtns.map((btn) => (
                        <Button
                            key={btn.type}
                            name={btn.name}
                            type={btn.type}
                            onClick={() => filterFood(btn.type)}
                            isActive={selectedBtn === btn.type}
                        />
                    ))}
                </FilterTabs>
            </HeaderSection>

            {/* Grid Menu Section */}
            <MenuDisplayGrid>
                {filteredData?.map((food) => (
                    <FoodCard key={food.name}>
                        <div className="card-image">
                            <img src={`${BASE_URL}${food.image}`} alt={food.name} />
                        </div>
                        <div className="card-info">
                            <h3>{food.name}</h3>
                            <p>{food.text || "Freshly prepared delicious item made with selected premium ingredients."}</p>
                            <div className="card-footer">
                                <span className="price-tag">₹{food.price.toFixed(2)}</span>
                                <AddToCartBtn onClick={() => addToCart(food)}>
                                    Add to Cart
                                </AddToCartBtn>
                            </div>
                        </div>
                    </FoodCard>
                ))}
            </MenuDisplayGrid>

            {/* Slide-out Drawer Cart Sheet Layer */}
            {isCartOpen && (
                <DrawerOverlay onClick={() => setIsCartOpen(false)}>
                    <DrawerSheet onClick={(e) => e.stopPropagation()}>
                        <DrawerHeader>
                            <h3>Your Food Basket ({totalCartItems})</h3>
                            <CloseBtn onClick={() => setIsCartOpen(false)}>✕</CloseBtn>
                        </DrawerHeader>

                        <CartList>
                            {cart.length === 0 ? (
                                <EmptyState>Your basket is currently empty.</EmptyState>
                            ) : (
                                cart.map((item) => (
                                    <CartItemRow key={item.name}>
                                        <div className="meta">
                                            <h4>{item.name}</h4>
                                            <span>₹{item.price.toFixed(2)} each</span>
                                        </div>
                                        <div className="controls">
                                            <button onClick={() => updateQuantity(item.name, -1)}>-</button>
                                            <span className="qty">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.name, 1)}>+</button>
                                        </div>
                                        <span className="item-total">₹{(item.price * item.quantity).toFixed(2)}</span>
                                    </CartItemRow>
                                ))
                            )}
                        </CartList>

                        {cart.length > 0 && (
                            <DrawerFooter>
                                <div className="subtotal-box">
                                    <span>Subtotal Amount:</span>
                                    <strong>₹{cartSubtotal.toFixed(2)}</strong>
                                </div>
                                <FooterActionGroup>
                                    <ClearBtn onClick={clearCart}>Clear All</ClearBtn>
                                    <CheckoutBtn onClick={() => alert("Demo checkout completed!")}>
                                        Place Order
                                    </CheckoutBtn>
                                </FooterActionGroup>
                            </DrawerFooter>
                        )}
                    </DrawerSheet>
                </DrawerOverlay>
            )}
        </PageWrapper>
    );
};

export default CustomerMenu;

/* Styled Components Layout */
const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: #fcfcfd;
  color: #1d1d1f;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
`;

const HeaderSection = styled.header`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  padding: 24px 40px;
  position: sticky;
  top: 0;
  z-index: 50;

  .header-top {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
  }

  @media (max-width: 768px) {
    padding: 16px;
    .header-top {
      flex-direction: column;
    }
  }
`;

const BrandLogo = styled.h1`
  font-size: 24px;
  font-weight: 800;
  letter-spacing: -0.5px;
  color: #1d1d1f;
  margin: 0;

  span {
    color: #ff4343;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
  }
`;

const SearchInput = styled.input`
  width: 320px;
  height: 40px;
  background: #f5f5f7;
  border: 1px solid transparent;
  border-radius: 10px;
  padding: 0 16px;
  font-size: 15px;
  color: #1d1d1f;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    background: #ffffff;
    border-color: #ff4343;
    box-shadow: 0 0 0 4px rgba(255, 67, 67, 0.15);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ViewCartBtn = styled.button`
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: white;
  padding: 0 16px;
  height: 40px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;

  &:hover {
    background: #f5f5f7;
  }

  .badge {
    background: #ff4343;
    color: white;
    font-size: 11px;
    font-weight: 700;
    border-radius: 20px;
    padding: 2px 6px;
    min-width: 14px;
    text-align: center;
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const FilterTabs = styled.div`
  max-width: 1200px;
  margin: 20px auto 0 auto;
  display: flex;
  justify-content: center;
  gap: 12px;
`;

const MenuDisplayGrid = styled.main`
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 30px;
  justify-items: center;
`;

const FoodCard = styled.div`
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  padding: 16px;
  display: flex;
  gap: 16px;
  width: 100%;
  max-width: 380px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.06);
  }

  .card-image {
    width: 110px;
    height: 110px;
    flex-shrink: 0;
    border-radius: 14px;
    overflow: hidden;
    background: #f5f5f7;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .card-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;

    h3 {
      font-size: 17px;
      font-weight: 600;
      margin: 0 0 6px 0;
      color: #1d1d1f;
    }

    p {
      font-size: 13px;
      color: #86868b;
      margin: 0 0 12px 0;
      line-height: 1.4;
    }

    .card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .price-tag {
      color: #ff4343;
      font-size: 16px;
      font-weight: 700;
    }
  }
`;

const AddToCartBtn = styled.button`
  border: none;
  background: #ff4343;
  color: white;
  padding: 6px 14px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #e03232;
  }
`;

const ErrorMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 18px;
  font-weight: 600;
  color: #ff4343;
  background-color: #fcfcfd;
`;

/* Basket Sheet Components */
const DrawerOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
  z-index: 9999;
  display: flex;
  justify-content: flex-end;
`;

const DrawerSheet = styled.div`
  background: white;
  width: 100%;
  max-width: 440px;
  height: 100%;
  box-shadow: -10px 0 30px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
  animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes slideIn {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }
`;

const DrawerHeader = styled.div`
  padding: 24px;
  border-bottom: 1px solid rgba(0,0,0,0.06);
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 700;
  }
`;

const CloseBtn = styled.button`
  border: none;
  background: none;
  font-size: 18px;
  cursor: pointer;
  color: #86868b;
`;

const CartList = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const EmptyState = styled.div`
  text-align: center;
  color: #86868b;
  font-size: 14px;
  margin-top: 40px;
`;

const CartItemRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(0,0,0,0.04);
  gap: 12px;

  .meta {
    width: 45%;
    h4 {
      margin: 0 0 2px 0;
      font-size: 14px;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    span {
      font-size: 12px;
      color: #86868b;
    }
  }

  .controls {
    display: flex;
    align-items: center;
    background: #f5f5f7;
    border-radius: 6px;
    padding: 2px;

    button {
      border: none;
      background: none;
      width: 24px;
      height: 24px;
      font-weight: bold;
      cursor: pointer;
    }
    .qty {
      font-size: 13px;
      font-weight: 600;
      width: 20px;
      text-align: center;
    }
  }

  .item-total {
    font-size: 14px;
    font-weight: 600;
    width: 70px;
    text-align: right;
  }
`;

const DrawerFooter = styled.div`
  padding: 24px;
  border-top: 1px solid rgba(0,0,0,0.06);
  background: #f5f5f7;
  /* Add safe bottom margin so the basket buttons clear the floating HUD layers completely */
  padding-bottom: 74px; 

  .subtotal-box {
    display: flex;
    justify-content: space-between;
    font-size: 15px;
    margin-bottom: 16px;
    strong {
      font-size: 18px;
      color: #ff4343;
    }
  }
`;

const FooterActionGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const ClearBtn = styled.button`
  padding: 12px;
  background: transparent;
  border: 1px solid rgba(0,0,0,0.15);
  font-weight: 600;
  border-radius: 10px;
  font-size: 14px;
  cursor: pointer;
`;

const CheckoutBtn = styled.button`
  flex-grow: 1;
  padding: 12px;
  background: #ff4343;
  color: white;
  border: none;
  font-weight: 700;
  border-radius: 10px;
  font-size: 14px;
  cursor: pointer;
`;