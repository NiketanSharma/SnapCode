import styled from "styled-components";

const FeatureOuterBox = styled.div`
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  width: 1000px;
  background: rgba(15, 15, 15, 0.3);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 20px;
  color: #fff;
  z-index: 10;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);
`;

const FeatureInnerBox = styled.div`
  display: flex;
  width: ${(props) => props.withOfBox};
  height: ${(props) => props.heightOfBox};
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  margin: 0;
  text-align: left;
  justify-content: start;
  font-family: "JetBrains Mono", "Space Mono", monospace;
  font-size: 13px;
  color: #c9c9c9;
  padding: 0 16px;
  align-items: center;
  transition: all 0.2s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.15);
    background: rgba(255, 255, 255, 0.06);
  }
`;

const FeatureMediumBox = styled.div`
  display: flex;
  width: ${(props) => props.withOfBox};
  height: ${(props) => props.heightOfBox};
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  margin: 4px;
  text-align: center;
  justify-content: center;
  font-family: "JetBrains Mono", monospace;
  font-size: 12px;
  color: #c9c9c9;
  padding: 10px;
  align-items: center;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    border-color: rgba(255, 255, 255, 0.15);
    background: rgba(255, 255, 255, 0.08);
  }
`;

const FeatureGeneralBox = styled.div`
  display: flex;
  width: ${(props) => props.withOfBox};
  height: ${(props) => props.heightOfBox};
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  margin: 0;
  text-align: center;
  justify-content: start;
  font-family: "JetBrains Mono", monospace;
  font-size: 12px;
  color: #c9c9c9;
  padding: 8px;
  align-items: center;
`;

export {
  FeatureInnerBox,
  FeatureOuterBox,
  FeatureMediumBox,
  FeatureGeneralBox,
};
