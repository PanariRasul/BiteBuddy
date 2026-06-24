// app/src/components/Loader.jsx
import styled, { keyframes } from "styled-components";

const Loader = () => {
    return (
        <LoaderContainer>
            <CookingScene>
                {/* The Food Item jumping in mid-air */}
                <FoodItem />

                {/* The Frying Pan executing the flip */}
                <FryingPan>
                    <PanBase />
                    <PanHandle />
                </FryingPan>

                {/* Sizzling smoke/heat indicators */}
                <SizzleSmoke />
            </CookingScene>
            <h1>Preparing Delicious Food...</h1>
        </LoaderContainer>
    );
};

export default Loader;

/* Keyframes for Cooking Actions */
const flipFood = keyframes`
  0% {
    transform: translateY(0) scaleX(1) scaleY(1) rotate(0deg);
  }
  35% {
    transform: translateY(-60px) scaleX(0.9) scaleY(1.1) rotate(180deg);
  }
  70% {
    transform: translateY(0) scaleX(1.1) scaleY(0.9) rotate(360deg);
  }
  100% {
    transform: translateY(0) scaleX(1) scaleY(1) rotate(360deg);
  }
`;

const tossPan = keyframes`
  0%, 100% {
    transform: rotate(0deg);
  }
  30% {
    transform: translateY(4px) rotate(-5deg);
  }
  40% {
    transform: translateY(-8px) rotate(8deg);
  }
  65% {
    transform: translateY(0) rotate(0deg);
  }
`;

const smokeRise = keyframes`
  0% {
    transform: translateY(0) scaleX(0.8);
    opacity: 0.5;
  }
  50% {
    transform: translateY(-15px) scaleX(1.2);
    opacity: 0.8;
  }
  100% {
    transform: translateY(-30px) scaleX(0.5);
    opacity: 0;
  }
`;

/* Styled Components Layout */
const LoaderContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f7;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  h1 {
    margin-top: 32px;
    font-size: 18px;
    font-weight: 700;
    color: #1d1d1f;
    letter-spacing: -0.2px;
  }
`;

const CookingScene = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const FryingPan = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  transform-origin: left center;
  animation: ${tossPan} 1.6s infinite ease-in-out;
  margin-left: -30px; /* Balance handle offsetting center balance */
`;

const PanBase = styled.div`
  width: 64px;
  height: 16px;
  background: #1d1d1f;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  position: relative;

  /* Lip rim detail */
  &::before {
    content: "";
    position: absolute;
    top: -3px;
    left: 0;
    width: 100%;
    height: 4px;
    background: #3a3a3c;
    border-radius: 2px;
  }
`;

const PanHandle = styled.div`
  width: 44px;
  height: 8px;
  background: #1d1d1f;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  position: relative;
  left: -2px;
`;

const FoodItem = styled.div`
  width: 40px;
  height: 8px;
  background: #ff9f0a; /* High-end golden pancake / egg yolk aesthetic */
  border-radius: 6px;
  position: absolute;
  bottom: 24px;
  left: calc(50% - 32px); /* Centered directly over the cooking base pan area */
  transform-origin: center center;
  animation: ${flipFood} 1.6s infinite ease-in-out;
  box-shadow: inset 0 -2px 0 rgba(0,0,0,0.1);
`;

const SizzleSmoke = styled.div`
  position: absolute;
  bottom: 20px;
  left: calc(50% - 24px);
  width: 24px;
  height: 4px;
  background: rgba(0, 0, 0, 0.04);
  border-radius: 50%;
  
  &::before, &::after {
    content: "";
    position: absolute;
    bottom: 6px;
    width: 3px;
    height: 12px;
    background: rgba(29, 29, 31, 0.15);
    border-radius: 2px;
    animation: ${smokeRise} 0.8s infinite ease-out;
  }

  &::before {
    left: 4px;
    animation-delay: 0.2s;
  }

  &::after {
    right: 4px;
    animation-delay: 0.5s;
    height: 8px;
  }
`;