import { styled } from 'styled-components';

export const ContainerCS = styled.div`
  padding: 20px;
`;

export const ContainerFiltering = styled.div``;

export const SectionTrueReplied = styled.section``;

export const SectionFalseReplied = styled.section``;

export const SpaceTitle = styled.div``;

export const SpaceListing = styled.h1``;

export const LiInquiryItem = styled.li`
  padding: 10px;
  border: 1px solid #000;
`;

export const TableHead = styled.thead`
  width: 100%;
  color: #637381;

  & > tr > th {
    background-color: #f4f6f8;
    padding: 1em 0.5em;
    text-align: center;
    font-size: 15px;
  }

  & > tr > th:nth-child(1) {
    width: 100px;
  }
  & > tr > th:nth-child(2) {
    width: 150px;
  }
`;

export const TableBody = styled.tbody`
  font-size: 0.7777777778em;
  & > tr > td {
    vertical-align: middle;
    padding: 1em;
    border-bottom: 1px solid #f1f3f4;
    white-space: nowrap;
    overflow: hidden;
    &:not(:nth-child(3)) {
      text-align: center;
    }
  }
  & > tr > td:nth-child(2) {
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    align-items: center;
  }
  & > tr > td:nth-child(3) {
    overflow: hidden;
    text-overflow: ellipsis;
    padding-left: 36px;
  }
`;

export const ProfileImgFigure = styled.figure`
  width: 30px;
  height: 30px;
  margin-right: 10px;
  overflow: hidden;
`;
export const ProfileImgSize = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

export const TitleInquiryItem = styled.td`
  &:hover {
    cursor: pointer;
  }
`;

export const Navigation = styled.nav`
  padding: 1em;
  display: flex;
  justify-content: flex-end;
  gap: 1em;
`;

export const TableRow = styled.tr<{ $isAnswered: boolean }>`
  background-color: ${({ $isAnswered }) => ($isAnswered ? '#fff' : '#f9f9f9')};
  color: ${({ $isAnswered }) => ($isAnswered ? '#000' : '#848484')};
`;
