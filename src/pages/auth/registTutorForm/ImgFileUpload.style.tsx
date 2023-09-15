import styled from 'styled-components';

export const CertifiFilesArea = styled.div`
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 50px;
  @media screen and (max-width: 420px) {
    height: 45px;
  }
`;

export const CertifiIcon = styled.label`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  cursor: pointer;
`;

export const CertifiFilesP = styled.p<{ $role?: string }>`
  box-sizing: border-box;
  min-width: 245px;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 10px 5px 10px 10px;
  overflow: hidden;

  border: ${({ $role }) => {
    if ($role === 'guide') return '1px solid #696969';
    else return '1px solid #FE902F';
  }};
  border-radius: 3px;
  color: #aeaeae;
  @media screen and (max-width: 420px) {
    height: 45px;
  }
`;
export const Label = styled.label<{ id?: string }>`
  background-color: #f7f7f7;
  width: 100%;
  height: 50px;
  cursor: pointer;
  @media screen and (max-width: 420px) {
    height: 45px;
  }
`;

export const IconFileDelete = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FileInput = styled.input`
  display: none;
`;
