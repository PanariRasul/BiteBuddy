// app/src/pages/StaffPortal.jsx
import { useState } from "react";
import styled from "styled-components";

const initialStaffData = [
    { id: 1, name: "Alexander Wright", role: "Head Chef", status: "On Shift", attendance: "98%", email: "alex@foodyzone.com" },
    { id: 2, name: "Sarah Jenkins", role: "POS Operator / Server", status: "On Shift", attendance: "94%", email: "sarah.j@foodyzone.com" },
    { id: 3, name: "Marcus Brody", role: "Sous Chef", status: "Off Duty", attendance: "91%", email: "marcus@foodyzone.com" },
    { id: 4, name: "Elena Rostova", role: "Floor Supervisor", status: "On Shift", attendance: "96%", email: "elena@foodyzone.com" },
    { id: 5, name: "David Kim", role: "Server", status: "Off Duty", attendance: "88%", email: "david.k@foodyzone.com" },
];

const StaffPortal = () => {
    const [staffList, setStaffList] = useState(initialStaffData);

    const toggleShiftStatus = (id) => {
        setStaffList((prev) =>
            prev.map((member) => {
                if (member.id === id) {
                    const nextStatus = member.status === "On Shift" ? "Off Duty" : "On Shift";
                    return { ...member, status: nextStatus };
                }
                return member;
            })
        );
    };

    return (
        <PortalWrapper>
            <HeaderArea>
                <h2>Staff Maintenance Portal</h2>
                <p>Manage restaurant personnel directories, track active floor rosters, and review historical operational metrics.</p>
            </HeaderArea>

            <MetricsRow>
                <MetricMiniCard>
                    <span className="label">Total Personnel</span>
                    <span className="value">{staffList.length}</span>
                </MetricMiniCard>
                <MetricMiniCard>
                    <span className="label">Active On-Shift</span>
                    <span className="value active-count">
                        {staffList.filter((s) => s.status === "On Shift").length}
                    </span>
                </MetricMiniCard>
                <MetricMiniCard>
                    <span className="label">Average Floor Attendance</span>
                    <span className="value">93.4%</span>
                </MetricMiniCard>
            </MetricsRow>

            <DirectoryGrid>
                {staffList.map((member) => (
                    <StaffCard key={member.id}>
                        <CardTop>
                            <AvatarPlaceholder>{member.name.split(" ").map(n => n[0]).join("")}</AvatarPlaceholder>
                            <div className="meta">
                                <h3>{member.name}</h3>
                                <span className="role-tag">{member.role}</span>
                            </div>
                        </CardTop>

                        <CardBody>
                            <div className="info-row">
                                <span className="info-label">Email:</span>
                                <span className="info-val">{member.email}</span>
                            </div>
                            <div className="info-row">
                                <span className="info-label">Attendance Record:</span>
                                <span className="info-val highlight">{member.attendance}</span>
                            </div>
                            <div className="info-row">
                                <span className="info-label">Duty Status:</span>
                                <StatusIndicator active={member.status === "On Shift"}>
                                    {member.status}
                                </StatusIndicator>
                            </div>
                        </CardBody>

                        <CardActions>
                            <ToggleButton
                                isOn={member.status === "On Shift"}
                                onClick={() => toggleShiftStatus(member.id)}
                            >
                                {member.status === "On Shift" ? "Clock Out Member" : "Clock In Member"}
                            </ToggleButton>
                        </CardActions>
                    </StaffCard>
                ))}
            </DirectoryGrid>
        </PortalWrapper>
    );
};

export default StaffPortal;

/* Layout & Typography Configuration */
const PortalWrapper = styled.div`
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

const MetricsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`;

const MetricMiniCard = styled.div`
  background: #ffffff;
  border-radius: 14px;
  padding: 20px;
  border: 1px solid rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  gap: 4px;

  .label {
    font-size: 12px;
    font-weight: 600;
    color: #86868b;
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }

  .value {
    font-size: 24px;
    font-weight: 700;
    color: #1d1d1f;

    &.active-count {
      color: #34c759;
    }
  }
`;

const DirectoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
`;

const StaffCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.01);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.04);
  }
`;

const CardTop = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 18px;

  .meta {
    h3 {
      font-size: 16px;
      font-weight: 600;
      margin: 0 0 4px 0;
      color: #1d1d1f;
    }
    .role-tag {
      font-size: 12px;
      font-weight: 500;
      color: #86868b;
      background: #f5f5f7;
      padding: 2px 8px;
      border-radius: 4px;
    }
  }
`;

const AvatarPlaceholder = styled.div`
  width: 44px;
  height: 44px;
  background: #ff4343;
  color: #ffffff;
  font-weight: 700;
  font-size: 14px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: -0.5px;
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-bottom: 18px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);

  .info-row {
    display: flex;
    justify-content: space-between;
    font-size: 13px;

    .info-label {
      color: #86868b;
    }
    .info-val {
      color: #1d1d1f;
      font-weight: 500;
      &.highlight {
        font-weight: 700;
      }
    }
  }
`;

const StatusIndicator = styled.span`
  font-weight: 600;
  color: ${(props) => (props.active ? "#34c759" : "#86868b")};
`;

const CardActions = styled.div`
  margin-top: 16px;
`;

const ToggleButton = styled.button`
  width: 100%;
  border: 1px solid ${(props) => (props.isOn ? "rgba(0,0,0,0.1)" : "rgba(52, 199, 89, 0.2)")};
  background: ${(props) => (props.isOn ? "transparent" : "rgba(52, 199, 89, 0.04)")};
  color: ${(props) => (props.isOn ? "#1d1d1f" : "#34c759")};
  padding: 10px;
  font-size: 13px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: ${(props) => (props.isOn ? "rgba(0,0,0,0.02)" : "rgba(52, 199, 89, 0.08)")};
  }
`;