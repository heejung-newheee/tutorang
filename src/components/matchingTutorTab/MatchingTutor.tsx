import React, { useState } from 'react';
import { Tabs, Tab, Typography, Box } from '@mui/material';
import { Views } from '../../supabase/database.types';
import { InfoItem, InfoList } from '../userInfo/UserInfo.styled';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { matchingCancel } from '../../api/match';

interface pageProps {
  matchList: Views<'matching_tutor_data'>[];
}

const TabPanel = (props: any) => {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};
const MatchingTutor = ({ matchList }: pageProps) => {
  const queryClient = useQueryClient();
  const cancelMatchMutation = useMutation(matchingCancel, {
    onSuccess: () => {
      queryClient.invalidateQueries(['matching']);
    },
  });
  const cancelMatch = async (id: string) => {
    cancelMatchMutation.mutate(id);
  };

  console.log(matchList);
  const [activeTab, setActiveTab] = useState<number>(0);
  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <div>
      <Tabs value={activeTab} onChange={handleTabChange} aria-label="tab menu">
        <Tab label="요청 대기" />
        <Tab label="매칭 완료" />
      </Tabs>
      <TabPanel value={activeTab} index={0}>
        {matchList &&
          matchList
            .filter((item: Views<'matching_tutor_data'>) => {
              return item.matched === false;
            })
            .map((item: Views<'matching_tutor_data'>) => {
              return (
                <InfoList key={item.id}>
                  <InfoItem>
                    <div>요청 상태{item.status}</div>
                    <div>날짜{item.created_at ? item.created_at.split('T')[0] : '날짜 없음'}</div>
                    <div>튜터 이름{item.tutor_name}</div>
                    <div>
                      지역{item.tutor_lc_1}|{item.tutor_lc_2}
                    </div>
                    <button onClick={() => item.id !== null && cancelMatch(item.id)}>요청 취소 버튼</button>
                  </InfoItem>
                </InfoList>
              );
            })}
      </TabPanel>
      <TabPanel value={activeTab} index={1}>
        {matchList &&
          matchList
            .filter((item: Views<'matching_tutor_data'>) => {
              return item.matched === true;
            })
            .map((item: Views<'matching_tutor_data'>) => {
              return (
                <InfoList key={item.id}>
                  <InfoItem>
                    <div>요청 상태{item.status}</div>
                    <div>날짜{item.created_at ? item.created_at.split('T')[0] : '날짜 없음'}</div>
                    <div>튜터 이름{item.tutor_name}</div>
                    <div>
                      지역{item.tutor_lc_1}|{item.tutor_lc_2}
                    </div>
                    <button onClick={() => item.id !== null && cancelMatch(item.id)}>요청 취소 버튼</button>
                  </InfoItem>
                </InfoList>
              );
            })}
      </TabPanel>
    </div>
  );
};

export default MatchingTutor;
