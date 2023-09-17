import { useEffect, useState } from 'react';
import { bubble, tabPanel_1, tabPanel_2, tabPanel_3, tabPanel_4 } from '../../../assets';
import { Container, Section, SectionTitle } from '../Main';
import * as S from './MatchingFlow.styled';
type TabViewProps = {
  index: number;
  // name: JSX.Element;
  name: string;
  img: string;
  content: string;
};

// const tabs: TabViewProps[] = [
//   { index: 1, name: <TabTitle1 />, content: <img src={tabPanel_1} alt="flow 01" /> },
//   { index: 2, name: <TabTitle2 />, content: <img src={tabPanel_2} alt="flow 02" /> },
//   { index: 3, name: <TabTitle3 />, content: <img src={tabPanel_3} alt="flow 03" /> },
//   { index: 4, name: <TabTitle4 />, content: <img src={tabPanel_4} alt="flow 04" /> },
// ];

const tabs: TabViewProps[] = [
  { index: 1, name: '지역설정 하기', content: '나의 위치 설정 또는 내가 원하는 지역을 선택하여 그 주변에 있는 튜터를 찾아보세요.', img: tabPanel_1 },
  { index: 2, name: '한번 더, 필터링 하기', content: '나의 위치 설정 또는 내가 원하는 지역을 선택하여 그 주변에 있는 튜터를 찾아보세요.', img: tabPanel_2 },
  { index: 3, name: '튜터와 대화하기', content: '나의 위치 설정 또는 내가 원하는 지역을 선택하여 그 주변에 있는 튜터를 찾아보세요.', img: tabPanel_3 },
  { index: 4, name: '매칭하기', content: '나의 위치 설정 또는 내가 원하는 지역을 선택하여 그 주변에 있는 튜터를 찾아보세요.', img: tabPanel_4 },
];

const TabTitle = ({ data, active }: { data: Omit<TabViewProps, 'img'>; active: boolean }) => {
  return (
    <S.TabBubbleWrap className={active ? 'active' : undefined}>
      <S.TabNum className="num">{data.index}</S.TabNum>
      <S.TabBubble>
        <S.TabBubbleBg>
          <img src={bubble} alt="bubble" />
        </S.TabBubbleBg>
        <S.TabBubbleContent>
          <S.BubbletTit>{data.name}</S.BubbletTit>
          <S.BubbleTxt>{data.content}</S.BubbleTxt>
        </S.TabBubbleContent>
      </S.TabBubble>
    </S.TabBubbleWrap>
  );
};

const MatchingFlow = () => {
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveTab((prev) => {
        if (prev === 4) {
          return 1;
        } else {
          return prev + 1;
        }
      });
    }, 3000);

    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <Section className="main">
      <Container>
        <SectionTitle className="matched_review">가까운 튜터와 대화 후, 매칭하고 만나기까지</SectionTitle>
        <S.FlowTabWrap>
          <S.FlowTabList>
            {tabs.map((el) => (
              <S.FlowTabItem
                key={el.index}
                onClick={() => {
                  setActiveTab(el.index);
                }}
                onMouseOver={() => {
                  setActiveTab(el.index);
                }}
              >
                <TabTitle data={el} active={el.index === activeTab} />
              </S.FlowTabItem>
            ))}
          </S.FlowTabList>
          <S.FlowPanel>
            <img src={tabs[activeTab - 1].img} alt={tabs[activeTab - 1].name} />
          </S.FlowPanel>
        </S.FlowTabWrap>
      </Container>
    </Section>
  );
};

export default MatchingFlow;
