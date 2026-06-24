// app/src/App.jsx
import { useState, useEffect } from "react";
import styled from "styled-components";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Sidebar from "./Components/Sidebar";
import CustomerMenu from "./pages/CustomerMenu";
import BillingPOS from "./pages/BillingPOS";
import StockLedger from "./pages/StockLedger";
import StaffPortal from "./pages/StaffPortal";

const MainAppContent = () => {
  const { role } = useAuth();
  const [activeTab, setActiveTab] = useState("pos");
  
  // State to manage the collapsible sidebar transition
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Determine which management tabs a role has permission to access
  const allowedViews = role === "admin" ? ["pos", "stock", "staff"] : role === "staff" ? ["pos", "stock"] : [];

  // Automatically adjust default active views when switching roles inside the HUD
  useEffect(() => {
    if (role === "public") {
      setActiveTab("public");
    } else {
      setActiveTab("pos");
    }
  }, [role]);

  // Route wrapper matching current component permissions
  const renderDashboardContent = () => {
    switch (activeTab) {
      case "pos":
        return allowedViews.includes("pos") ? <BillingPOS /> : <AccessDenied />;
      case "stock":
        return allowedViews.includes("stock") ? <StockLedger /> : <AccessDenied />;
      case "staff":
        return allowedViews.includes("staff") ? <StaffPortal /> : <AccessDenied />;
      default:
        return <CustomerMenu />;
    }
  };

  // Render clean B2C menu if role is public, else wrap inside a fluid panel with the layout sidebar
  if (role === "public") {
    return <CustomerMenu />;
  }

  return (
    <DashboardLayoutContainer>
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        allowedViews={allowedViews}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />
      <MainDisplayViewport>
        {renderDashboardContent()}
      </MainDisplayViewport>
    </DashboardLayoutContainer>
  );
};

// Fallback message component for unauthenticated role exceptions
const AccessDenied = () => (
  <CenteredErrorFallback>
    <h3>Access Unauthorized</h3>
    <p>Your current workspace privilege tier does not have authorization to view this segment ledger data.</p>
  </CenteredErrorFallback>
);

const App = () => {
  return (
    <AuthProvider>
      <MainAppContent />
    </AuthProvider>
  );
};

export default App;

/* Shell Wrapper Layout Styling */
const DashboardLayoutContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #f5f5f7;
`;

const MainDisplayViewport = styled.main`
  flex-grow: 1;
  height: 100vh;
  overflow-y: auto;
  position: relative;
`;

const CenteredErrorFallback = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  color: #1d1d1f;
  text-align: center;
  padding: 24px;

  h3 {
    font-size: 20px;
    font-weight: 700;
    color: #ff4343;
    margin: 0 0 8px 0;
  }

  p {
    font-size: 14px;
    color: #86868b;
    max-width: 400px;
    margin: 0;
    line-height: 1.4;
  }
`;