// app/src/pages/StockLedger.jsx
import { useState } from "react";
import styled from "styled-components";

const initialStockData = [
    { id: 1, name: "Premium Basmati Rice", category: "Dry Goods", quantity: 120, unit: "Kg", minThreshold: 30 },
    { id: 2, name: "Refined Sunflower Oil", category: "Liquids", quantity: 15, unit: "Liters", minThreshold: 20 }, // Low Stock
    { id: 3, name: "Fresh Chicken Breast", category: "Meats", quantity: 45, unit: "Kg", minThreshold: 15 },
    { id: 4, name: "Whole Milk Pouches", category: "Dairy", quantity: 8, unit: "Liters", minThreshold: 10 }, // Low Stock
    { id: 5, name: "Organic Tomato Ketchup", category: "Condiments", quantity: 24, unit: "Boxes", minThreshold: 5 },
];

const StockLedger = () => {
    const [inventory, setInventory] = useState(initialStockData);
    const [activeModal, setActiveModal] = useState(null); // 'in' or 'out'
    const [selectedItem, setSelectedItem] = useState(null);
    const [adjustQty, setAdjustQty] = useState("");

    const openAdjustmentModal = (type, item) => {
        setActiveModal(type);
        setSelectedItem(item);
        setAdjustQty("");
    };

    const handleAdjustmentSubmit = (e) => {
        e.preventDefault();
        const qtyValue = parseInt(adjustQty, 10);
        if (!qtyValue || qtyValue <= 0) return;

        setInventory((prev) =>
            prev.map((item) => {
                if (item.id === selectedItem.id) {
                    const multiplier = activeModal === "in" ? 1 : -1;
                    const newQty = Math.max(0, item.quantity + qtyValue * multiplier);
                    return { ...item, quantity: newQty };
                }
                return item;
            })
        );

        setActiveModal(null);
        setSelectedItem(null);
    };

    return (
        <LedgerWrapper>
            <HeaderArea>
                <h2>Inventory Stock Ledger</h2>
                <p>Monitor raw ingredient assets, log incoming supplies, and manage kitchen consumption thresholds.</p>
            </HeaderArea>

            <TableContainer>
                <StockTable>
                    <thead>
                        <tr>
                            <th>Ingredient Name</th>
                            <th>Category</th>
                            <th>Current Stock</th>
                            <th>Status</th>
                            <th style={{ textAlign: "right" }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventory.map((item) => {
                            const isLowStock = item.quantity <= item.minThreshold;
                            return (
                                <tr key={item.id}>
                                    <td className="item-name">{item.name}</td>
                                    <td>{item.category}</td>
                                    <td className="item-qty">
                                        {item.quantity} <span className="unit-label">{item.unit}</span>
                                    </td>
                                    <td>
                                        <StatusBadge low={isLowStock}>
                                            {isLowStock ? "Low Stock Alert" : "Healthy Stock"}
                                        </StatusBadge>
                                    </td>
                                    <td>
                                        <ActionCellGroup>
                                            <LogBtn className="log-in" onClick={() => openAdjustmentModal("in", item)}>
                                                Stock In
                                            </LogBtn>
                                            <LogBtn className="log-out" onClick={() => openAdjustmentModal("out", item)}>
                                                Stock Out
                                            </LogBtn>
                                        </ActionCellGroup>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </StockTable>
            </TableContainer>

            {/* Pop-up Adjustment Layer */}
            {activeModal && selectedItem && (
                <ModalOverlay onClick={() => setActiveModal(null)}>
                    <ModalCard onClick={(e) => e.stopPropagation()}>
                        <h3>
                            Log {activeModal === "in" ? "Incoming Supply" : "Kitchen Consumption"}
                        </h3>
                        <p className="modal-sub">
                            Item: <strong>{selectedItem.name}</strong> (Current: {selectedItem.quantity} {selectedItem.unit})
                        </p>

                        <form onSubmit={handleAdjustmentSubmit}>
                            <div className="input-field">
                                <label>Quantity ({selectedItem.unit})</label>
                                <input
                                    type="number"
                                    placeholder="Enter positive integer value"
                                    value={adjustQty}
                                    onChange={(e) => setAdjustQty(e.target.value)}
                                    min="1"
                                    required
                                    autoFocus
                                />
                            </div>

                            <ModalActions>
                                <CancelBtn type="button" onClick={() => setActiveModal(null)}>
                                    Cancel
                                </CancelBtn>
                                <SubmitBtn type="submit" isOut={activeModal === "out"}>
                                    Confirm {activeModal === "in" ? "Stock In" : "Stock Out"}
                                </SubmitBtn>
                            </ModalActions>
                        </form>
                    </ModalCard>
                </ModalOverlay>
            )}
        </LedgerWrapper>
    );
};

export default StockLedger;

/* Structural Configurations */
const LedgerWrapper = styled.div`
  padding: 40px;
  background-color: #f5f5f7;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
`;

const HeaderArea = styled.div`
  margin-bottom: 32px;
  h2 {
    font-size: 26px;
    font-weight: 700;
    color: #1d1d1f;
    margin: 0 0 6px 0;
  }
  p {
    font-size: 14px;
    color: #86868b;
    margin: 0;
  }
`;

const TableContainer = styled.div`
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.01);
  overflow: hidden;
`;

const StockTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;

  th, td {
    padding: 16px 24px;
    font-size: 14px;
  }

  th {
    background: #fbfbfe;
    font-weight: 600;
    color: #86868b;
    border-bottom: 1px solid rgba(0, 0, 0, 0.04);
  }

  tr:not(:last-child) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.03);
  }

  .item-name {
    font-weight: 600;
    color: #1d1d1f;
  }

  .item-qty {
    font-weight: 700;
    color: #1d1d1f;
    .unit-label {
      font-weight: 400;
      color: #86868b;
      font-size: 12px;
    }
  }
`;

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  background: ${(props) => (props.low ? "rgba(255, 67, 67, 0.1)" : "rgba(52, 199, 89, 0.1)")};
  color: ${(props) => (props.low ? "#ff4343" : "#34c759")};
`;

const ActionCellGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const LogBtn = styled.button`
  border: 1px solid transparent;
  background: none;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;

  &.log-in {
    border-color: rgba(52, 199, 89, 0.2);
    color: #34c759;
    &:hover {
      background: rgba(52, 199, 89, 0.05);
    }
  }

  &.log-out {
    border-color: rgba(255, 67, 67, 0.2);
    color: #ff4343;
    &:hover {
      background: rgba(255, 67, 67, 0.05);
    }
  }
`;

/* Minimalist Modal UI Layout */
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const ModalCard = styled.div`
  background: #ffffff;
  border-radius: 18px;
  width: 100%;
  max-width: 400px;
  padding: 24px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);

  h3 {
    margin: 0 0 6px 0;
    font-size: 18px;
    font-weight: 700;
    color: #1d1d1f;
  }

  .modal-sub {
    font-size: 13px;
    color: #86868b;
    margin: 0 0 20px 0;
  }

  .input-field {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 24px;

    label {
      font-size: 12px;
      font-weight: 600;
      color: #86868b;
    }

    input {
      height: 40px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      padding: 0 12px;
      font-size: 14px;
      outline: none;
      background: #f5f5f7;
      &:focus {
        background: #ffffff;
        border-color: #ff4343;
      }
    }
  }
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const CancelBtn = styled.button`
  background: transparent;
  border: none;
  padding: 10px 16px;
  font-weight: 600;
  font-size: 14px;
  color: #86868b;
  cursor: pointer;
`;

const SubmitBtn = styled.button`
  border: none;
  background: ${(props) => (props.isOut ? "#ff4343" : "#34c759")};
  color: white;
  padding: 10px 20px;
  font-weight: 600;
  font-size: 14px;
  border-radius: 8px;
  cursor: pointer;
`;