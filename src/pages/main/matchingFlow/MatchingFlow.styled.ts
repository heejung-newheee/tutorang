import { styled } from 'styled-components';
import { colors } from '../../../style/theme/colors';
export const FlowTabWrap = styled.div`
  display: flex;
  gap: 3rem;
  max-width: 890px;
  margin: 0 auto;
  margin-top: 140px;
  position: relative;
  > ul,
  article {
    width: calc((100% - 3rem) / 2);
  }
`;
export const FlowTabList = styled.ul`
  cursor: default;
  &::before {
    content: '';
    display: block;
    width: 7px;
    height: 100%;
    background-color: #ebebeb;
    clear: both;
    position: absolute;
    top: 7px;
    left: 15px;
    z-index: 1;
  }
`;
export const FlowTabItem = styled.li`
  position: relative;
  z-index: 2;
`;
export const FlowPanel = styled.article`
  img {
    transition: all 0.5s;
  }
`;

export const TabBubbleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  &:hover {
    > div.num {
      background-color: ${colors.primary};
    }
    div div {
      opacity: 1;
    }
  }
`;
export const TabNum = styled.div`
  width: 36px;
  height: 36px;
  margin-top: 7px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  line-height: 36px;
  color: #fff;
  background-color: #d8d8d8;
  border-radius: 50%;
  transition: all 0.3s;
`;

export const TabBubble = styled.div`
  position: relative;
  width: calc(100% - 40px);
  img {
    width: 100%;
  }
`;
export const TabBubbleBg = styled.div`
  opacity: 0;
  transition: all 0.3s;
`;
export const TabBubbleContent = styled.div`
  margin-left: 12px;
  padding: 22px;
  position: absolute;
  top: 0;
  left: 10px;
`;
export const BubbletTit = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 5px;
`;
export const BubbleTxt = styled.p`
  font-size: 16px;
`;
