// app/src/components/Sidebar.jsx
import styled from "styled-components";

const Sidebar = ({ activeTab, setActiveTab, allowedViews, isCollapsed, setIsCollapsed }) => {
  const menuItems = [
    { id: "pos", label: "POS Billing Desk", icon: "🧾" },
    { id: "stock", label: "Stock Ledger", icon: "📦" },
    { id: "staff", label: "Staff Maintenance", icon: "👔" },
  ];

  const visibleItems = menuItems.filter((item) => allowedViews.includes(item.id));

  return (
    <SidebarWrapper className={isCollapsed ? "collapsed" : ""}>
      <BrandSection>
        {!isCollapsed ? (
          <div>
            <h3>Bite<span>Buddy</span></h3>
            <span className="sub">Workspace</span>
          </div>
        ) : (
          <BrandIcon>F<span>Z</span></BrandIcon>
        )}

        {/* Toggle Collapse Button */}
        <ToggleButton onClick={() => setIsCollapsed(!isCollapsed)} title={isCollapsed ? "Expand Menu" : "Collapse Menu"}>
          {isCollapsed ? "👉" : "👈"}
        </ToggleButton>
      </BrandSection>

      <NavigationLinks role="list">
        {visibleItems.map((item) => (
          <li key={item.id}>
            <TabButton
              active={activeTab === item.id}
              onClick={() => setActiveTab(item.id)}
              className={isCollapsed ? "icon-only" : ""}
              title={item.label}
            >
              <span className="icon">{item.icon}</span>
              {!isCollapsed && <span className="label">{item.label}</span>}
            </TabButton>
          </li>
        ))}
      </NavigationLinks>

      <FooterBranding>
        <p>{isCollapsed ? "v1.2" : "v1.2.0 Demo"}</p>
      </FooterBranding>
    </SidebarWrapper>
  );
};

export default Sidebar;

/* Collapsible Layout Configurations */
const SidebarWrapper = styled.nav`
  width: 260px;
  height: 100vh;
  background: #ffffff;
  border-right: 1px solid rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 32px 16px;
  position: sticky;
  top: 0;
  left: 0;
  box-sizing: border-box;
  transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 100;

  &.collapsed {
    width: 76px;
    padding: 32px 10px;
  }
`;

const BrandSection = styled.div`
  padding: 0 12px;
  margin-bottom: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  h3 {
    font-size: 20px;
    font-weight: 800;
    margin: 0;
    color: #1d1d1f;
    letter-spacing: -0.5px;
    span { color: #ff4343; }
  }

  .sub {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    color: #86868b;
    letter-spacing: 1px;
    display: inline-block;
    margin-top: 2px;
  }
`;

const BrandIcon = styled.div`
  font-size: 18px;
  font-weight: 900;
  color: #1d1d1f;
  span { color: #ff4343; }
`;

const ToggleButton = styled.button`
  border: none;
  background: #f5f5f7;
  cursor: pointer;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  transition: background 0.2s;

  &:hover {
    background: #e8e8ed;
  }
`;

const NavigationLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const TabButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border: none;
  outline: none;
  border-radius: 10px;
  cursor: pointer;
  background: ${(props) => (props.active ? "rgba(255, 67, 67, 0.08)" : "transparent")};
  color: ${(props) => (props.active ? "#ff4343" : "#1d1d1f")};
  font-size: 14px;
  font-weight: ${(props) => (props.active ? "700" : "600")};
  transition: all 0.15s ease;

  &:hover {
    background: ${(props) => (props.active ? "rgba(255, 67, 67, 0.08)" : "rgba(0,0,0,0.03)")};
  }

  &.icon-only {
    justify-content: center;
    padding: 12px 0;
  }

  .icon { font-size: 16px; }
`;

const FooterBranding = styled.div`
  padding: 0 12px;
  text-align: center;
  p {
    font-size: 11px;
    font-weight: 500;
    color: #86868b;
    margin: 0;
  }
`;