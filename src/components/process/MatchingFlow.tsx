import { useState } from 'react';
import { Container, Section, SectionTitle } from '../../pages/Main';
import * as S from './MatchingFlow.styled';
import { bubble, tabPanel_1, tabPanel_3 } from '../../assets';
interface TabViewProps {
  index: number;
  name: JSX.Element;
  content: JSX.Element;
}

const MatchingFlow = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs: TabViewProps[] = [
    { index: 1, name: <TabTitle1 />, content: <img src={tabPanel_3} alt="" /> },
    { index: 2, name: <TabTitle2 />, content: <img src={tabPanel_1} alt="" /> },
    { index: 3, name: <TabTitle3 />, content: <img src={tabPanel_3} alt="" /> },
    { index: 4, name: <TabTitle4 />, content: <img src={tabPanel_1} alt="" /> },
  ];

  return (
    <Section style={{ backgroundColor: '#f8f8f8' }}>
      <Container>
        <SectionTitle style={{ textAlign: 'center', margin: '0 auto' }}>가까운 튜터와 대화 후, 매칭하고 만나기까지</SectionTitle>
        <S.FlowTabWrap>
          <S.FlowTabList>
            {tabs.map((el, idx) => (
              <S.FlowTabItem
                key={el.index}
                onClick={() => {
                  setActiveTab(idx);
                }}
                onMouseOver={() => {
                  setActiveTab(idx);
                }}
              >
                {el.name}
              </S.FlowTabItem>
            ))}
          </S.FlowTabList>
          <S.FlowPanel>{tabs[activeTab].content}</S.FlowPanel>
        </S.FlowTabWrap>
      </Container>
    </Section>
  );
};

export default MatchingFlow;

const TabTitle1 = () => {
  return (
    <S.TabBubbleWrap>
      <S.TabNum className="num">1</S.TabNum>
      <S.TabBubble>
        <S.TabBubbleBg>
          <img src={bubble} alt="" />
        </S.TabBubbleBg>
        <S.TabBubbleContent>
          <S.BubbletTit>지역설정 하기</S.BubbletTit>
          <S.BubbleTxt>나의 위치 설정 또는 내가 원하는 지역을 선택하여 그 주변에 있는 튜터를 찾아보세요.</S.BubbleTxt>
        </S.TabBubbleContent>
      </S.TabBubble>
    </S.TabBubbleWrap>
  );
};
const TabTitle2 = () => {
  return (
    <S.TabBubbleWrap>
      <S.TabNum className="num">2</S.TabNum>
      <S.TabBubble>
        <S.TabBubbleBg>
          <img src={bubble} alt="" />
        </S.TabBubbleBg>
        <S.TabBubbleContent>
          <S.BubbletTit>한번 더, 필터링 하기</S.BubbletTit>
          <S.BubbleTxt>나의 위치 설정 또는 내가 원하는 지역을 선택하여 그 주변에 있는 튜터를 찾아보세요.</S.BubbleTxt>
        </S.TabBubbleContent>
      </S.TabBubble>
    </S.TabBubbleWrap>
  );
};
const TabTitle3 = () => {
  return (
    <S.TabBubbleWrap>
      <S.TabNum className="num">3</S.TabNum>
      <S.TabBubble>
        <S.TabBubbleBg>
          <img src={bubble} alt="" />
        </S.TabBubbleBg>
        <S.TabBubbleContent>
          <S.BubbletTit>튜터와 대화하기</S.BubbletTit>
          <S.BubbleTxt>나의 위치 설정 또는 내가 원하는 지역을 선택하여 그 주변에 있는 튜터를 찾아보세요.</S.BubbleTxt>
        </S.TabBubbleContent>
      </S.TabBubble>
    </S.TabBubbleWrap>
  );
};
const TabTitle4 = () => {
  return (
    <S.TabBubbleWrap>
      <S.TabNum className="num">4</S.TabNum>
      <S.TabBubble>
        <S.TabBubbleBg>
          <img src={bubble} alt="" />
        </S.TabBubbleBg>
        <S.TabBubbleContent>
          <S.BubbletTit>매칭하기</S.BubbletTit>
          <S.BubbleTxt>나의 위치 설정 또는 내가 원하는 지역을 선택하여 그 주변에 있는 튜터를 찾아보세요.</S.BubbleTxt>
        </S.TabBubbleContent>
      </S.TabBubble>
    </S.TabBubbleWrap>
  );
};
