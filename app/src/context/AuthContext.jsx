// app/src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import styled from "styled-components";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    // Pull previous role from localStorage if it exists, default to 'public'
    const [role, setRole] = useState(() => {
        return localStorage.getItem("demo_role") || "public";
    });

    useEffect(() => {
        localStorage.setItem("demo_role", role);
    }, [role]);

    const switchRole = (newRole) => {
        setRole(newRole);
    };

    return (
        <AuthContext.Provider value={{ role, switchRole }}>
            {children}

            {/* Dev Role Switcher Control HUD Overlay */}
            <DevOverlay>
                <div className="hud-title">Demo Role HUD</div>
                <div className="btn-group">
                    <RoleBtn active={role === "public"} onClick={() => switchRole("public")}>
                        Customer
                    </RoleBtn>
                    <RoleBtn active={role === "staff"} onClick={() => switchRole("staff")}>
                        Staff (POS)
                    </RoleBtn>
                    <RoleBtn active={role === "admin"} onClick={() => switchRole("admin")}>
                        Admin
                    </RoleBtn>
                </div>
            </DevOverlay>
        </AuthContext.Provider>
    );
};

// Custom React hook to safely ingest authentication state contexts
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be consumed within an AuthProvider scope");
    }
    return context;
};

/* Glassmorphic Minimalist UI Styling for the Dev HUD Switcher */
const DevOverlay = styled.div`
  position: fixed;
  bottom: 12px;
  right: 12px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  padding: 8px 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  z-index: 999999; /* Higher stacking index to sit cleanly over layout wrappers */
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  .hud-title {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: #86868b;
  }

  .btn-group {
    display: flex;
    gap: 4px;
  }
`;

const RoleBtn = styled.button`
  border: none;
  outline: none;
  padding: 4px 10px;
  font-size: 11px;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  background: ${(props) => (props.active ? "#1d1d1f" : "rgba(0,0,0,0.04)")};
  color: ${(props) => (props.active ? "#ffffff" : "#1d1d1f")};
  transition: all 0.15s ease;

  &:hover {
    background: ${(props) => (props.active ? "#1d1d1f" : "rgba(0,0,0,0.08)")};
  }
`;