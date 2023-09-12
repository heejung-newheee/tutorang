export type TypeHeaderTitle = {
  [key: string]: { categoryKeyword: string; title: string; description: string }[];
};

export const CS_HEADER_TITLE: TypeHeaderTitle = {
  cs: [
    { categoryKeyword: 'customer-service', title: '고객센터', description: '튜터랑의 관련 문의사항을 이야기 해주세요' },
    { categoryKeyword: 'announcements', title: '공지사항', description: '튜터랑의 관련 문의사항을 이야기 해주세요' },
    { categoryKeyword: 'customer-support', title: '1:1 문의', description: '튜터랑의 관련 문의사항을 이야기 해주세요' },
  ],
};
