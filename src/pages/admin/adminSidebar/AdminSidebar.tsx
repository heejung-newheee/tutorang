import { Link } from 'react-router-dom';
import { icon_home, icon_logout } from '../../../assets';
import * as S from './AdminSidebar.styled';

const AdminSidebar = () => {
  return (
    <S.SideBar>
      <nav>
        <S.ButtonHome to="/">
          <S.IconHome src={icon_home} />
        </S.ButtonHome>
        <S.NavList>
          <Link to={'/admin/dashboard'}>
            <S.NavItem>대시보드</S.NavItem>
          </Link>
          <Link to={'/admin/board-manage'}>
            <S.NavItem>게시판</S.NavItem>
          </Link>
          <Link to={'/admin/announcements-manage'}>
            <S.NavItem>공지사항 관리</S.NavItem>
          </Link>
          <Link to={'/admin/customer-support-manage'}>
            <S.NavItem>1:1 문의관리</S.NavItem>
          </Link>
        </S.NavList>
      </nav>
      <S.ButtonLogout>
        <S.IconLogout src={icon_logout} />
        로그아웃
      </S.ButtonLogout>
    </S.SideBar>
  );
};

export default AdminSidebar;
